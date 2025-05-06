/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { PhotoPost, principalData } from "../../types";
import { PhotoPostSkeleton } from "../PhotoPostSkeleton/PhotoPostSkeleton";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addComment, addLike, removeLike } from "../../apis/apis/postApi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaComments } from "react-icons/fa6";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	postGroup: PhotoPost[];
	setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PhotoPostModal({ isOpen, onClose, postGroup, setIsLoginOpen }: Props) {
	const [expandedComments, setExpandedComments] = useState<Set<number>>(
		new Set()
	);
	const [comment, setComment] = useState<string>("");
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);

	const toggleComments = (postId: number) => {
		setExpandedComments((prev) => {
			const next = new Set(prev);
			if (next.has(postId)) next.delete(postId);
			else next.add(postId);
			return next;
		});
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (photoPostId: number, userId: number) => {
		if (principalData === undefined) {
			alert("로그인 후 댓글을 작성해주세요.");
			setIsLoginOpen(true);
		} else {
			if (comment.trim() === "") {
				alert("댓글을 입력해주세요.");
				return;
			}
			addComment({
				photoPostId: photoPostId,
				userId: userId,
				content: comment,
			}).then((response) => {
				window.location.reload();
			});
		}
	};

	const toggleLikeClick = (postId: number) => {
		if (postGroup.find((p) => p.photoPostId === postId)?.isLiked) {
			console.log("좋아요 취소");
			if (!principalData) {
				setIsLoginOpen(true);
				return;
			}
			removeLike({
				userId: principalData.data.user.userId,
				photoPostId: postId,
			}).then((response) => {});
		} else {
			console.log("좋아요");
			if (!principalData) {
				setIsLoginOpen(true);
				return;
			}
			addLike({
				userId: principalData.data.user.userId,
				photoPostId: postId,
			}).then((response) => {});
		}
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<div css={s.modalWrapper(isOpen)}>
			<button onClick={onClose} css={s.closeBtn}>
				<IoCloseOutline />
			</button>
			<div css={s.postContainer}>
				{postGroup.map((post, id) => (
					<div key={id} css={s.postBox}>
						<div css={s.profileBox}>
							<a href={`/profile/${post.userId}`}>
								<img src={post.user.profileImg} />
							</a>
							<div>
								<a href={`/profile/${post.userId}`}>
									{post.user.username}
								</a>
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
						<div css={s.btnBox}>
							<p>
								{post.isLiked === 1 ? (
									<IoMdHeart
										onClick={() =>
											toggleLikeClick(post.photoPostId)
										}
										style={{
											marginRight: "5px",
											cursor: "pointer",
										}}
									/>
								) : (
									<IoMdHeartEmpty
										onClick={() =>
											toggleLikeClick(post.photoPostId)
										}
										style={{
											marginRight: "5px",
											cursor: "pointer",
										}}
									/>
								)}
								{post.likeCount}
							</p>
							<p>
								<FaComments style={{ marginRight: "7px" }} />
								{post.comments.length}
							</p>
						</div>
						<div css={s.textBox}>
							<p>{post.postText}</p>
						</div>
						<div css={s.commentBox}>
							{post.comments.length > 0 &&
								!expandedComments.has(post.photoPostId) && (
									<button
										css={s.viewCommentsBtn}
										onClick={() =>
											toggleComments(post.photoPostId)
										}
									>
										댓글 {post.comments.length}개 모두 보기
									</button>
								)}
							{expandedComments.has(post.photoPostId) && (
								<div css={s.comments}>
									{post.comments.map((c, idx) => (
										<p key={idx} css={s.commentLine}>
											<strong>{c.user.username}</strong>{" "}
											{c.content}
										</p>
									))}
								</div>
							)}
							<form
								css={s.commentForm}
								onSubmit={(e) => onSubmit(e)}
							>
								<input
									type="text"
									placeholder="댓글 달기..."
									css={s.commentInput}
									onChange={handleCommentChange}
									value={comment}
								/>
								<button
									type="submit"
									css={s.commentButton}
									onClick={() => {
										handleCommentSubmit(
											post.photoPostId,
											principalData?.data.user.userId ?? 0
										);
									}}
								>
									게시
								</button>
							</form>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PhotoPostModal;
