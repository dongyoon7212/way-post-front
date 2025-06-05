/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPasswordPage() {
	const [email, setEmail] = useState<string>("");
	const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
	const navigate = useNavigate();

	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setIsEmailValid(emailRegEx.test(value)); // 입력 즉시 정규식 확인
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
								css={s.checkBtn}
								// onClick={duplChkEmailHandler}
							>
								인증요청
							</button>
						</div>
					</div>
					<p
						style={{
							color: "red",
							opacity: isEmailValid === false ? 1 : 0,
							transition: "opacity 0.3s ease",
						}}
					>
						올바른 이메일 형식이 아닙니다.
					</p>
					<div css={s.buttonBox}>
						<button
							css={s.activateButton}
							disabled={false} // 여기에 인증 코드 확인 로직 추가 필요
							onClick={() => {
								console.log("비밀번호 변경");
								navigate("/auth/new-password");
							}}
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
