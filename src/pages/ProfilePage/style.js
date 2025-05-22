import { css, keyframes } from "@emotion/react";

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

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

export const menu = css`
	font-size: 20px;
	margin-right: 20px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export const contentLayout = css`
	width: 70vw;
	margin-top: 8vh;
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
	width: 12vw;
	height: 12vw;
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
	background-color: rgb(52, 162, 220);
	color: white;
	cursor: pointer;
	font-size: 12px;
	&:hover {
		background-color: rgb(42, 142, 200);
	}
`;

export const settingBtn = css`
	position: absolute;
	top: 20px;
	right: 20px;
	border: none;
	background-color: white;
	font-size: 20px;
	cursor: pointer;
`;

export const menuWrapper = (isMenuOpen) => css`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: ${isMenuOpen
		? "50px"
		: "40px"}; /* 열린 상태엔 50px, 닫힌 상태엔 40px */
	right: 20px;
	opacity: ${isMenuOpen ? "1" : "0"};
	transform: translateY(${isMenuOpen ? "0" : "-10px"});
	transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out,
		transform 0.3s ease-in-out;
	pointer-events: ${isMenuOpen ? "auto" : "none"};
`;

export const editImgBtn = css`
	position: absolute;
	width: 100px;
	top: 0px;
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

export const editIntrodueceBtn = css`
	position: absolute;
	width: 100px;
	top: 35px;
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

export const deleteAccountBtn = css`
	position: absolute;
	width: 100px;
	top: 70px;
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

export const logoutBtn = css`
	position: absolute;
	width: 100px;
	top: 105px;
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

export const bottomOverlay = css`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
`;

export const bottomModal = css`
	width: 100%;
	max-width: 400px;
	background: white;
	border-radius: 8px;
	padding: 20px;
	animation: ${slideUp} 0.3s ease-in-out;
`;

export const introTextarea = css`
	width: 100%;
	min-height: 100px;
	max-height: 200px;
	box-sizing: border-box;
	margin-top: 10px;
	resize: vertical;
	border: 1px solid #dbdbdb;
	padding: 10px;

	&:focus {
		outline: none;
	}
`;

export const modalButtons = css`
	margin-top: 12px;
	text-align: right;

	& > button {
		margin-left: 10px;
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
	}
	& > button:last-of-type {
		background-color: #007bff;
		color: white;
		border: none;

		&:hover {
			background-color: #0056b3;
		}
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
	height: 100%;
	padding-bottom: 50px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 5px;
`;

export const postBox = css`
	cursor: pointer;
	width: 100%;
	aspect-ratio: 1 / 1; /* 가로:세로를 1:1로 고정 */
	position: relative;
	overflow: hidden;
`;
