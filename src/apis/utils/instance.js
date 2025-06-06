import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

export const instance = axios.create({
	baseURL: getServerAddress(),
});
// 인터셉터로 Authorization 헤더를 동적으로 설정
instance.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	const tempToken = localStorage.getItem("tempToken");

	const tokenToUse = accessToken || tempToken;

	if (tokenToUse) {
		config.headers["Authorization"] = `Bearer ${tokenToUse}`;
	} else {
		delete config.headers["Authorization"];
	}

	return config;
});
