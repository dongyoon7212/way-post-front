import { instance } from "../utils/instance";

export const photoPostUpload = async (data) => {
	try {
		const response = instance.post("/post/photo/upload", data);
		return response;
	} catch (error) {
		return error;
	}
};
