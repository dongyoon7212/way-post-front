/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/logo2.png";

function DeactivateAccountPage() {
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
		</div>
	);
}

export default DeactivateAccountPage;
