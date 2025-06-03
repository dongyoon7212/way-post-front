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
		word-break: keep-all;
	}
`;

export const inputContainer = css`
	width: 25vw;
`;

export const inputBox = css`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 20px;
	border-radius: 15px;
	overflow: hidden;
	border: 1px solid #ccc;
	background: #f9f9f9;

	& > input {
		box-sizing: border-box;
		padding: 14px 20px;
		border: none;
		outline: none;
		width: 100%;
		font-size: 16px;

		&:first-of-type {
			border-bottom: 1px solid #ccc;
		}
	}
`;

export const inputWrapper = css`
	position: relative;
	box-sizing: border-box;
	width: 100%;
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

export const checkBtn = css`
	position: absolute;
	top: 42%;
	right: 10px;
	transform: translateY(-50%);
	padding: 5px 10px;
	border: none;
	background-color: #1e90ff;
	color: white;
	font-size: 12px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0073e6;
	}
`;

export const submitBtn = css`
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 10px;
	background: #1e90ff;
	color: white;
	font-size: 16px;
	cursor: pointer;
	margin: 10px 0;
	transition: background-color 0.2s;

	&:hover {
		background-color: #0f70d6;
	}
`;
