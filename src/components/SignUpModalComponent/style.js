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

	& > p {
		margin-bottom: 15px;
	}
`;

export const closeBtn = css`
	position: absolute;
	top: 10px;
	right: 15px;
	font-size: 24px;
	border: none;
	background: none;
	cursor: pointer;
`;

export const input = css`
	width: 100%;
	box-sizing: border-box;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 15px;
	font-size: 16px;
	outline: none;
	transition: border 0.2s ease;
	margin-bottom: 10px;

	&:first-of-type {
		margin-top: 20px;
	}

	&:focus {
		border-color: #1e90ff;
	}
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

export const inputWrapper = css`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	align-items: center;
`;

export const chkInput = css`
	width: 100%;
	padding: 12px 85px 12px 12px; /* 오른쪽 패딩 추가 */
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

export const switchText = css`
	margin-top: 10px;
	font-size: 14px;
	color: gray;

	span {
		color: #1e90ff;
		cursor: pointer;
		font-weight: bold;

		&:hover {
			text-decoration: underline;
		}
	}
`;
