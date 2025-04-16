/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as s from "./style";
import exifr from "exifr";
import { v4 as uuid } from "uuid";
import { Metadata, principalData } from "../../types";
import LocationSearch, {
	LocationSearchRef,
} from "../LocationSearch/LocationSearch";
import { storage } from "../../apis/firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";
import { photoPostUpload } from "../../apis/apis/postApi";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onMetaDataExtracted: (lat: number, lng: number) => void;
}

function PhotoUploadModalComponent({
	isOpen,
	onClose,
	onMetaDataExtracted,
}: Props) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [postText, setPostText] = useState("");
	const [metadata, setMetadata] = useState<Metadata>();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [manualMetadata, setManualMetadata] = useState({
		Model: "",
		latitude: "",
		longitude: "",
	});
	const [address, setAddress] = useState<string>("");
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const locationSearchRef = useRef<LocationSearchRef>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const principalQueryState = useQueryClient().getQueryState<principalData>([
		"getPrincipal",
	]);

	// 파일 선택 시 호출되는 핸들러
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSelectedFile(file);
			const preview = URL.createObjectURL(file);
			setPreviewUrl(preview);

			// 파일 선택 후 추가 로직(예: 미리보기, 업로드 준비 등) 작성 가능
			try {
				// exifr를 사용해 메타데이터 추출
				const meta = await exifr.parse(file);
				if (meta && meta.latitude && meta.longitude) {
					setMetadata(meta);
					onMetaDataExtracted(meta.latitude, meta.longitude);
					// metadata가 있고, latitude와 longitude 값이 있을 때
					const geocoder = new google.maps.Geocoder();
					geocoder.geocode(
						{
							location: {
								lat: meta.latitude,
								lng: meta.longitude,
							},
						},
						(results, status) => {
							// 주소 저장
							if (status === "OK" && results && results[1]) {
								const address = results[1].formatted_address;
								setAddress(address);
							} else {
								console.error("역지오코딩 실패:", status);
							}
						}
					);
				} else {
					console.log("GPS 정보가 없는 파일입니다.");
				}
			} catch (error) {
				console.error("메타데이터 추출 실패:", error);
			}
		}
	};

	// 텍스트 입력 핸들러
	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPostText(e.target.value);
	};

	// 수동 메타데이터 입력 핸들러
	const handleManualMetadataChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setManualMetadata((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 파일 업로드 버튼 클릭 핸들러
	const handleUploadButtonClick = () => {
		fileInputRef.current?.click();
	};

	// 게시물 최종 업로드
	const postHandler = () => {
		if (!selectedFile) {
			alert("파일을 선택해 주세요.");
			return;
		}
		const storageRef = ref(
			storage,
			`post-img/${uuid()}_${selectedFile.name}`
		);
		setIsUploading(true);

		const uploadTask = uploadBytesResumable(storageRef, selectedFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// 업로드 진행률(%) 계산
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				console.error("업로드 에러:", error);
				setIsUploading(false);
			},
			() => {
				// 업로드 완료 후 URL 가져오기
				getDownloadURL(storageRef).then((url) => {
					photoPostUpload({
						userId: principalQueryState?.data?.data.user.userId,
						postText: postText,
						imgUrl: url,
						cameraModel: metadata?.Model
							? metadata.Model
							: manualMetadata.Model,
						locationAddress: address,
						latitude: metadata?.latitude
							? metadata.latitude
							: manualMetadata.latitude,
						longitude: metadata?.longitude
							? metadata.longitude
							: manualMetadata.longitude,
					})
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error.response.data);
							if (error.response.status === 400) {
							}
						});
					setIsUploading(false);
					alert("사진 업로드 성공!");
					resetState();
					onClose();
				});
			}
		);
	};

	const resetState = () => {
		setSelectedFile(null);
		setPostText("");
		setMetadata(undefined);
		setPreviewUrl(null);
		setManualMetadata({
			Model: "",
			latitude: "",
			longitude: "",
		});
		setAddress("");

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleCancel = () => {
		if (window.confirm("정말로 취소하시겠습니까?")) {
			onClose();
			resetState();
			if (locationSearchRef.current) {
				locationSearchRef.current.reset();
			}
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					onMetaDataExtracted(
						pos.coords.latitude,
						pos.coords.longitude
					);
				},
				(error) => console.error("위치 정보 오류:", error),
				{ enableHighAccuracy: true }
			);
		}
	};

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	return (
		<div css={s.modalWrapper(isOpen)}>
			<div css={s.modalContainer}>
				<div css={s.contentWrapper}>
					{previewUrl ? (
						<div css={s.previewContainer}>
							<img src={previewUrl} alt="미리보기" />
						</div>
					) : (
						<button
							css={s.uploadButton}
							onClick={handleUploadButtonClick}
						>
							이미지 추가
						</button>
					)}
					<input
						ref={fileInputRef}
						css={s.fileInput}
						type="file"
						onChange={handleFileChange}
					/>
					{metadata ? (
						<div css={s.metadataContainer}>
							<div>
								<p>카메라 모델: {metadata.Model}</p>
								<p>위치: {address}</p>
							</div>
						</div>
					) : (
						<div css={s.manualMetadataContainer}>
							<div>
								<p>카메라 모델:</p>
								<input
									type="text"
									name="Model"
									value={manualMetadata.Model}
									onChange={handleManualMetadataChange}
									placeholder="모델 이름을 입력하세요"
								/>
							</div>
							<div>
								<p>위치:</p>
								<LocationSearch
									ref={locationSearchRef}
									onLocationSelected={(location) => {
										setAddress(location.address);
										// 선택한 위치의 위도와 경도를 상위로 전달
										onMetaDataExtracted(
											location.lat,
											location.lng
										);
										// 필요하다면 수동 메타데이터 상태도 업데이트
										setManualMetadata({
											...manualMetadata,
											latitude: location.lat.toString(),
											longitude: location.lng.toString(),
										});
									}}
								/>
							</div>
						</div>
					)}
					<textarea
						css={s.textInput}
						placeholder="게시글 내용을 입력하세요"
						value={postText}
						onChange={handleTextChange}
					/>
				</div>
				<div css={s.buttonContainer}>
					<button onClick={handleCancel} css={s.cancelBtn}>
						취소
					</button>
					<button onClick={postHandler} css={s.postBtn}>
						{isUploading ? (
							<p>업로드 중... {Math.round(uploadProgress)}%</p>
						) : (
							<p>업로드</p>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default PhotoUploadModalComponent;
