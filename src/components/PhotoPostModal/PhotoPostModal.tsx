/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import * as s from "./style";
import { PhotoPost } from "../../types";
import { FaComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	postGroup: PhotoPost[];
}

function PhotoPostModal({ isOpen, onClose, postGroup }: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<div ref={modalRef} css={s.modalWrapper(isOpen)}>
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
							<img src={post.imgUrl} />
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
