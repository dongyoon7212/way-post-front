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
	width: 100vw;
	height: 8vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #dbdbdb;
`;

export const headerBox = css`
	width: 70vw;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const logo = css`
	font-size: 25px;
	margin-left: 20px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export const menu = css`
	font-size: 20px;
	margin-right: 20px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export const contentLayout = css`
	width: 70vw;
`;

export const infoLayout = css`
	width: 100%;
	height: 40vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const profileImgBox = css`
	width: 30%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const imgBox = css`
	box-sizing: border-box;
	width: 10vw;
	height: 10vw;
	border-radius: 50%;
	border: 1px solid #dbdbdb;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const profileInfoBox = css`
	width: 70%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const profileName = css`
	position: relative;
	width: 100%;
	height: 20%;
	display: flex;
	align-items: center;

	& > span {
		font-size: 20px;
		font-weight: 500;
	}
`;

export const followBtn = css`
	margin-left: 30px;
	padding: 7px 16px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: white;
	cursor: pointer;
	font-size: 12px;
`;

export const editBtn = css`
	position: absolute;
	top: 0;
	right: 0;
	padding: 7px 16px;
	background-color: white;
	border: 1px solid #dbdbdb;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	font-size: 12px;
	cursor: pointer;

	&:hover {
		background-color: #f0f0f0;
	}
`;

export const follow = css`
	width: 50%;
	height: 20%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > span {
		display: flex;
		font-size: 18px;

		& > p {
			margin-left: 10px;
			font-size: 18px;
			font-weight: 600;
		}
	}
`;

export const introduce = css`
	width: 100%;
	height: 50%;
`;

export const postLayout = css`
	width: 100%;
	padding-bottom: 50px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 5px;
`;

export const postBox = css`
	width: 100%;
	aspect-ratio: 1 / 1; /* 가로:세로를 1:1로 고정 */
	position: relative;
	overflow: hidden;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
