/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useState } from "react";

function OAuth2MergePage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const signinHandler = () => {
		if (!email || !password) {
			alert("사용자 정보를 모두 입력해 주세요.");
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
					<h1>계정 연동</h1>
					<p>
						이미 WayPost에 가입한 적이 있으시다면, 지금 사용 중인
						소셜 계정을 연동하여 더 편리하게 로그인할 수 있어요.
					</p>
					<div css={s.inputBox}>
						<input
							type="text"
							placeholder="이메일"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									signinHandler();
								}
							}}
						/>
						<input
							type="password"
							placeholder="비밀번호"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									signinHandler();
								}
							}}
						/>
					</div>
					<div css={s.buttonBox}>
						<button onClick={() => navigate(-1)}>뒤로</button>
						<button onClick={signinHandler}>연동하기</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default OAuth2MergePage;
