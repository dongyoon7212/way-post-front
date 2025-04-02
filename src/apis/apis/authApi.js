import { instance } from "../utils/instance";

export const getPrincipal = async () => {
	try {
		const response = instance.get("/auth/principal");
		return response;
	} catch (error) {
		return error;
	}
};

export const signupRequest = async (data) => {
	try {
		const response = instance.post("/auth/signup", data);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const usernameDuplChkRequest = async (username) => {
	try {
		const response = instance.get(
			`/auth/duplChk/username?username=${username}`
		);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const emailDuplChkRequest = async (email) => {
	try {
		const response = instance.get(`/auth/duplChk/email?email=${email}`);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const signinRequest = async (data) => {
	try {
		const response = instance.post("/auth/signin", data);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
