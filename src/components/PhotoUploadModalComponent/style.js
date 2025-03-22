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
	transition: right 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
	padding: 20px;
	z-index: 1001;
	border-radius: 20px;
	box-sizing: border-box;
`;

export const closeButton = css`
	align-self: flex-end;
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
`;

export const contentWrapper = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
`;

export const uploadButton = css`
	width: 80%;
	padding: 10px;
	background-color: #1e90ff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;

	&:hover {
		background-color: #1c7ed6;
	}
`;

export const textInput = css`
	width: 80%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	outline: none;
	font-size: 16px;
`;
