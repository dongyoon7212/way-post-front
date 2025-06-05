/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useEffect, useState } from "react";
import {
	emailDuplChkRequest,
	signupRequest,
	usernameDuplChkRequest,
} from "../../apis/apis/authApi";
import { oauth2SignupRequest } from "../../apis/apis/oauth2Api";

function OAuth2SignupPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [chkUsername, setChkUsername] = useState<boolean>(false);
	const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(
		null
	);
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);
	const provider = params.get("provider");
	const providerUserId = params.get("providerUserId");
	const emailParams = params.get("email") || "";

	useEffect(() => {
		setEmail(emailParams);
	});

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

	const duplChkUsernameHandler = () => {
		if (!username) {
			alert("이름을 입력해 주세요.");
			return;
		}
		usernameDuplChkRequest(username)
			.then((response) => {
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
				if (error.response.status === 400) {
				}
			});
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
		if (!chkUsername) {
			alert("중복확인을 해주세요.");
			return;
		}

		oauth2SignupRequest({
			email: email,
			password: password,
			username: username,
			provider: provider || "",
			providerUserId: providerUserId || "",
		})
			.then((response) => {
				// if (response.status === 200) {
				// 	alert("회원가입 완료");
				// }
				if (response.data.code === 2000) {
					alert("회원가입이 완료되었습니다. 다시 로그인해주세요.");
					window.location.href = "/";
				} else if (response.data.code === 4002) {
					alert("이미 가입된 이메일입니다. 계정을 연동해주세요.");
					window.location.href = `/auth/oauth2?provider=${provider}&providerUserId=${providerUserId}&email=${email}`;
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
				}
			});
	};
	return (
		<div css={s.layout}>
			<header css={s.headerLayout}>
				<div css={s.headerBox}>
					<div
						css={s.logoBox}
						onClick={() => {
							navigate("/");
						}}
					>
						<img src={logo2} alt="logo" />
					</div>
				</div>
			</header>
			<main>
				<div css={s.mainLayout}>
					<h1>회원가입</h1>
					<p>
						연동된 이메일로 회원가입을 시작합니다. 이름과 비밀번호를
						입력하면 가입이 완료됩니다.
					</p>
					<div css={s.inputContainer}>
						<div css={s.inputWrapper}>
							<input
								css={s.chkInput}
								disabled={!!email}
								type="email"
								placeholder="이메일"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
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
							<button
								css={s.checkBtn}
								onClick={duplChkUsernameHandler}
							>
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
								onChange={(e) =>
									setPasswordConfirm(e.target.value)
								}
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
					</div>
				</div>
			</main>
		</div>
	);
}

export default OAuth2SignupPage;
