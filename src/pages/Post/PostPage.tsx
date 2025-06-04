/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { FaComments } from "react-icons/fa6";
import logo2 from "../../assets/logo2.png";
import { useEffect, useRef, useState } from "react";
import { PhotoPost, principalData } from "../../types";
import {
	addComment,
	addLike,
	editPhotoPostText,
	getPhotoPostListByUserId,
	removeLike,
	removePhotoPost,
} from "../../apis/apis/postApi";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import SignUpModalComponent from "../../components/SignUpModalComponent/SignUpModalComponent";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import PostPageSkeleton from "../../components/PostPageSkeleton/PostPageSkeleton";
import { instance } from "../../apis/utils/instance";

function PostPage() {
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [comment, setComment] = useState<string>("");
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [expandedComments, setExpandedComments] = useState<Set<number>>(
		new Set()
	);
	const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
	const [editPostId, setEditPostId] = useState<number | null>(null);
	const [newPost, setNewPost] = useState("");

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
	const hasScrolledRef = useRef(false);

	useEffect(() => {
		if (hasScrolledRef.current) return; // 이미 스크롤했다면 무시
		if (selectedPostId == null) return;
		const el = postRefs.current[selectedPostId];
		if (!el) return;
		const elementY = el.getBoundingClientRect().top + window.pageYOffset;
		const headerHeight = window.innerHeight * 0.08;
		window.scrollTo({
			top: elementY - headerHeight,
			behavior: "smooth",
		});
		hasScrolledRef.current = true;
	}, [selectedPostId, postGroup]);

	useEffect(() => {
		if (principalData) {
			if (principalData.data.user.isEnabled === 0) {
				if (
					window.confirm(
						"비활성화된 계정입니다. 비활성화된 계정을 복구하시겠습니까?"
					)
				) {
					navigate("/activate-account");
				} else {
					alert("비활성화된 계정은 사용하실 수 없습니다.");
					localStorage.removeItem("accessToken");
					instance.interceptors.request.use((config) => {
						config.headers.Authorization = null;
						return config;
					});
					queryClient.refetchQueries({
						queryKey: ["getPrincipal"],
					});
					window.location.href = `/post/${params.id}`;
				}
			}
		}
	}, [principalData]);

	useEffect(() => {
		if (params.id) {
			setIsLoading(true); // 페칭 시작 전
			getPhotoPostListByUserId(parseInt(params.id))
				.then((response) => {
					const typedResponse = response as {
						status: number;
						data: PhotoPost[];
					};
					if (typedResponse.status === 200) {
						setPostGroup(typedResponse.data);
					}
				})
				.finally(() => {
					setIsLoading(false);
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
			if (principalData?.data.user.userRoles[0].roleId === 3) {
				if (
					window.confirm(
						"정상적인 서비스를 위해서는 이메일 인증이 필요합니다."
					)
				) {
					navigate("/mail-certification");
				} else {
					alert("서비스 이용이 제한될 수 있습니다.");
					setComment("");
					return;
				}
			}
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

	const toggleComments = (postId: number) => {
		setExpandedComments((prev) => {
			const next = new Set(prev);
			if (next.has(postId)) next.delete(postId);
			else next.add(postId);
			return next;
		});
	};

	const toggleLikeClick = (postId: number) => {
		if (postGroup.find((p) => p.photoPostId === postId)?.isLiked) {
			if (!principalData) {
				setIsLoginOpen(true);
				return;
			}
			if (principalData?.data.user.userRoles[0].roleId === 3) {
				if (
					window.confirm(
						"정상적인 서비스를 위해서는 이메일 인증이 필요합니다."
					)
				) {
					navigate("/mail-certification");
				} else {
					alert("서비스 이용이 제한될 수 있습니다.");
					return;
				}
			}
			removeLike({
				userId: principalData.data.user.userId,
				photoPostId: postId,
			}).then((response) => {
				if (params.id) {
					getPhotoPostListByUserId(parseInt(params.id)).then(
						(response) => {
							const typedResponse = response as {
								status: number;
								data: PhotoPost[];
							};
							if (typedResponse.status === 200) {
								setPostGroup(typedResponse.data);
							}
						}
					);
				}
			});
		} else {
			if (!principalData) {
				setIsLoginOpen(true);
				return;
			}
			if (principalData?.data.user.userRoles[0].roleId === 3) {
				if (
					window.confirm(
						"정상적인 서비스를 위해서는 이메일 인증이 필요합니다."
					)
				) {
					navigate("/mail-certification");
				} else {
					alert("서비스 이용이 제한될 수 있습니다.");
					return;
				}
			}
			addLike({
				userId: principalData.data.user.userId,
				photoPostId: postId,
			}).then((response) => {
				if (params.id) {
					getPhotoPostListByUserId(parseInt(params.id)).then(
						(response) => {
							const typedResponse = response as {
								status: number;
								data: PhotoPost[];
							};
							if (typedResponse.status === 200) {
								setPostGroup(typedResponse.data);
							}
						}
					);
				}
			});
		}
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
	};

	const formatTimeFromNow = (dateInput: string | Date): string => {
		const date = new Date(dateInput);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHour = Math.floor(diffMin / 60);

		if (diffHour < 24) {
			if (diffHour >= 1) return `${diffHour}시간 전`;
			if (diffMin >= 1) return `${diffMin}분 전`;
			return `방금 전`;
		}

		// 24시간 이상일 경우 날짜 출력
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		return `${year}.${month}.${day}`;
	};

	const handleEditModalOpen = (postId: number) => {
		setEditPostId(postId);
		setIsPostEditModalOpen(true);
	};

	const handleSavePostEdit = () => {
		if (newPost.trim() === "") {
			alert("게시물 내용을 입력해주세요.");
			return;
		}

		editPhotoPostText({
			photoPostId: editPostId,
			text: newPost,
		}).then((response) => {
			const typedResponse = response as {
				status: number;
			};
			if (typedResponse.status === 200) {
				alert("게시물이 수정되었습니다.");
				setIsPostEditModalOpen(false);
				setNewPost("");
				// 게시물 목록을 다시 불러오기
				getPhotoPostListByUserId(parseInt(params.id ?? "0")).then(
					(response) => {
						const typedResponse = response as {
							status: number;
							data: PhotoPost[];
						};
						if (typedResponse.status === 200) {
							setPostGroup(typedResponse.data);
						}
					}
				);
			} else {
				alert("게시물 수정에 실패했습니다.");
			}
		});
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
					<div
						css={s.logoBox}
						onClick={() => {
							navigate("/");
						}}
					>
						<img src={logo2} alt="logo" />
					</div>
				</div>
			</header>
			<main css={s.feedLayout}>
				{isLoading
					? // 3개짜리 스켈레톤을 보여줄 거면
					  Array(3)
							.fill(null)
							.map((_, i) => <PostPageSkeleton key={i} />)
					: postGroup.map((post, id) => (
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
											onClick={() =>
												navigate(
													`/profile/${post.userId}`
												)
											}
										/>
										<span
											css={s.username}
											onClick={() =>
												navigate(
													`/profile/${post.userId}`
												)
											}
										>
											{post.user.username}
										</span>
										<span css={s.postTime}>
											{formatTimeFromNow(post.regDt)}
										</span>
									</div>
									{principalData?.data.user.userId ===
										post.userId && (
										<button
											css={s.dropdownBtn}
											onClick={() =>
												setOpenMenuId(
													openMenuId ===
														post.photoPostId
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
											<button
												css={s.dropdownItem}
												onClick={() => {
													handleEditModalOpen(
														post.photoPostId
													);
													setNewPost(post.postText);
												}}
											>
												수정
											</button>
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
									<img
										src={post.imgUrl}
										alt={"게시물 이미지"}
									/>
								</div>
								<div css={s.btnBox}>
									<div>
										<p>
											{post.isLiked === 1 ? (
												<IoMdHeart
													onClick={() =>
														toggleLikeClick(
															post.photoPostId
														)
													}
													style={{
														marginRight: "5px",
														cursor: "pointer",
														color: "#FF3B30",
														fontSize: "1.3rem",
													}}
												/>
											) : (
												<IoMdHeartEmpty
													onClick={() =>
														toggleLikeClick(
															post.photoPostId
														)
													}
													style={{
														marginRight: "5px",
														cursor: "pointer",
														color: "#bfbfbf",
														fontSize: "1.3rem",
													}}
												/>
											)}
											{post.likeCount}
										</p>
										<p>
											<FaComments
												style={{
													marginRight: "7px",
													color: "#656565",
													fontSize: "1.3rem",
												}}
											/>
											{post.comments.length}
										</p>
									</div>
									<span css={s.postLocation}>
										{post.locationAddress}
									</span>
								</div>
								<div css={s.postCaption}>
									<strong
										onClick={() =>
											navigate(`/profile/${post.userId}`)
										}
									>
										{post.user.username}
									</strong>{" "}
									<span>{post.postText}</span>
								</div>
								{post.comments.length > 0 &&
									!expandedComments.has(post.photoPostId) && (
										<button
											css={s.viewCommentsBtn}
											onClick={() =>
												toggleComments(post.photoPostId)
											}
										>
											댓글 {post.comments.length}개 모두
											보기
										</button>
									)}
								{expandedComments.has(post.photoPostId) && (
									<div css={s.comments}>
										{post.comments.map((c, idx) => (
											<p key={idx} css={s.commentLine}>
												<strong
													onClick={() =>
														navigate(
															`/profile/${c.user.userId}`
														)
													}
												>
													{c.user.username}
												</strong>{" "}
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
												principalData?.data.user
													.userId ?? 0
											);
										}}
									>
										게시
									</button>
								</form>
							</article>
					  ))}
				{isPostEditModalOpen && (
					<div
						css={s.bottomOverlay}
						onClick={() => setIsPostEditModalOpen(false)}
					>
						<div
							css={s.bottomModal}
							onClick={
								(e) =>
									e.stopPropagation() /* 배경 클릭 시 닫히지만, 모달 내부 클릭은 전파 방지 */
							}
						>
							<h3>게시물 수정</h3>
							<textarea
								css={s.introTextarea}
								value={newPost}
								onChange={(e) => setNewPost(e.target.value)}
								rows={4}
							/>
							<div css={s.modalButtons}>
								<button
									onClick={() =>
										setIsPostEditModalOpen(false)
									}
								>
									취소
								</button>
								<button onClick={handleSavePostEdit}>
									저장
								</button>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default PostPage;
