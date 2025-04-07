/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { IoCloseOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";

import exifr from "exifr";
import { Metadata } from "../../types";

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
	const fileInputRef = useRef<HTMLInputElement>(null);

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
				console.log("메타데이터:", meta);
				setMetadata(meta);
				if (meta && meta.latitude && meta.longitude) {
					console.log(meta.latitude, meta.longitude);
					onMetaDataExtracted(meta.latitude, meta.longitude);
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

	// 업로드 버튼 클릭 시 파일 선택창을 띄우는 함수
	const handleUploadButtonClick = () => {
		// 숨겨진 파일 input을 프로그래밍 방식으로 클릭
		fileInputRef.current?.click();
	};

	const postHandler = () => {
		// (선택) 실제 업로드 로직
		if (!selectedFile) {
			alert("파일을 선택해 주세요.");
			return;
		}

		console.log("업로드할 데이터:", selectedFile, postText);
		// try {
		// const response = await instance.post(
		// 	"/api/upload-photo",
		// 	formData,
		// 	{
		// 		headers: {
		// 			"Content-Type": "multipart/form-data",
		// 		},
		// 	}
		// );
		alert("사진 업로드 성공!");
		onClose();
		// } catch (error) {
		// 	console.error("사진 업로드 실패:", error);
		// 	alert("사진 업로드에 실패했습니다.");
		// }
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
			<button css={s.closeButton} onClick={onClose}>
				<IoCloseOutline />
			</button>
			<div css={s.contentWrapper}>
				{previewUrl ? (
					<div css={s.previewContainer}>
						<img src={previewUrl} alt="미리보기" />
					</div>
				) : (
					<div css={s.uploadButton} onClick={handleUploadButtonClick}>
						<LuImagePlus />
					</div>
				)}
				<input
					ref={fileInputRef}
					css={s.fileInput}
					type="file"
					onChange={handleFileChange}
				/>
				{metadata && (
					<div css={s.metadataContainer}>
						<div>
							<p>모델: {metadata.Model}</p>
						</div>
						<div>
							<p>위도: {metadata.latitude}</p>
							<p>경도: {metadata.longitude}</p>
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
			<button onClick={postHandler} css={s.postBtn}>
				게시
			</button>
		</div>
	);
}

export default PhotoUploadModalComponent;
