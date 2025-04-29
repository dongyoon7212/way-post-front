/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";

interface ImageWithSkeletonProps {
	src: string;
	alt?: string;
}

export function PhotoPostSkeleton({ src, alt }: ImageWithSkeletonProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div css={s.container}>
			{!loaded && <div css={s.skeletonStyle} />}
			<img
				src={src}
				alt={alt}
				onLoad={() => setLoaded(true)}
				css={s.imgStyle(loaded)}
			/>
		</div>
	);
}
