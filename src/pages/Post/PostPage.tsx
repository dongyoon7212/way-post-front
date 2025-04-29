/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import postImg1 from "../../assets/postImg1.jpg";
import { FaComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { PhotoPost, principalData } from "../../types";
import { addComment, getPhotoPostListByUserId } from "../../apis/apis/postApi";
import { useQueryClient } from "@tanstack/react-query";

function PostPage() {
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [comment, setComment] = useState<string>("");
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			getPhotoPostListByUserId(parseInt(params.id)).then((response) => {
				const typedResponse = response as {
					status: number;
					data: PhotoPost[];
				};
				if (typedResponse.status === 200) {
					setPostGroup(typedResponse.data);
				}
			});
		}
	}, []);

	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (photoPostId: number, userId: number) => {
		addComment({
			photoPostId: photoPostId,
			userId: userId,
			content: comment,
		}).then((response) => {});
	};

	return (
		<div css={s.layout}>
			<header css={s.headerLayout}>
				<div css={s.headerBox}>
					<button
						css={s.logo}
						onClick={() => {
							navigate("/");
						}}
					>
						Way-Post
					</button>
					<button css={s.menu}>
						<LuAlignJustify />
					</button>
				</div>
			</header>
			<main css={s.feedLayout}>
				{postGroup.map((post, id) => (
					<article key={id} css={s.postCard}>
						<div css={s.postHeader}>
							<img
								src={post.user.profileImg}
								alt={"프로필 이미지"}
								css={s.avatar}
							/>
							<span css={s.username}>{post.user.username}</span>
						</div>
						<div css={s.postImage}>
							<img src={post.imgUrl} alt={"게시물 이미지"} />
						</div>
						<div css={s.btnBox}>
							<p>
								<AiFillLike /> 3개
							</p>
							<p>
								<FaComments /> 4개
							</p>
						</div>
						<div css={s.postCaption}>
							<strong>{post.user.username}</strong>{" "}
							<span>{post.postText}</span>
						</div>
						<div css={s.comments}>
							{post.comments.map((comment, id) => (
								<p key={id} css={s.commentLine}>
									<strong>{comment.user.username}</strong>{" "}
									{comment.content}
								</p>
							))}
						</div>
						<form css={s.commentForm}>
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
					</article>
				))}
			</main>
		</div>
	);
}

export default PostPage;
