import { css } from "@emotion/react";

export const modalWrapper = (isOpen) => css`
	position: fixed;
	top: 50%;
	right: ${isOpen ? "10px" : "-35vw"};
	width: 35vw;
	transform: translateY(-50%);
	height: 97vh;
	background-color: white;
	box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
	transition: right 0.2s ease-in-out;
	display: flex;
	flex-direction: column;
	padding: 45px 20px;
	z-index: 910;
	border-radius: 20px;
	box-sizing: border-box;
`;

export const closeBtn = css`
	position: absolute;
	font-size: 24px;
	top: 10px;
	right: 10px;
	border: none;
	background: transparent;
	cursor: pointer;
	padding: 8px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const postContainer = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
`;

export const postBox = css`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const profileBox = css`
	display: flex;
	align-items: center;
	margin-bottom: 12px;

	& > a > img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 50%;
		margin-right: 10px;
		border: 1px solid #dbdbdb;
	}

	& > div {
		padding-top: 10px;
		width: auto;

		& > a {
			font-size: 16px;
			text-decoration: none;
			color: black;
		}

		& > p {
			padding-top: 5px;
			font-size: 12px;
			cursor: default;
		}
	}
`;

export const imgBox = css`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
`;

export const textBox = css`
	width: 100%;
	height: auto;
	display: flex;

	& > p {
		padding: 10px;
		width: 100%;
		height: auto;
		font-size: 16px;
		cursor: default;
	}
`;

export const btnBox = css`
	padding: 12px;
	display: flex;
	align-items: center;
	& > p {
		font-size: 20px;
		margin-right: 15px;
		display: flex;
		align-items: center;
	}
`;

export const commentBox = css`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	cursor: default;

	& > p {
		font-size: 17px;
		margin-right: 10px;
	}
`;

export const comments = css`
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

export const viewCommentsBtn = css`
	background: none;
	border: none;
	color: #0095f6;
	font-size: 14px;
	margin: 8px 12px;
	cursor: pointer;
	text-align: left;
`;

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
