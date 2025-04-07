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

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { principalData } from "../../types";

function ProfilePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);
	console.log(principalData);

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
							<img src={profileImg} alt="프로필 이미지" />
						</div>
					</div>
					<div css={s.profileInfoBox}>
						<div css={s.profileName}>
							<span>{principalData?.data.user.username}</span>
							<button>팔로우</button>
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
							🇰🇷🇯🇵ONE MMA athlete
							<br />
							CEO of SUNG 1975
							<br />
							아저씨 YouTuber
						</div>
					</div>
				</div>
				<div css={s.postLayout}>
					<div css={s.postBox}>
						<img src={postImg1} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg2} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg3} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg4} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg5} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg6} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg7} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg8} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg9} alt="" />
					</div>
					<div css={s.postBox}>
						<img src={postImg10} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
