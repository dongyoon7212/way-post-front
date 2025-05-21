/** @jsxImportSource @emotion/react */
import * as s from "./style";

function PostPageSkeleton() {
	return (
		<article css={s.postCard}>
			<div css={s.headerSkeleton} />
			<div css={s.imageSkeleton} />
			<div css={s.footerSkeleton} />
		</article>
	);
}

export default PostPageSkeleton;
