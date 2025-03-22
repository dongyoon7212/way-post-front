import { css, keyframes } from "@emotion/react";

export const slideUpFadeIn = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const overlay = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const modal = css`
	position: relative;
	background: white;
	padding: 30px;
	border-radius: 20px;
	width: 30vw;
	box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	animation: ${slideUpFadeIn} 0.3s ease-out; /* 애니메이션 적용 */

	& > h2 {
		font-size: 20px;
		margin-bottom: 15px;
	}
`;

export const closeBtn = css`
	position: absolute;
	top: 15px;
	right: 15px;
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
`;

export const inputBox = css`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
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

export const buttonGroup = css`
	display: flex;
	flex-direction: column; /* 버튼 세로 정렬 */
	width: 100%;
	gap: 10px;

	& > button {
		padding: 12px 20px;
		border: 1px solid #dbdbdb;
		border-radius: 10px;
		background-color: transparent;
		font-size: 16px;
		color: rgb(89, 89, 89);
		cursor: pointer;
		width: 100%; /* 인풋과 동일한 너비 */
		transition: background-color 0.2s;

		&:nth-child(1) {
			background-color: #1e90ff;
			color: white;
			border: none;
		}

		&:nth-child(1):hover {
			background-color: #187bcd;
		}
	}
`;

export const divider = css`
	display: flex;
	align-items: center;
	width: 100%;
	color: #808080;
	margin: 10px 0;
	font-size: 12px;

	&:before,
	&:after {
		content: "";
		flex: 1;
		height: 1px;
		background: #d3d3d3;
		margin: 0 10px;
	}
`;

export const loginButton = css`
	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #f0f0f0;
	}

	& > svg {
		margin-right: auto; /* 아이콘을 왼쪽 끝으로 밀기 */
		font-size: 20px;
	}

	& > span {
		flex-grow: 1; /* 글자를 가운데 정렬 */
		text-align: center;
	}
`;
