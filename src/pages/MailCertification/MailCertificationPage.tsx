/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import logo1 from "../../assets/logo1.png";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { principalData } from "../../types";
import {
	emailVerificationCodeCheckRequest,
	emailVerificationCodeSendRequest,
} from "../../apis/apis/emailApi";

function MailCertificationPage() {
	const navigate = useNavigate();
	const [certificationCode, setCertificationCode] = useState<string>("");
	const handleCertificationCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCertificationCode(e.target.value);
	};
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);

	useEffect(() => {
		if (principalData) {
			if (principalData.data.user.userRoles[0].roleId !== 3) {
				alert("이메일 인증이 필요하지 않은 계정입니다.");
				navigate("/");
			}
		}
	}, [principalData]);

	const handleSendClick = () => {
		if (!principalData) {
			alert("사용자 정보가 없습니다. 다시 로그인 해주세요.");
			navigate("/");
			return;
		}
		emailVerificationCodeSendRequest({
			email: principalData.data.user.email,
			userId: principalData.data.user.userId,
		}).then((response) => {
			if (response.status === 200) {
				alert("인증코드가 발송되었습니다. 이메일을 확인해주세요.");
			} else {
				alert("인증코드 발송에 실패했습니다. 다시 시도해주세요.");
			}
		});
	};

	const handleCheckCode = () => {
		if (!certificationCode) {
			alert("인증코드를 입력해주세요.");
			return;
		}
		emailVerificationCodeCheckRequest({
			userId: principalData?.data.user.userId,
			code: certificationCode,
		})
			.then((response) => {
				if (response.status === 200) {
					if (response.data.code === 2000) {
						alert("인증이 완료되었습니다.");
						window.location.href = "/";
					} else if (response.data.code === 4001) {
						alert("잘못된 요청입니다.");
						navigate("/");
					} else if (response.data.code === 4002) {
						alert(
							"인증 코드가 만료되었습니다. 다시 인증을 시도해주세요."
						);
						setCertificationCode("");
					} else if (response.data.code === 4003) {
						alert(
							"인증 가능 횟수 초과입니다. 나중에 인증을 시도해주세요."
						);
						navigate("/");
					} else if (response.data.code === 4004) {
						alert(
							"인증 코드가 일치하지 않습니다. 다시 확인해주세요."
						);
						setCertificationCode("");
					}
				}
			})
			.catch((error) => {
				console.error("인증 코드 확인 중 오류 발생:", error);
				alert("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
			});
	};

	return (
		<div css={s.layout}>
			<header css={s.headerLayout}>
				<div css={s.headerBox}>
					<div
						css={s.logoBox}
						onClick={() => {
							navigate("/");
						}}
					>
						<img src={logo2} alt="logo" />
					</div>
				</div>
			</header>
			<main>
				<div css={s.mainLayout}>
					<div css={s.mainBox}>
						<div css={s.titleBox}>
							<img src={logo1} alt="logo" />
							<h1>이메일 인증</h1>
							<p>
								정상적인 서비스를 위해 <span>이메일 인증</span>
								을 진행합니다.
							</p>
						</div>
						<div css={s.emailBox}>
							<span>{principalData?.data.user.email}</span>
							<button css={s.sendBtn} onClick={handleSendClick}>
								인증받기
							</button>
						</div>
						<input
							type="text"
							placeholder="인증코드를 입력해주세요."
							css={s.codeInput}
							onChange={handleCertificationCodeChange}
							value={certificationCode}
						/>
						<div css={s.buttonBox}>
							<button
								css={s.activateButton}
								onClick={handleCheckCode}
							>
								인증하기
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MailCertificationPage;
