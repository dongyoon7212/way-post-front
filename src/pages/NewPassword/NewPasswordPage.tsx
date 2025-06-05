/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewPasswordPage() {
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(
		true
	);
	const navigate = useNavigate();

	const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setIsPasswordValid(passwordRegEx.test(value)); // 입력 즉시 정규식 확인
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
					<h1>새로운 비밀번호</h1>
					<p>
						새 비밀번호를 설정해 주세요.
						<br />
						<br />
						이전에 사용한 비밀번호와 동일하지 않도록 설정해 주세요.
						<br />
						안전한 비밀번호는 영문 소문자, 영문 대문자, 특수문자를
						각각 최소 1자 이상 포함하여 8자 이상 20자 이하로
						구성하는 것이 좋습니다.
					</p>
					<div css={s.inputBox}>
						<input
							type="password"
							placeholder="비밀번호"
							value={password}
							onChange={handlePasswordChange}
						/>
						<input
							type="password"
							placeholder="비밀번호 확인"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</div>
					<p
						style={{
							color: "red",
							opacity: isPasswordValid === false ? 1 : 0,
							transition: "opacity 0.3s ease",
						}}
					>
						비밀번호는 영문 소문자, 영문 대문자, 특수문자를 각각
						최소 1자 이상 포함하여 8자 이상 20자 이하만 가능합니다.
					</p>
					<div css={s.buttonBox}>
						<button
							css={s.activateButton}
							disabled={false} // 여기에 인증 코드 확인 로직 추가 필요
							onClick={() => {
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

export default NewPasswordPage;
