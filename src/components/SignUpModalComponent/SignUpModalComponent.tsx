/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { signupRequest } from "../../apis/apis/authApi";

function SignUpModalComponent({
	isOpen,
	onClose,
	onLoginOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onLoginOpen: () => void;
}) {
	const [email, setEamil] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [username, setUsername] = useState<string>("");

	if (!isOpen) return null;

	const submitHandler = () => {
		// 유효성 검사
		if (password !== passwordConfirm) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}
		if (!email || !password || !username) {
			alert("모든 필드를 채워주세요.");
			return;
		}

		signupRequest({
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			username: username,
		})
			.then((response) => {
				console.log(response);
				if (response.status === 201) {
					alert("회원가입 완료");
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 400) {
				}
			});
	};

	return (
		<div css={s.overlay} onClick={onClose}>
			<div css={s.modal} onClick={(e) => e.stopPropagation()}>
				<button css={s.closeBtn} onClick={onClose}>
					×
				</button>
				<h2>회원가입</h2>
				<p>Way-Post에 오신 것을 환영합니다</p>

				<input
					css={s.input}
					type="text"
					placeholder="이름"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					css={s.input}
					type="email"
					placeholder="이메일"
					value={email}
					onChange={(e) => setEamil(e.target.value)}
				/>

				<div css={s.inputBox}>
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="비밀번호 확인"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>

				<button css={s.submitBtn} onClick={submitHandler}>
					회원가입
				</button>

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
