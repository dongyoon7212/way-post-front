/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import * as s from "./style";
import { IoCloseOutline } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { MdOutlineFiberNew } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { instance } from "../../apis/utils/instance";

function SideBarComponent({
	isOpen,
	onClose,
	onLogin,
}: {
	isOpen: boolean;
	onClose: () => void;
	onLogin: () => void;
}) {
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData(["getPrincipal"]);

	const sidebarRef = useRef<HTMLDivElement>(null);
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
			<button
				css={s.loginBtn}
				onClick={principalData ? handleLogoutClick : onLogin}
			>
				{principalData ? "로그아웃" : "로그인"}
			</button>
		</div>
	);
}

export default SideBarComponent;
