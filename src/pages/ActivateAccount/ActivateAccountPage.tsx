/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/logo2.png";
import logo1 from "../../assets/logo1.png";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { principalData } from "../../types";
import { activateAccountRequest } from "../../apis/apis/authApi";
import { instance } from "../../apis/utils/instance";

function ActivateAccountPage() {
	const navigate = useNavigate();
	const [password, setPassword] = useState<string>("");
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);

	const handleActivateClick = () => {
		if (window.confirm("정말로 계정을 복구하시겠습니까?")) {
			if (!password) {
				alert("비밀번호를 입력해주세요.");
				return;
			}
			activateAccountRequest({
				email: principalData?.data.user.email,
				password: password,
			})
				.then((response) => {
					if (response.status === 200) {
						alert("계정이 복구 되었습니다. 다시 로그인 해주세요.");
						localStorage.removeItem("accessToken");
						instance.interceptors.request.use((config) => {
							config.headers.Authorization = null;
							return config;
						});
						queryClient.refetchQueries({
							queryKey: ["getPrincipal"],
						});
						window.location.href = "/";
					}
				})
				.catch((error) => {
					if (error.status !== 200) {
						alert("사용자 정보가 알맞지 않습니다.");
						setPassword("");
					}
				});
		} else {
			return;
		}
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
							<h1>계정 복구</h1>
							<p>
								비활성화 상태의 계정을 <span>복구</span>
								합니다.
								<br />
								복구된 계정은 데이터가 모두 복구됩니다.
							</p>
						</div>
						<input
							type="password"
							placeholder="비밀번호를 입력하세요"
							css={s.passwordInput}
							onChange={handlePasswordChange}
							value={password}
						/>
						<div css={s.buttonBox}>
							<button
								css={s.activateButton}
								onClick={handleActivateClick}
							>
								복구하기
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ActivateAccountPage;
