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
	padding: 20px 20px 80px 20px;
	z-index: 910;
	border-radius: 20px;
	box-sizing: border-box;
`;

export const modalContainer = css`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	overflow: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const contentWrapper = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
`;

export const uploadButton = css`
	width: 90%;
	background-color: #f0f0f0;
	border-radius: 10px;
	border: none;
	padding: 20px;
	cursor: pointer;
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

export const buttonContainer = css`
	position: absolute;
	width: 90%;
	box-sizing: border-box;
	bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 100px;
`;

export const cancelBtn = css`
	padding: 10px 20px;
	background-color: #f44336;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
`;

export const postBtn = css`
	padding: 10px 20px;
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
	margin-top: 10px;

	& > div {
		& > p {
			font-size: 14px;
			margin-bottom: 5px;
		}
	}
`;

export const manualMetadataContainer = css`
	width: 90%;
	display: flex;
	flex-direction: column;
	margin-top: 10px;

	& > div {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		& > p {
			font-size: 14px;
			margin-right: 5px;
		}

		& > input {
			width: 50%;
			height: 20px;
			padding: 10px 0;
			border: none;
			box-sizing: border-box;
			font-size: 14px;

			&:focus {
				outline: none;
			}
		}
		& > div {
			width: 90%;
		}
	}
`;
