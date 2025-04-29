import { keyframes, css } from "@emotion/react";

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const container = css`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const skeletonStyle = css`
	width: 100%;
	aspect-ratio: 1 / 1;
	background-color: #eee;
	background-image: linear-gradient(90deg, #eee 0%, #f5f5f5 40%, #eee 80%);
	background-size: 200% 100%;
	animation: ${shimmer} 1.5s infinite;
`;

export const imgStyle = (loaded) => css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: ${loaded ? 1 : 0};
	transition: opacity 0.3s ease-in;
`;
