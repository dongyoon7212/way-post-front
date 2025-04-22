/** @jsxImportSource @emotion/react */
import * as s from "./style";
import profileImg from "../../assets/profileImg.png";
import postImg1 from "../../assets/postImg1.jpg";
import postImg2 from "../../assets/postImg2.jpg";
import postImg3 from "../../assets/postImg3.jpg";
import postImg4 from "../../assets/postImg4.jpg";
import postImg5 from "../../assets/postImg5.jpg";
import postImg6 from "../../assets/postImg6.jpg";
import postImg7 from "../../assets/postImg7.jpg";
import postImg8 from "../../assets/postImg8.jpg";
import postImg9 from "../../assets/postImg9.jpg";
import postImg10 from "../../assets/postImg10.jpg";
import { LuAlignJustify } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { principalData } from "../../types";
import { useRef, useState } from "react";
import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { v4 as uuid } from "uuid";
import { editProfileImg } from "../../apis/apis/accountApi";

function ProfilePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	console.log(principalData);

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
								src={principalData?.data.user.profileImg}
								alt="프로필 이미지"
							/>
						</div>
					</div>
					<div css={s.profileInfoBox}>
						<div css={s.profileName}>
							<span>{principalData?.data.user.username}</span>
							<button css={s.followBtn}>팔로우</button>
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
							/>
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
						<div css={s.introduce}>
							{principalData?.data.user.introduce}
						</div>
					</div>
				</div>
				<div css={s.postLayout}>
					{[
						postImg1,
						postImg2,
						postImg3,
						postImg4,
						postImg5,
						postImg6,
						postImg7,
						postImg8,
						postImg9,
						postImg10,
					].map((img, i) => (
						<div css={s.postBox} key={i}>
							<img src={img} alt={`게시물 이미지 ${i + 1}`} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
