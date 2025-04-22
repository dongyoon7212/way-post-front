import { instance } from "../utils/instance";

export const editProfileImg = async (data) => {
	try {
		const response = instance.post("/account/edit/profileimg", data);
		return response;
	} catch (error) {
		return error;
	}
};
