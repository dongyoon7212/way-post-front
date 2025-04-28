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
	padding: 20px;
	z-index: 910;
	border-radius: 20px;
	box-sizing: border-box;
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
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const profileBox = css`
	display: flex;
	align-items: center;
	margin-bottom: 12px;

	& > img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 50%;
		margin-right: 10px;
	}

	& > div {
		display: flex;
		flex-direction: column;
		padding-top: 10px;

		& > p {
			padding-top: 5px;
			font-size: 12px;
		}
	}
`;

export const imgBox = css`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const textBox = css`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	& > p {
		padding: 10px;
		width: 100%;
		height: 100%;
		font-size: 16px;
	}
`;

export const commentBox = css`
	display: flex;
	justify-content: end;
	margin-bottom: 20px;

	& > p {
		font-size: 17px;
		margin-right: 10px;
	}
`;
