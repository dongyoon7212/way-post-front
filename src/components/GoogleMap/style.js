import { css } from "@emotion/react";

export const overlayStyle = (visible) => css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(2px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	pointer-events: ${visible ? "all" : "none"};
	opacity: ${visible ? 1 : 0};
	transition: opacity 0.3s ease-in-out;
`;

export const loadingBoxStyle = css`
	background: white;
	padding: 1rem 2rem;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	font-size: 1.2rem;
	font-weight: 500;
`;
