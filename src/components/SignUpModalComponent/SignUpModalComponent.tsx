/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import {
	emailDuplChkRequest,
	signupRequest,
	usernameDuplChkRequest,
} from "../../apis/apis/authApi";

function SignUpModalComponent({
	isOpen,
	onClose,
	onLoginOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onLoginOpen: () => void;
}) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [chkUsername, setChkUsername] = useState<boolean>(false);
	const [chkEmail, setChkEmail] = useState<boolean>(false);
	const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(
		null
	);

	if (!isOpen) return null;

	const filedInit = () => {
		setUsername("");
		setEmail("");
		setPassword("");
		setPasswordConfirm("");
		setChkEmail(false);
		setChkUsername(false);
		setIsEmailValid(null);
		setIsPasswordValid(null);
	};

	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
	const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setIsEmailValid(emailRegEx.test(value)); // 입력 즉시 정규식 확인
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setIsPasswordValid(passwordRegEx.test(value)); // 입력 즉시 정규식 확인
	};

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
		if (!chkUsername || !chkEmail) {
			alert("중복확인을 해주세요.");
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
				if (response.status === 200) {
					alert("회원가입 완료");
					filedInit();
					onClose();
					onLoginOpen();
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 400) {
				}
			});
	};

	const duplChkUsernameHandler = () => {
		if (!username) {
			alert("이름을 입력해 주세요.");
			return;
		}
		usernameDuplChkRequest(username)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					if (response.data === 0) {
						alert("사용가능한 이름입니다.");
						setChkUsername(true);
					} else {
						alert("이미 사용중인 이름입니다.");
						setChkUsername(false);
					}
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 400) {
				}
			});
	};

	const duplChkEmailHandler = () => {
		if (!email) {
			alert("이메일을 입력해 주세요.");
			return;
		}
		emailDuplChkRequest(email)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					if (response.data === 0) {
						alert("사용가능한 이메일입니다.");
						setChkEmail(true);
					} else {
						alert("이미 사용중인 이메일입니다.");
						setChkEmail(false);
					}
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 400) {
				}
			});
	};

	return (
		<div
			css={s.overlay}
			onClick={() => {
				filedInit();
				onClose();
			}}
		>
			<div css={s.modal} onClick={(e) => e.stopPropagation()}>
				<button
					css={s.closeBtn}
					onClick={() => {
						filedInit();
						onClose();
					}}
				>
					×
				</button>
				<h2>회원가입</h2>
				<p>Way-Post에 오신 것을 환영합니다</p>
				<div css={s.inputWrapper}>
					<input
						css={s.chkInput}
						type="text"
						placeholder="이름"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setChkUsername(false);
						}}
					/>
					<button css={s.checkBtn} onClick={duplChkUsernameHandler}>
						중복 확인
					</button>
				</div>
				<div css={s.inputWrapper}>
					<input
						css={s.chkInput}
						type="email"
						placeholder="이메일"
						value={email}
						onChange={handleEmailChange}
					/>
					<button css={s.checkBtn} onClick={duplChkEmailHandler}>
						중복 확인
					</button>
				</div>

				<div css={s.inputBox}>
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={handlePasswordChange}
					/>
					<input
						type="password"
						placeholder="비밀번호 확인"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>
				{isEmailValid === false && (
					<p style={{ color: "red" }}>
						올바른 이메일 형식이 아닙니다.
					</p>
				)}
				{isPasswordValid === false && (
					<p style={{ color: "red" }}>
						비밀번호는 8~20자의 영문/숫자만 가능합니다.
					</p>
				)}
				<button css={s.submitBtn} onClick={submitHandler}>
					회원가입
				</button>

				<p css={s.switchText}>
					이미 계정이 있으신가요?{" "}
					<span
						onClick={() => {
							filedInit();
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
