/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import * as s from "./style";
import { IoCloseOutline } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { MdOutlineFiberNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SideBarComponent({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	// 사이드바 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// 사이드바 영역 바깥을 클릭하면 닫힘
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		// 이벤트 리스너 등록 (사이드바가 열려있을 때만)
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// 정리 함수 (언마운트 시 이벤트 제거)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);
	return (
		<div ref={sidebarRef} css={s.layout(isOpen)}>
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
			<button css={s.loginBtn} onClick={() => navigate("/login")}>
				로그인
			</button>
		</div>
	);
}

export default SideBarComponent;
