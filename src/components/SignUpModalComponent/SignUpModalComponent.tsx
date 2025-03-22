/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";

function SignUpModalComponent({
	isOpen,
	onClose,
	onLoginOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onLoginOpen: () => void;
}) {
	if (!isOpen) return null;
	return (
		<div css={s.overlay} onClick={onClose}>
			<div css={s.modal} onClick={(e) => e.stopPropagation()}>
				<button css={s.closeBtn} onClick={onClose}>
					×
				</button>
				<h2>회원가입</h2>
				<p>Way-Post에 오신 것을 환영합니다</p>

				<input css={s.input} type="text" placeholder="이름" />
				<input css={s.input} type="email" placeholder="이메일" />

				<div css={s.inputBox}>
					<input type="password" placeholder="비밀번호" />
					<input type="password" placeholder="비밀번호 확인" />
				</div>

				<button css={s.submitBtn}>회원가입</button>

				<p css={s.switchText}>
					이미 계정이 있으신가요?{" "}
					<span
						onClick={() => {
							onClose();
							onLoginOpen();
						}}
					>
						로그인
					</span>
				</p>
			</div>
		</div>
	);
}

export default SignUpModalComponent;
