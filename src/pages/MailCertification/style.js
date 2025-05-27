import { css } from "@emotion/react";

export const layout = css`
	position: relative;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const headerLayout = css`
	position: fixed;
	z-index: 1000;
	width: 100vw;
	height: 8vh;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background-color: white;
	border-bottom: 1px solid #dbdbdb;
`;

export const headerBox = css`
	width: 70vw;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const logoBox = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	& > img {
		height: 100%;
		object-fit: cover;
		cursor: pointer;
	}
`;

export const mainLayout = css`
	width: 37vw;
	min-height: 92vh;
	margin-top: 8vh;
`;

export const mainBox = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const titleBox = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20px 0;

	& > img {
		width: 20%;
		margin: 30px 0;
	}

	& > h1 {
		font-size: 20px;
		margin-bottom: 10px;
	}

	& > p {
		line-height: 1.8;
		& > span {
			text-decoration: underline;
			font-weight: 500;
		}
	}
`;

export const emailBox =css`
    display: flex;
    align-items: center;
    margin: 30px 0;
`

export const sendBtn = css`
	margin-left: 10px;
	padding: 8px 15px;
	border-radius: 10px;
	border: none;
	background-color: rgb(52, 162, 220);
	color: white;
	cursor: pointer;
	font-size: 12px;
	transition: background-color 0.2s;
	&:hover {
		background-color: rgb(42, 142, 200);
	}
	&:active {
		background-color: rgb(39, 132, 190);
	}
`;

export const codeInput = css`
	border: 1px solid #dbdbdb;
	border-radius: 10px;
	width: 45%;
	padding: 12px 20px;
	margin: 10px 0;
`;

export const buttonBox = css`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
`;

export const activateButton = css`
	width: 50%;
	border-radius: 10px;
	border: none;
	background-color: rgb(40, 167, 69);
	padding: 12px 30px;
	font-size: 16px;
	color: white;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: rgb(33, 136, 56);
	}
	&:active {
		background-color: rgb(30, 126, 52);
	}
`;
