/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import * as s from "./style";
import { PhotoPost } from "../../types";
import { FaComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { PhotoPostSkeleton } from "../PhotoPostSkeleton/PhotoPostSkeleton";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	postGroup: PhotoPost[];
}

function PhotoPostModal({ isOpen, onClose, postGroup }: Props) {
	return (
		<div css={s.modalWrapper(isOpen)}>
			<button onClick={onClose} css={s.closeBtn}>
				<IoCloseOutline />
			</button>
			<div css={s.postContainer}>
				{postGroup.map((post, id) => (
					<div key={id} css={s.postBox}>
						<div css={s.profileBox}>
							<img src={post.user.profileImg} />
							<div>
								<h3>{post.user.username}</h3>
								<p>
									{post.locationAddress} / {post.cameraModel}
								</p>
							</div>
						</div>
						<div css={s.imgBox}>
							<PhotoPostSkeleton
								src={post.imgUrl}
								alt={`게시물 이미지 ${id + 1}`}
							/>
						</div>
						<div css={s.textBox}>
							<p>{post.postText}</p>
						</div>
						<div css={s.commentBox}>
							<p>
								<FaComments /> 4개
							</p>
							<p>
								<AiFillLike /> 3개
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PhotoPostModal;
