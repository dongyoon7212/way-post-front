/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	emailVerificationCodeCheckRequest,
	sendResetCodeMailRequest,
} from "../../apis/apis/emailApi";

function ForgotPasswordPage() {
	const [email, setEmail] = useState<string>("");
	const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
	const [certificationCode, setCertificationCode] = useState<string>("");
	const [countdown, setCountdown] = useState<number>(0);
	const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [timerId]);

	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setIsEmailValid(emailRegEx.test(value)); // 입력 즉시 정규식 확인
	};

	const handleCertificationCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCertificationCode(e.target.value);
	};

	const sendVerificationCode = () => {
		if (isEmailValid) {
			sendResetCodeMailRequest({ email: email })
				.then((response) => {
					if (response.status === 200) {
						alert("인증 코드가 이메일로 전송되었습니다.");
						setCountdown(120);
						if (timerId) clearInterval(timerId);
						const id = setInterval(() => {
							setCountdown((prev) => {
								if (prev <= 1) {
									clearInterval(id);
									return 0;
								}
								return prev - 1;
							});
						}, 1000);
						setTimerId(id);
					}
				})
				.catch((error) => {
					alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
				});
		}
	};

	const handleChkCode = () => {
		if (certificationCode.trim() === "") {
			alert("인증 코드를 입력해주세요.");
			return;
		}
		emailVerificationCodeCheckRequest({
			email: email,
			code: certificationCode,
			purpose: "reset",
		})
			.then((response) => {
				if (response.status === 200) {
					if (response.data.code === 2000) {
						alert("인증이 완료되었습니다.");
						window.location.href =
							"/auth/new-password?email=" + email;
					} else if (response.data.code === 4001) {
						alert(
							"인증 코드가 만료되었습니다. 다시 인증을 시도해주세요."
						);
						window.location.href = "/";
					} else if (response.data.code === 4002) {
						alert(
							"인증 가능 횟수 초과입니다. 나중에 인증을 시도해주세요."
						);
						window.location.href = "/";
					} else if (response.data.code === 4003) {
						alert(
							"인증 코드가 일치하지 않습니다. 다시 확인해주세요."
						);
						setCertificationCode("");
					} else if (response.data.code === 4004) {
						alert("잘못된 접근입니다.");
						window.location.href = "/";
					}
				}
			})
			.catch((error) => {
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
					<h1>비밀번호 찾기</h1>
					<p>
						비밀번호를 잊으셨나요?
						<br />
						<br />
						가입하신 이메일 주소를 입력해 주세요. 입력하신 이메일로
						인증코드가 전송됩니다.
						<br />
						인증이 완료되면 새 비밀번호를 설정하실 수 있습니다.
					</p>
					<div css={s.inputContainer}>
						<div css={s.inputWrapper}>
							<input
								css={s.chkInput}
								type="email"
								placeholder="이메일"
								value={email}
								onChange={handleEmailChange}
							/>
							<button
								css={[
									s.checkBtn,
									countdown > 0 && s.disabledBtn,
								]}
								onClick={sendVerificationCode}
								disabled={countdown > 0}
							>
								{countdown > 0
									? `${Math.floor(countdown / 60)}:${String(
											countdown % 60
									  ).padStart(2, "0")}`
									: "인증요청"}
							</button>
						</div>
					</div>
					<p
						style={{
							color: "red",
							opacity: isEmailValid === false ? 1 : 0,
							transition: "opacity 0.3s ease",
							marginBottom: "10px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						올바른 이메일 형식이 아닙니다.
					</p>
					<input
						type="text"
						placeholder="인증코드를 입력해주세요."
						css={s.codeInput}
						onChange={handleCertificationCodeChange}
						value={certificationCode}
					/>
					<div css={s.buttonBox}>
						<button
							css={s.certificationButton}
							disabled={false} // 여기에 인증 코드 확인 로직 추가 필요
							onClick={handleChkCode}
						>
							비밀번호 변경
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ForgotPasswordPage;
