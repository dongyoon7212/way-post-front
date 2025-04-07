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
	overflow: auto;
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
	width: 22vw;
	height: 22vw;
	padding: 10px;
	cursor: pointer;
	font-size: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const fileInput = css`
	display: none;
`;

export const textInput = css`
	width: 90%;
	min-height: 100px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	resize: none;
	outline: none;
	font-size: 14px;
`;

export const postBtn = css`
	padding: 10px 20px;
	margin-top: 100px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
`;

export const previewContainer = css`
	width: 90%;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	}
`;

export const metadataContainer = css`
	width: 90%;
	display: flex;
	justify-content: space-between;
	gap: 10px;
	margin-top: 10px;

	& > div {
		& > p {
			font-size: 12px;
		}
	}
`;
