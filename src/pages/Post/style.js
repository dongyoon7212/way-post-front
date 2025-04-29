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

export const feedLayout = css`
	width: 37vw;
	min-height: 92vh;
	margin-bottom: 20px;
	margin-top: 8vh;
`;

export const postCard = css`
	margin: 20px 0;
	border-radius: 8px;
	overflow: hidden;
`;

// 1. Header with avatar + username
export const postHeader = css`
	display: flex;
	align-items: center;
	padding: 12px;
`;

export const avatar = css`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 12px;
`;

export const username = css`
	font-weight: 600;
	color: #262626;
`;

// 2. Post image
export const postImage = css`
	width: 100%;
	background: #000;
	& > img {
		border: 1px solid #dbdbdb;
		box-sizing: border-box;
		width: 100%;
		aspect-ratio: 1/1;
		height: auto;
		display: block;
		object-fit: cover;
	}
`;

export const btnBox = css`
	padding: 12px;
	display: flex;
	& > p {
		font-size: 15px;
		margin-right: 15px;
	}
`;

// 3. Caption
export const postCaption = css`
	padding: 12px;
	font-size: 14px;
	color: #262626;
	& > strong {
		margin-right: 4px;
		font-weight: 600;
	}
`;

// 4. Comments list
export const comments = css`
	max-height: 120px;
	overflow-y: auto;
	padding: 0 12px;
	font-size: 14px;
	color: #262626;
	margin: 10px 0;
`;

export const commentLine = css`
	margin: 4px 0;
	& > strong {
		margin-right: 4px;
		font-weight: 600;
	}
`;

// 5. Comment form
export const commentForm = css`
	display: flex;
	align-items: center;
	padding: 8px 12px;
`;

export const commentInput = css`
	flex: 1;
	border: none;
	font-size: 14px;
	&::placeholder {
		color: #999;
	}
	&:focus {
		outline: none;
	}
`;

export const commentButton = css`
	background: none;
	border: none;
	color: #0095f6;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
	&:disabled {
		opacity: 0.4;
		cursor: default;
	}
`;
