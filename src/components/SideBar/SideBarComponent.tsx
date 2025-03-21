/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";
import { IoCloseOutline } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { MdOutlineFiberNew } from "react-icons/md";

function SideBarComponent({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	return (
		<div css={s.layout(isOpen)}>
			<button onClick={onClose} css={s.closeBtn}>
				<IoCloseOutline />
			</button>
			<nav css={s.menu}>
				<ul>
					<li>
						<div css={s.menuIcon}>
							<BsFire />
						</div>
						<p>인기 포스트</p>
					</li>
					<li>
						<div css={s.menuIcon}>
							<MdOutlineFiberNew />
						</div>
						<p>최근 포스트</p>
					</li>
				</ul>
			</nav>
			<button css={s.loginBtn}>로그인</button>
		</div>
	);
}

export default SideBarComponent;
