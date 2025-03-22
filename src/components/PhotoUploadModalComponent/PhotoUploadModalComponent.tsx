/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

function PhotoUploadModalComponent({ isOpen, onClose }: Props) {
	return (
		<div css={s.modalWrapper(isOpen)}>
			<button css={s.closeButton} onClick={onClose}>
				<IoCloseOutline />
			</button>
			<div css={s.contentWrapper}>
				<button css={s.uploadButton}>사진 업로드</button>
				<input
					css={s.textInput}
					type="text"
					placeholder="게시글 내용을 입력하세요"
				/>
			</div>
		</div>
	);
}

export default PhotoUploadModalComponent;
