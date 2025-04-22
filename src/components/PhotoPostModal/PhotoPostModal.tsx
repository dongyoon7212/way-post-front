/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";
import { PhotoPost } from "../../types";

interface Props {
	isOpen: boolean;
	postGroup: PhotoPost[];
}

function PhotoPostModal({ isOpen }: Props) {
	return <div css={s.modalWrapper(isOpen)}></div>;
}

export default PhotoPostModal;
