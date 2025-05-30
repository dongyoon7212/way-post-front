/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import logo1 from "../../assets/logo1.png";

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
                
            </main>
		</div>
	);
}

export default OAuth2Page;
