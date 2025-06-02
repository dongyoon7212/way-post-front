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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const mainBox = css`
	width: 100%;
	height: 35vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const selectBox = css`
	width: 15vw;
	height: 25vh;
	border-radius: 10px;
	border: 1px solid #dbdbdb;
	background-color: rgb(240, 233, 225);
	font-family: "SpoqaHanSansNeo-Bold";

	& > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 10px;
		cursor: pointer;
	}
`;
