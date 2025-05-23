/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/logo2.png";
import logo1 from "../../assets/logo1.png";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { principalData } from "../../types";
import { deactivateAccountRequest } from "../../apis/apis/authApi";
import { instance } from "../../apis/utils/instance";

function DeactivateAccountPage() {
	const navigate = useNavigate();
	const [password, setPassword] = useState<string>("");
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData<principalData>([
		"getPrincipal",
	]);

	const handleDeactivateClick = () => {
		if (window.confirm("정말로 계정을 비활성화 하시겠습니까?")) {
			if (!password) {
				alert("비밀번호를 입력해주세요.");
				return;
			}
			deactivateAccountRequest({
				email: principalData?.data.user.email,
				password: password,
			})
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						alert("계정이 비활성화 되었습니다.");
						localStorage.removeItem("accessToken");
						instance.interceptors.request.use((config) => {
							config.headers.Authorization = null;
							return config;
						});
						queryClient.refetchQueries({
							queryKey: ["getPrincipal"],
						});
						window.location.href = "/";
					}
				})
				.catch((error) => {
					console.log(error);
					if (error.status !== 200) {
						alert("사용자 정보가 알맞지 않습니다.");
						setPassword("");
					}
				});
		} else {
			return;
		}
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
					<div css={s.mainBox}>
						<div css={s.titleBox}>
							<img src={logo1} alt="logo" />
							<h1>계정 탈퇴</h1>
							<p>
								해당 계정은 탈퇴 전 <span>비활성화 상태</span>로
								전환됩니다.
								<br />
								30일이 지나면 계정 탈퇴가 완전히 이루어집니다.
							</p>
						</div>
						<input
							type="password"
							placeholder="비밀번호를 입력하세요"
							css={s.passwordInput}
							// onKeyDown={(e) => {
							// 	if (e.key === "Enter") {
							// 		navigate("/");
							// 	}
							// }}
							onChange={handlePasswordChange}
							value={password}
						/>
						<div css={s.buttonBox}>
							<button
								css={s.deactivateButton}
								onClick={handleDeactivateClick}
							>
								비활성화
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default DeactivateAccountPage;
