import { css } from "@emotion/react";

export const layout = (isOpen) => css`
	position: fixed;
	top: 50%;
	/* left: 10px; */
	transform: ${isOpen
		? "translateY(-50%) translateX(10px)"
		: "translateY(-50%) translateX(-100%)"};
	z-index: 1000;
	width: 15vw;
	height: 97vh;
	border-radius: 20px;
	background-color: white; /* 조금 더 차분한 회색 */
	box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.3); /* 부드러운 그림자 */
	transition: transform 0.3s ease-in-out;
`;

export const closeBtn = css`
	position: absolute;
	font-size: 24px;
	top: 10px;
	right: 10px;
	border: none;
	background: transparent;
	cursor: pointer;
	padding: 8px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const menu = css`
	width: 100%;
	text-align: start;
	margin-top: 100px;

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		align-items: center;
		font-size: 18px;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}

	li:hover {
		background: rgba(0, 0, 0, 0.1);
	}
`;

export const menuIcon = css`
	padding: 18px;
	font-size: 24px;
`;

export const loginBtn = css`
	position: absolute;
	bottom: 0px;
	width: 100%;
	padding: 17px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	box-sizing: border-box;
	border: none;
	border-top: 1px solid #dbdbdb;
	color: black;
	background-color: transparent;
	font-size: 16px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: #dbdbdb;
	}
`;
