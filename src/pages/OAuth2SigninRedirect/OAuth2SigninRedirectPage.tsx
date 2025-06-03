import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth2SigninRedirectPage() {
	const [searchParams] = useSearchParams();
	const accessToken = searchParams.get("accessToken");
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			localStorage.setItem("accessToken", accessToken);

			// 사용자 정보 요청해서 전역 상태 갱신도 가능 (예: Recoil, Context 등)

			window.location.href = "/"; // 로그인 성공 후 메인으로
		} else {
			alert("로그인 중 문제가 발생했습니다.");
			navigate("/");
		}
	}, [accessToken, navigate]);

	return <div>로그인 중입니다...</div>;
}

export default OAuth2SigninRedirectPage;
