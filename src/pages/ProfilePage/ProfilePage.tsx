/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PhotoPost, principalData, User } from "../../types";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { v4 as uuid } from "uuid";
import { editProfileImg, getUserById } from "../../apis/apis/accountApi";
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

	console.log(postGroup);

	const handleProfileImageClick = () => {
		fileInputRef.current?.click();
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
										css={s.editBtn}
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
									/>{" "}
								</>
							) : (
								<></>
							)}
						</div>
						<div css={s.follow}>
							<span>
								게시물 <p>990</p>
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
						<div css={s.postBox} key={post.photoPostId || index}>
							{/* 스켈레톤 + 실제 이미지 */}
							<PhotoPostSkeleton
								src={post.imgUrl}
								alt={`게시물 이미지 ${index + 1}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
