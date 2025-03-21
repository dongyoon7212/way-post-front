import { css } from "@emotion/react";

export const layout = css`
	position: relative;
	width: 100vw;
	height: 100vh;
`;

export const sidebarBtn = css`
	position: absolute;
	top: 30px;
	left: 30px;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	z-index: 900;
	background-color: white;
	border: none;
	padding: 15px;
	cursor: pointer;
	box-shadow: 1px 0px 28px 0px rgba(0, 0, 0, 0.5);
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #f0f0f0; /* 밝은 회색 */
		transform: scale(1.1);
		box-shadow: 1px 0px 35px 0px rgba(0, 0, 0, 0.6); /* 더 강한 그림자 */
	}
`;
