import { keyframes, css } from "@emotion/react";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const postCard = css`
	margin: 20px 0;
	border-radius: 8px;
	overflow: hidden;
`;

export const skeletonBase = css`
	background: #eee;
	background-image: linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite;
`;

export const headerSkeleton = css`
	height: 40px;
	margin: 12px;
	border-radius: 20px;
	${skeletonBase}
`;

export const imageSkeleton = css`
	width: 100%;
	aspect-ratio: 1/1;
	${skeletonBase}
`;

export const footerSkeleton = css`
	height: 20px;
	margin: 12px;
	border-radius: 4px;
	${skeletonBase}
`;
