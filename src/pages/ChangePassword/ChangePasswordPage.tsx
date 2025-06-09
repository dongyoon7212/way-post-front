/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePasswordRequest } from "../../apis/apis/accountApi";
import { instance } from "../../apis/utils/instance";
import { useQueryClient } from "@tanstack/react-query";

function ChangePasswordPage() {
	const [password, setPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
	const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(
		true
	);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
	};

	const handleNewPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		setNewPassword(value);
		setIsPasswordValid(passwordRegEx.test(value)); // 입력 즉시 정규식 확인
	};

	const handlePasswordConfirmChange = () => {
		if (
			newPassword === "" ||
			newPasswordConfirm === "" ||
			password === ""
		) {
			alert(
				"기존 비밀번호와 새로운 비밀번호, 비밀번호 확인을 모두 입력해 주세요."
			);
			return;
		}
		if (newPassword !== newPasswordConfirm) {
			alert("새로운 비밀번호가 일치하지 않습니다.");
			return;
		}
		if (!isPasswordValid) {
			alert(
				"비밀번호는 영문 소문자, 영문 대문자, 특수문자를 각각 최소 1자 이상 포함하여 8자 이상 20자 이하만 가능합니다."
			);
			return;
		}

		changePasswordRequest({
			password: password,
			newPassword: newPassword,
		})
			.then((response: any) => {
				if (response.status === 200) {
					alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
					localStorage.removeItem("accessToken");
					instance.interceptors.request.use((config) => {
						config.headers.Authorization = null;
						return config;
					});
					queryClient.refetchQueries({ queryKey: ["getPrincipal"] });
					window.location.href = "/";
				}
			})
			.catch((error) => {
				if (error.response && error.response.status === 400) {
					alert("비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
				} else {
					alert(
						"비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요."
					);
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
					<h1>새로운 비밀번호</h1>
					<p>
						새 비밀번호를 설정해 주세요.
						<br />
						<br />
						이전에 사용한 비밀번호와 동일하지 않도록 설정해 주세요.
						<br />
						안전한 비밀번호는 영문 소문자, 영문 대문자, 특수문자를
						각각 최소 1자 이상 포함하여 8자 이상 20자 이하로
						구성하는 것이 좋습니다.
					</p>
					<div css={s.inputBox}>
						<input
							type="password"
							placeholder="기존 비밀번호"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<div css={s.inputBox}>
						<input
							type="password"
							placeholder="새로운 비밀번호"
							value={newPassword}
							onChange={handleNewPasswordChange}
						/>
						<input
							type="password"
							placeholder="새로운 비밀번호 확인"
							value={newPasswordConfirm}
							onChange={(e) =>
								setNewPasswordConfirm(e.target.value)
							}
						/>
					</div>
					<p
						style={{
							marginTop: "20px",
							color: "red",
							opacity: isPasswordValid === false ? 1 : 0,
							transition: "opacity 0.3s ease",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						비밀번호는 영문 소문자, 영문 대문자, 특수문자를 각각
						<br />
						최소 1자 이상 포함하여 8자 이상 20자 이하만 가능합니다.
					</p>
					<div css={s.buttonBox}>
						<button
							css={s.confirmButton}
							onClick={handlePasswordConfirmChange}
						>
							비밀번호 변경
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ChangePasswordPage;
