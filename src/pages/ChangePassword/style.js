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
	padding: 0 60px;

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

export const inputBox = css`
	&:first-of-type {
		margin-bottom: 20px;
		&:first-of-type {
			border-bottom: none;
		}
	}
	box-sizing: border-box;
	display: flex;
	width: 20vw;
	flex-direction: column;
	border-radius: 15px;
	overflow: hidden;
	border: 1px solid #ccc;
	background: #f9f9f9;

	& > input {
		box-sizing: border-box;
		padding: 12px;
		border: none;
		outline: none;
		width: 100%;
		font-size: 16px;

		&:first-of-type {
			border-bottom: 1px solid #ccc;
		}
	}
`;

export const buttonBox = css`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const confirmButton = css`
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

export const disabledBtn = css`
	opacity: 0.6;
	cursor: not-allowed;
`;
