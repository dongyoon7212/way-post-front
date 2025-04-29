/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import postImg1 from "../../assets/postImg1.jpg";
import { FaComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { PhotoPost } from "../../types";
import { getPhotoPostListByUserId } from "../../apis/apis/postApi";

function PostPage() {
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
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
							<p key={1} css={s.commentLine}>
								<strong>홍길동</strong> 댓글내용입니다.
							</p>
						</div>
						<form css={s.commentForm}>
							<input
								type="text"
								placeholder="댓글 달기..."
								css={s.commentInput}
							/>
							<button type="submit" css={s.commentButton}>
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
