/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { SiNaver } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

import React from "react";

function LoginModalComponent({
	isOpen,
	onClose,
	onSignUpOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSignUpOpen: () => void;
}) {
	if (!isOpen) return null;
	return (
		<div css={s.overlay} onClick={onClose}>
			<div css={s.modal} onClick={(e) => e.stopPropagation()}>
				<button css={s.closeBtn} onClick={onClose}>
					✕
				</button>
				<h2>로그인</h2>
				<p>Way-Post에 오신 것을 환영합니다</p>
				<div css={s.inputBox}>
					<input type="text" placeholder="이메일" />
					<input type="password" placeholder="비밀번호" />
				</div>
				<div css={s.buttonGroup}>
					<button>계속</button>
					<div css={s.divider}>
						<span>또는</span>
					</div>
					<button css={s.loginButton}>
						<SiNaver style={{ color: "rgb(3, 199, 91)" }} />
						<span>네이버로 로그인하기</span>
					</button>
					<button css={s.loginButton}>
						<SiKakaotalk
							style={{
								color: "rgb(255, 232, 16)",
								backgroundColor: "rgb(58, 29, 29)",
							}}
						/>
						<span>카카오로 로그인하기</span>
					</button>
					<button css={s.loginButton}>
						<FcGoogle />
						<span>구글로 로그인하기</span>
					</button>
					<button css={s.loginButton} onClick={onSignUpOpen}>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginModalComponent;
