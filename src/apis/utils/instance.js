import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

export const instance = axios.create({
	baseURL: getServerAddress(),
	// headers: {
	// 	Authorization: "Bearer " + localStorage.getItem("AccessToken"),
	// },
});
