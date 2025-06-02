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
	}
`;

export const mainBox = css`
	width: 100%;
	height: 25vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const selectBox = css`
	box-sizing: border-box;
	width: 20vw;
	height: 25vh;
	border-radius: 10px;
	background-color: rgb(92, 193, 237);
	font-family: "SpoqaHanSansNeo-Bold";
	padding: 20px;
	color: white;
	cursor: pointer;
	transition: background-color 0.3s ease;

	& > h1 {
		font-size: 20px;
		margin-bottom: 20px;
		font-weight: bold;
	}

	& > p {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 20px;
		line-height: 1.2;
		word-break: keep-all;
	}

	& > div {
		display: flex;
		justify-content: end;
	}

	&:hover {
		background-color: rgb(52, 162, 220);
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
	}
`;
