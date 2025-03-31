/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { SiNaver } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

import React, { useState } from "react";
import { signinRequest } from "../../apis/apis/authApi";

function LoginModalComponent({
	isOpen,
	onClose,
	onSignUpOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSignUpOpen: () => void;
}) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const filedInit = () => {
		setEmail("");
		setPassword("");
	};

	const signinHandler = () => {
		if (!email || !password) {
			alert("사용자 정보를 모두 입력해 주세요.");
			return;
		}

		signinRequest({
			email: email,
			password: password,
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					window.localStorage.setItem(
						"accessToken",
						response.data.accessToken
					);
					window.location.reload();
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.status !== 200) {
					alert("사용자 정보가 알맞지 않습니다.");
					filedInit();
				}
			});
	};

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
					<input
						type="text"
						placeholder="이메일"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<input
						type="password"
						placeholder="비밀번호"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<div css={s.buttonGroup}>
					<button onClick={signinHandler}>계속</button>
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
					<button
						css={s.loginButton}
						onClick={() => {
							onSignUpOpen();
							filedInit();
						}}
					>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginModalComponent;
