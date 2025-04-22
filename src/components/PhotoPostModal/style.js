import { css } from "@emotion/react";

export const modalWrapper = (isOpen) => css`
	position: fixed;
	top: 50%;
	right: ${isOpen ? "10px" : "-35vw"};
	width: 35vw;
	transform: translateY(-50%);
	height: 97vh;
	background-color: white;
	box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
	transition: right 0.2s ease-in-out;
	display: flex;
	flex-direction: column;
	padding: 20px 20px 80px 20px;
	z-index: 910;
	border-radius: 20px;
	box-sizing: border-box;
`;
