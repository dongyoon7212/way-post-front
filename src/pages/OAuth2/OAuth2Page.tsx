/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import mergeIcon from "../../assets/mergeIcon.png";

function OAuth2Page() {
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
					<h1>소셜 로그인 옵션</h1>
					<p>
						선택한 소셜 계정(Google/Naver/Kakao)은 WayPost 계정과
						아직 연동되지 않았습니다.
						<br />
						아래 중 하나를 선택해 주세요.
					</p>
					<div css={s.mainBox}>
						<div css={s.selectBox}>
							<h1>기존 계정이 있으신가요?</h1>
							<p>
								기존 Way Post 계정이 있다면, 해당 계정과 지금의
								소셜 계정을 연동할 수 있습니다.
							</p>
						</div>
						<div css={s.selectBox}>
							<h1>처음 이용하시나요?</h1>
							<p>
								아직 Way Post 계정이 없다면, 지금 사용하는 소셜
								계정으로 새 계정을 만들 수 있습니다.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default OAuth2Page;
