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
	margin-top: 8vh;
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

export const inputBox = css`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 18vw;
	margin: 20px 0;
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
	width: 18vw;
	display: flex;
	justify-content: space-between;

	& > button {
		padding: 10px 15px;
		border: none;
		border-radius: 10px;
		background-color: transparent;
		font-size: 14px;
		font-weight: bolder;
		color: rgb(89, 89, 89);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	& > button:nth-of-type(1):hover {
		background-color: #dbdbdb;
	}

	& > button:nth-of-type(2) {
		background-color: rgb(52, 162, 220);
		color: white;
	}

	& > button:nth-of-type(2):hover {
		background-color: rgb(42, 142, 200);
	}
`;
