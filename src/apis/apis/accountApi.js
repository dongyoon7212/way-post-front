import { instance } from "../utils/instance";

export const editProfileImg = async (data) => {
	try {
		const response = instance.post("/account/edit/profileimg", data);
		return response;
	} catch (error) {
		return error;
	}
};

export const getUserById = async (data) => {
	try {
		const response = instance.get(`/account/get/user?userId=${data}`);
		return response;
	} catch (error) {
		return error;
	}
};

export const editIntroduce = async (data) => {
	try {
		const response = instance.post("/account/edit/introduce", data);
		return response;
	} catch (error) {
		return error;
	}
};
