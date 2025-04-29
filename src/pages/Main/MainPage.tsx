/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import SideBarComponent from "../../components/SideBar/SideBarComponent";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import SignUpModalComponent from "../../components/SignUpModalComponent/SignUpModalComponent";
import PhotoUploadModalComponent from "../../components/PhotoUploadModalComponent/PhotoUploadModalComponent";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import LocationSearch, {
	LocationSearchRef,
} from "../../components/LocationSearch/LocationSearch";
import PhotoPostModal from "../../components/PhotoPostModal/PhotoPostModal";
import { PhotoPost, principalData } from "../../types";

function MainPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 상태
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isPhotoPostModalOpen, setIsPhotoPostModalOpen] = useState(false);
	const [postGroup, setPostGroup] = useState<PhotoPost[]>([]);
	const [markerPosition, setMarkerPosition] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const locationSearchRef = useRef<LocationSearchRef>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);

	const menuRef = useRef<HTMLDivElement>(null);

	const handleChangeLocation = (lat: number, lng: number) => {
		setMarkerPosition({ lat, lng });
	};

	// 바깥 클릭 시 메뉴 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	const libraries: Library[] = ["places"];

	return (
		<div css={s.layout}>
			<LoadScript
				googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
				libraries={libraries} // 필수 prop 추가
			>
				<SideBarComponent
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					onLogin={() => setIsLoginOpen(true)}
				/>
				<GoogleMapComponent
					markerPosition={markerPosition}
					upLoadModalOpen={isUploadModalOpen}
					setIsPhotoPostModalOpen={() =>
						setIsPhotoPostModalOpen(!isPhotoPostModalOpen)
					}
					setPostGroup={setPostGroup}
				/>
				<button
					css={s.sidebarBtn}
					onClick={() => setIsSidebarOpen(true)}
				>
					<LuAlignJustify />
				</button>
				<div css={s.searchBox}>
					<LocationSearch
						ref={locationSearchRef}
						onLocationSelected={(location) => {
							setMarkerPosition({
								lat: location.lat,
								lng: location.lng,
							});
						}}
					/>
				</div>
				<button
					css={s.profileBtn}
					onClick={
						principalData
							? () => {
									navigate(
										`/profile/${principalData.data.user.userId}`
									);
							  }
							: () => setIsLoginOpen(true)
					}
				>
					{principalData ? (
						<img src={principalData.data.user.profileImg} />
					) : (
						<IoMdLogIn size={24} />
					)}
				</button>
				<div css={s.addPostContainer} ref={menuRef}>
					<button
						css={s.addPostBtn}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<FaPlus />
					</button>
					<div css={s.menuWrapper(isMenuOpen)}>
						<button
							css={s.menuItem}
							onClick={() => {
								if (principalData) {
									setIsUploadModalOpen(true);
								} else {
									alert("로그인 후 사용 가능합니다.");
									setIsLoginOpen(true);
								}
							}}
						>
							📷 사진 업로드
						</button>
						<button css={s.menuItem}>📝 일정 업로드</button>
					</div>
				</div>
				<PhotoUploadModalComponent
					isOpen={isUploadModalOpen}
					onClose={() => setIsUploadModalOpen(false)}
					onMetaDataExtracted={handleChangeLocation}
				/>
				<PhotoPostModal
					isOpen={isPhotoPostModalOpen}
					onClose={() => setIsPhotoPostModalOpen(false)}
					postGroup={postGroup}
					key={postGroup[0]?.photoPostId}
				/>
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
			</LoadScript>
		</div>
	);
}

export default MainPage;
