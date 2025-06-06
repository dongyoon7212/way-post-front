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
	width: 45vw;
	min-height: 92vh;
	margin-top: 4vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-right: 1px solid #dbdbdb;
	border-left: 1px solid #dbdbdb;
	box-sizing: border-box;
	padding: 0 20px;

	& > h1 {
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 50px;
		color: #333;
	}

	& > p {
		font-size: 16px;
		font-weight: 500;
		color: #666;
		margin-bottom: 60px;
		line-height: 1.5;
	}
`;

export const inputWrapper = css`
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
`;

export const chkInput = css`
	width: 100%;
	padding: 14px 85px 14px 20px; /* 오른쪽 패딩 추가 */
	border: 1px solid #ccc;
	border-radius: 15px;
	font-size: 16px;
	margin-bottom: 10px;
	box-sizing: border-box;
`;

export const inputContainer = css`
	width: 20vw;
`;

export const checkBtn = css`
	position: absolute;
	top: 42%;
	right: 10px;
	transform: translateY(-50%);
	padding: 7px 12px;
	border: none;
	background-color: #1e90ff;
	color: white;
	font-size: 12px;
	border-radius: 15px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0073e6;
	}
`;

export const disabledBtn = css`
	opacity: 0.6;
	cursor: not-allowed;
`;

export const codeInput = css`
	width: 100%;
	max-width: 240px;
	padding: 12px 18px;
	font-size: 16px;
	font-weight: bolder;
	/* font-family: "Courier New", Courier, monospace; */
	caret-color: transparent;
	letter-spacing: 6px;
	text-align: center;
	border: 2px solid #1e90ff;
	border-radius: 15px;
	outline: none;
	background-color: #f9f9f9;
	color: #1e1e1e;
	box-shadow: 0 0 0 3px transparent;
	transition: all 0.2s ease;
	margin-bottom: 40px;

	&::placeholder {
		letter-spacing: normal;
		color: #bbb;
	}

	&:focus {
		background-color: #fff;
		box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.3);
	}
`;

export const buttonBox = css`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const certificationButton = css`
	width: 40%;
	border-radius: 10px;
	border: none;
	background-color: #1e90ff;
	padding: 10px 20px;
	font-size: 16px;
	color: white;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: #0073e6;
	}
`;
