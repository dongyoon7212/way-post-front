/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PhotoPost, principalData, User } from "../../types";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import logo2 from "../../assets/logo2.png";
import { v4 as uuid } from "uuid";
import {
	editIntroduce,
	editProfileImg,
	getUserById,
} from "../../apis/apis/accountApi";
import { getPhotoPostListByUserId } from "../../apis/apis/postApi";
import { PhotoPostSkeleton } from "../../components/PhotoPostSkeleton/PhotoPostSkeleton";

function ProfilePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	const params = useParams();
	const [userData, setUserData] = useState<User>();
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [isIntroduceModalOpen, setIsIntroduceModalOpen] = useState(false);
	const [newIntroduce, setNewIntroduce] = useState("");

	useEffect(() => {
		if (params.id) {
			getUserById(params.id).then((response) => {
				const typedResponse = response as {
					status: number;
					data: User;
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

	const handleOpenIntroduceModal = () => {
		setNewIntroduce(userData?.introduce || "");
		setIsIntroduceModalOpen(true);
	};

	// 모달에서 “저장” 클릭
	const handleSaveIntroduce = () => {
		if (!principalData) return;
		editIntroduce({
			introduce: newIntroduce,
		}).then((response) => {
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
						userId: principalData?.data?.user.userId,
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
							console.log(error.response.data);
							if (error.response.status === 400) {
							}
						});
				});
			}
		);
	};

	return (
		<div css={s.layout}>
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
					<button css={s.menu}>
						<LuAlignJustify />
					</button>
				</div>
			</div>
			<div css={s.contentLayout}>
				<div css={s.infoLayout}>
					<div css={s.profileImgBox}>
						<div css={s.imgBox}>
							<img
								src={userData?.profileImg}
								alt="프로필 이미지"
							/>
						</div>
					</div>
					<div css={s.profileInfoBox}>
						<div css={s.profileName}>
							<span>{userData?.username}</span>
							{principalData?.data.user.userId == params?.id ? (
								<></>
							) : (
								<>
									<button css={s.followBtn}>팔로우</button>
								</>
							)}
							{principalData?.data.user.userId == params?.id ? (
								<>
									<button
										onClick={handleProfileImageClick}
										css={s.editImgBtn}
									>
										{isUploading ? (
											<p>
												업로드 중...{" "}
												{Math.round(uploadProgress)}%
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
								</>
							) : (
								<></>
							)}
						</div>
						<div css={s.follow}>
							<span>
								게시물 <p>{postGroup.length}</p>
							</span>
							<span>
								팔로워 <p>80.5만</p>
							</span>
							<span>
								팔로우 <p>215</p>
							</span>
						</div>
						<div css={s.introduce}>{userData?.introduce}</div>
					</div>
				</div>
				<div css={s.postLayout}>
					{postGroup.map((post, index) => (
						<div
							css={s.postBox}
							key={post.photoPostId || index}
							onClick={() =>
								handleCardClick(post.userId, post.photoPostId)
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
		</div>
	);
}

export default ProfilePage;
