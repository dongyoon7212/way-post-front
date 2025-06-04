/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
	const navigate = useNavigate();
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
						가입하신 이메일 주소를 입력해 주세요. 입력하신 이메일로
						인증코드가 전송됩니다.
						<br />
						인증이 완료되면 새 비밀번호를 설정하실 수 있습니다.
					</p>
				</div>
			</main>
		</div>
	);
}

export default ForgotPasswordPage;
