import { instance } from "../utils/instance";

export const uploadPhotoPost = async (data) => {
	try {
		const response = instance.post("/post/photo/upload", data);
		return response;
	} catch (error) {
		return error;
	}
};

export const getPhotoPostList = async (params) => {
	try {
		const response = instance.get("/post/photo/getlist", { params });
		return response;
	} catch (error) {
		return error;
	}
};
