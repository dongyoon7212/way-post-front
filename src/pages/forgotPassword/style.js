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
	}
`;
