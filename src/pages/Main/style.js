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

export const profileBtn = css`
	position: absolute;
	box-sizing: border-box;
	width: 50px;
	height: 50px;
	top: 30px;
	right: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	z-index: 900;
	background-color: white;
	border: none;
	overflow: hidden;
	padding: 0;
	cursor: pointer;
	box-shadow: 1px 0px 28px 0px rgba(0, 0, 0, 0.5);
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #f0f0f0; /* 밝은 회색 */
		transform: scale(1.1);
		box-shadow: 1px 0px 35px 0px rgba(0, 0, 0, 0.6); /* 더 강한 그림자 */
	}

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const searchBox = css`
	position: fixed;
	top: 30px;
	padding: 10px 30px;
	z-index: 1000;
	background-color: white;
	border-radius: 50px;
	box-shadow: 1px 0px 28px 0px rgba(0, 0, 0, 0.5);
	left: 50%;
	transform: translateX(-50%);

	& > div > input {
		text-align: center;
		padding-bottom: 5px;
		width: 10vw;
		color: #2a2a2e;
		border: none;
		outline: none;
		transition: all 0.2s ease-in-out;

		&:focus {
			width: 20vw;
			font-size: 16px;
		}
	}
`;

/** 🔥 플러스 버튼 및 메뉴 스타일 **/
export const addPostContainer = css`
	position: absolute;
	bottom: 30px;
	right: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const addPostBtn = css`
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
		background-color: #f0f0f0;
		transform: scale(1.1);
		box-shadow: 1px 0px 35px 0px rgba(0, 0, 0, 0.6);
	}
`;

export const menuWrapper = (isMenuOpen) => css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: absolute;
	bottom: ${isMenuOpen ? "70px" : "30px"};
	right: 0;
	opacity: ${isMenuOpen ? "1" : "0"};
	transform: translateY(${isMenuOpen ? "0" : "10px"});
	transition: all 0.3s ease-in-out;
	pointer-events: ${isMenuOpen ? "auto" : "none"};
`;

export const menuItem = css`
	width: 150px;
	padding: 12px;
	border: none;
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 0px 15px rgba(0, 0, 0, 0.3);
	cursor: pointer;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #f0f0f0;
		transform: scale(1.05);
	}
`;
