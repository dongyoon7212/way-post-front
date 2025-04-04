/** @jsxImportSource @emotion/react */
import * as s from "./style";
import profileImg from "../../assets/profileImg.png";
import { LuAlignJustify } from "react-icons/lu";

import React from "react";

function ProfilePage() {
	return (
		<div css={s.layout}>
			<div css={s.headerLayout}>
				<div css={s.headerBox}>
					<button css={s.logo}>Way-Post</button>
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
							<span>akiyamachoo</span>
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
				<div css={s.postLayout}></div>
			</div>
		</div>
	);
}

export default ProfilePage;
