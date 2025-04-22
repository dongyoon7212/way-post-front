/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";
import { PhotoPost } from "../../types";

interface Props {
	isOpen: boolean;
	postGroup: PhotoPost[];
}

function PhotoPostModal({ isOpen, postGroup }: Props) {
	return (
		<div css={s.modalWrapper(isOpen)}>
			<div>
				{postGroup.map((post, id) => (
					<div key={id}>
						<img src={post.imgUrl} />
						<div>
							<h3>{post.locationAddress}</h3>
							<p>{post.postText}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PhotoPostModal;
