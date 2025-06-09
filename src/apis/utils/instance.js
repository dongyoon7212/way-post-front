import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

export const instance = axios.create({
	baseURL: getServerAddress(),
	headers: {
		Authorization: !!localStorage.getItem("accessToken")
			? "Bearer " + localStorage.getItem("accessToken")
			: !!localStorage.getItem("tempToken")
			? "Bearer " + localStorage.getItem("tempToken")
			: "",
	},
});
