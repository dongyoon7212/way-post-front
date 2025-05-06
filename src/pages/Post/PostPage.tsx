/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { FaComments } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { PhotoPost, principalData } from "../../types";
import {
	addComment,
	getPhotoPostListByUserId,
	removePhotoPost,
} from "../../apis/apis/postApi";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import SignUpModalComponent from "../../components/SignUpModalComponent/SignUpModalComponent";

function PostPage() {
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [comment, setComment] = useState<string>("");
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	const navigate = useNavigate();
	const params = useParams();
	const { state } = useLocation();
	const selectedPostId: number | undefined = state?.selectedPostId;
	const postRefs = useRef<Record<number, HTMLDivElement | null>>({});
	console.log(principalData);
	useEffect(() => {
		if (selectedPostId == null) return;
		const el = postRefs.current[selectedPostId];
		if (!el) return;
		const elementY = el.getBoundingClientRect().top + window.pageYOffset;
		const headerHeight = window.innerHeight * 0.08;
		window.scrollTo({
			top: elementY - headerHeight,
			behavior: "smooth",
		});
	}, [selectedPostId, postGroup]);

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
			}).then((response) => {});
		}
	};

	const handleRemovePostClick = (id: Number) => {
		if (window.confirm("정말로 삭제하시겠습니까?")) {
			removePhotoPost(id).then((response) => {
				const typedResponse = response as {
					status: number;
				};
				if (typedResponse.status === 200) {
					alert("삭제되었습니다.");
					setPostGroup((prev) =>
						prev.filter((post) => post.photoPostId !== id)
					);
					setOpenMenuId(null);
				}
			});
		}
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<div css={s.layout}>
			{isLoginOpen && (
				<LoginModalComponent
					isOpen={isLoginOpen}
					onClose={() => setIsLoginOpen(false)}
					onSignUpOpen={() => {
						setIsLoginOpen(false);
						setIsSignUpOpen(true);
					}}
				/>
			)}
			<SignUpModalComponent
				isOpen={isSignUpOpen}
				onClose={() => setIsSignUpOpen(false)}
				onLoginOpen={() => setIsLoginOpen(true)}
			/>
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
					<article
						key={id}
						css={s.postCard}
						ref={(el) =>
							(postRefs.current[post.photoPostId] =
								el as HTMLDivElement | null)
						}
					>
						<div css={s.postHeader}>
							<div css={s.profileBox}>
								<img
									src={post.user.profileImg}
									alt={"프로필 이미지"}
									css={s.avatar}
								/>
								<span css={s.username}>
									{post.user.username}
								</span>
							</div>
							{principalData?.data.user.userId ===
								post.userId && (
								<button
									css={s.dropdownBtn}
									onClick={() =>
										setOpenMenuId(
											openMenuId === post.photoPostId
												? null
												: post.photoPostId
										)
									}
								>
									<HiOutlineDotsVertical />
								</button>
							)}
							{openMenuId === post.photoPostId && (
								<div css={s.dropdownMenu} ref={menuRef}>
									<button css={s.dropdownItem}>수정</button>
									<button
										css={s.dropdownItem}
										onClick={() =>
											handleRemovePostClick(
												post.photoPostId
											)
										}
									>
										삭제
									</button>
								</div>
							)}
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
						<form css={s.commentForm} onSubmit={(e) => onSubmit(e)}>
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
