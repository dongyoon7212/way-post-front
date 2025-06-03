import { instance } from "../utils/instance";

export const oauth2MergeRequest = async (data) => {
	try {
		const response = instance.post("/auth/oauth/merge", data);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const oauth2SignupRequest = async (data) => {};
