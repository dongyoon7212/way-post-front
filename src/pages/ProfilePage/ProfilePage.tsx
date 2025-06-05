/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { GetUserResponse, PhotoPost, principalData, User } from "../../types";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import logo2 from "../../assets/logo2.png";
import { v4 as uuid } from "uuid";
import {
	editIntroduce,
	editProfileImg,
	follow,
	getFollowerList,
	getFollowingList,
	getUserById,
	unfollow,
} from "../../apis/apis/accountApi";
import { getPhotoPostListByUserId } from "../../apis/apis/postApi";
import { PhotoPostSkeleton } from "../../components/PhotoPostSkeleton/PhotoPostSkeleton";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import SignUpModalComponent from "../../components/SignUpModalComponent/SignUpModalComponent";
import { IoMdSettings } from "react-icons/io";
import { instance } from "../../apis/utils/instance";

function ProfilePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	const params = useParams();
	const [userData, setUserData] = useState<GetUserResponse>();
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [isIntroduceModalOpen, setIsIntroduceModalOpen] = useState(false);
	const [newIntroduce, setNewIntroduce] = useState("");
	const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
	const [followModalType, setFollowModalType] = useState<
		"follower" | "following" | null
	>(null);
	const [followList, setFollowList] = useState<User[]>([]);

	useEffect(() => {
		if (params.id) {
			getUserById(params.id).then((response) => {
				const typedResponse = response as {
					status: number;
					data: GetUserResponse;
				};
				if (typedResponse.status === 200) {
					setUserData(typedResponse.data);
				}
			});
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

	useEffect(() => {
		if (principalData) {
			if (principalData?.data?.user?.isEnabled === 0) {
				if (
					window.confirm(
						"비활성화된 계정입니다. 비활성화된 계정을 복구하시겠습니까?"
					)
				) {
					navigate("/activate-account");
				} else {
					alert("로그아웃 되었습니다.");
					localStorage.removeItem("accessToken");
					instance.interceptors.request.use((config) => {
						config.headers.Authorization = null;
						return config;
					});
					queryClient.refetchQueries({
						queryKey: ["getPrincipal"],
					});
					window.location.href = `/profile/${params.id}`;
				}
			}
		}
	}, [principalData]);

	const handleOpenIntroduceModal = () => {
		setNewIntroduce(userData?.user.introduce || "");
		setIsIntroduceModalOpen(true);
	};

	// 모달에서 “저장” 클릭
	const handleSaveIntroduce = () => {
		if (!principalData) return;
		editIntroduce({ introduce: newIntroduce }).then((response) => {
			if ((response as { status: number }).status === 200) {
				setUserData((u) => (u ? { ...u, introduce: newIntroduce } : u));
				setIsIntroduceModalOpen(false);
			}
		});
	};

	const handleProfileImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleCardClick = (id: Number, postId: Number) => {
		navigate(`/post/${id}`, {
			state: { selectedPostId: postId },
		});
	};

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const fileRef = ref(
			storage,
			`user-profile-img/${uuid()}_${file.name.split(".").pop()}`
		);
		setIsUploading(true);
		const uploadTask = uploadBytesResumable(fileRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				console.error("Error uploading file:", error);
				setIsUploading(false);
			},
			() => {
				getDownloadURL(fileRef).then((url) => {
					editProfileImg({
						userId: principalData?.data?.user?.userId,
						profileImg: url,
					})
						.then((response) => {
							const typedResponse = response as {
								status: number;
							};
							if (typedResponse.status === 200) {
								setIsUploading(false);
								alert("프로필 이미지가 변경되었습니다.");
								window.location.reload();
							}
						})
						.catch((error) => {
							if (error.response.status === 400) {
							}
						});
				});
			}
		);
	};

	const handleFollowClick = () => {
		// 팔로우 버튼 클릭 시 동작
		if (!principalData) {
			alert("로그인 후 사용해주세요.");
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
		if (params.id) {
			follow({ followeeId: params.id }).then((response) => {
				const typedResponse = response as {
					status: number;
				};
				if (typedResponse.status === 200) {
					alert("팔로우 되었습니다.");
					window.location.reload();
				}
			});
		}
	};

	const handleUnfollowClick = () => {
		if (!principalData) {
			alert("로그인 후 사용해주세요.");
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
		if (params.id) {
			unfollow({ followeeId: params.id }).then((response) => {
				const typedResponse = response as {
					status: number;
				};
				if (typedResponse.status === 200) {
					alert("언팔로우 되었습니다.");
					window.location.reload();
				}
			});
		}
	};

	const handleLogoutClick = () => {
		localStorage.removeItem("accessToken");
		instance.interceptors.request.use((config) => {
			config.headers.Authorization = null;
			return config;
		});
		queryClient.refetchQueries({ queryKey: ["getPrincipal"] });
		alert("로그아웃 되었습니다.");
		window.location.href = "/";
	};

	const handleOpenFollowModal = (type: "follower" | "following") => {
		if (!params.id) return;

		if (type === "follower") {
			setFollowModalType(type);
			setIsFollowModalOpen(true);
			getFollowerList(parseInt(params.id)).then((res) => {
				const typedRes = res as { status: number; data: User[] };
				if (typedRes.status === 200) {
					setFollowList(typedRes.data);
				}
			});
		} else if (type === "following") {
			setFollowModalType(type);
			setIsFollowModalOpen(true);
			getFollowingList(parseInt(params.id)).then((res) => {
				const typedRes = res as { status: number; data: User[] };
				if (typedRes.status === 200) {
					setFollowList(typedRes.data);
				}
			});
		}
	};

	const handleVerifyAccountClick = () => {
		navigate("/mail-certification");
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
			<div css={s.headerLayout}>
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
			</div>
			<div css={s.contentLayout}>
				<div css={s.infoLayout}>
					<div css={s.profileImgBox}>
						<div css={s.imgBox}>
							<img
								src={userData?.user.profileImg}
								alt="프로필 이미지"
							/>
						</div>
					</div>
					<div css={s.profileInfoBox}>
						<div css={s.profileName}>
							<span>{userData?.user?.username}</span>
							{principalData?.data?.user?.userId == params?.id ? (
								<></>
							) : (
								<>
									{userData?.isFollowed === 0 ? (
										<>
											<button
												css={s.followBtn}
												onClick={handleFollowClick}
											>
												팔로우
											</button>
										</>
									) : (
										<>
											<button
												css={s.followBtn}
												onClick={handleUnfollowClick}
											>
												언팔로우
											</button>
										</>
									)}
								</>
							)}
							{principalData?.data?.user?.userId == params?.id ? (
								<>
									<button
										css={s.settingBtn}
										onClick={() =>
											setIsMenuOpen(!isMenuOpen)
										}
									>
										<IoMdSettings />
									</button>
									<div css={s.menuWrapper(isMenuOpen)}>
										<button
											onClick={handleProfileImageClick}
											css={s.editImgBtn}
										>
											{isUploading ? (
												<p>
													업로드 중...{" "}
													{Math.round(uploadProgress)}
													%
												</p>
											) : (
												<p>프로필 변경</p>
											)}
										</button>
										<input
											type="file"
											accept="image/*"
											ref={fileInputRef}
											style={{ display: "none" }}
											onChange={handleImageUpload}
										/>
										<button
											css={s.editIntrodueceBtn}
											onClick={handleOpenIntroduceModal}
										>
											<p>소개 변경</p>
										</button>
										<button
											css={s.deleteAccountBtn}
											onClick={() => {
												navigate("/deactivate-account");
											}}
										>
											<p>계정 탈퇴</p>
										</button>
										<button
											css={s.logoutBtn}
											onClick={handleLogoutClick}
										>
											<p>로그아웃</p>
										</button>
										{principalData?.data.user.userRoles[0]
											.roleId === 3 ? (
											<button
												css={s.verifyAccountBtn}
												onClick={
													handleVerifyAccountClick
												}
											>
												<p>이메일 인증</p>
											</button>
										) : (
											<></>
										)}
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						<div css={s.follow}>
							<span>
								게시물 <p>{postGroup.length}</p>
							</span>
							<span
								onClick={() =>
									handleOpenFollowModal("follower")
								}
							>
								팔로워 <p>{userData?.followerCount}</p>
							</span>
							<span
								onClick={() =>
									handleOpenFollowModal("following")
								}
							>
								팔로우 <p>{userData?.followingCount}</p>
							</span>
						</div>
						<div css={s.introduce}>{userData?.user.introduce}</div>
					</div>
				</div>
				<div css={s.postLayout}>
					{postGroup.map((post, index) => (
						<div
							css={s.postBox}
							key={post.photoPostId || index}
							onClick={() =>
								handleCardClick(post?.userId, post.photoPostId)
							}
						>
							<PhotoPostSkeleton
								src={post.imgUrl}
								alt={`게시물 이미지 ${index + 1}`}
							/>
						</div>
					))}
				</div>
			</div>
			{isIntroduceModalOpen && (
				<div
					css={s.bottomOverlay}
					onClick={() => setIsIntroduceModalOpen(false)}
				>
					<div
						css={s.bottomModal}
						onClick={
							(e) =>
								e.stopPropagation() /* 배경 클릭 시 닫히지만, 모달 내부 클릭은 전파 방지 */
						}
					>
						<h3>프로필 소개 수정</h3>
						<textarea
							css={s.introTextarea}
							value={newIntroduce}
							onChange={(e) => setNewIntroduce(e.target.value)}
							rows={4}
						/>
						<div css={s.modalButtons}>
							<button
								onClick={() => setIsIntroduceModalOpen(false)}
							>
								취소
							</button>
							<button onClick={handleSaveIntroduce}>저장</button>
						</div>
					</div>
				</div>
			)}
			{isFollowModalOpen && (
				<div
					css={s.overlay}
					onClick={() => setIsFollowModalOpen(false)}
				>
					<div css={s.modalBox} onClick={(e) => e.stopPropagation()}>
						<h3>
							{followModalType === "follower"
								? "팔로워 목록"
								: "팔로우 목록"}
						</h3>
						<div css={s.userList}>
							{followList.map((user) => (
								<div
									key={user?.userId}
									css={s.userItem}
									onClick={() =>
										(window.location.href = `/profile/${user.userId}`)
									}
								>
									<img
										src={user.profileImg}
										alt="유저 이미지"
										css={s.userImg}
									/>
									<span>{user.username}</span>
								</div>
							))}
						</div>
						<button
							css={s.closeButton}
							onClick={() => setIsFollowModalOpen(false)}
						>
							닫기
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfilePage;
