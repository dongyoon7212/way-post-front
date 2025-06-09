import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import NewPostPage from "../pages/NewPost/NewPostPage";
import PostPage from "../pages/Post/PostPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import HotPostPage from "../pages/HotPost/HotPostPage";
import RecentPostPage from "../pages/RecentPost/RecentPostPage";
import DeactivateAccountPage from "../pages/DeactivateAccount/DeactivateAccountPage";
import ActivateAccountPage from "../pages/ActivateAccount/ActivateAccountPage";
import MailCertificationPage from "../pages/MailCertification/MailCertificationPage";
import OAuth2Page from "../pages/OAuth2/OAuth2Page";
import OAuth2MergePage from "../pages/OAuth2Merge/OAuth2MergePage";
import OAuth2SigninRedirectPage from "../pages/OAuth2SigninRedirect/OAuth2SigninRedirectPage";
import OAuth2SignupPage from "../pages/OAuth2Signup/OAuth2SignupPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import NewPasswordPage from "../pages/NewPassword/NewPasswordPage";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage";

function MainRoute() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/profile/:id" element={<ProfilePage />} />
				<Route path="/new-post" element={<NewPostPage />} />
				<Route path="/post/:id" element={<PostPage />} />
				<Route path="/hot-post" element={<HotPostPage />} />
				<Route path="/recent-post" element={<RecentPostPage />} />
				<Route
					path="/deactivate-account"
					element={<DeactivateAccountPage />}
				/>
				<Route
					path="/activate-account"
					element={<ActivateAccountPage />}
				/>
				<Route
					path="/mail-certification"
					element={<MailCertificationPage />}
				/>
				<Route path="/auth/oauth2" element={<OAuth2Page />} />
				<Route
					path="/auth/oauth2/merge"
					element={<OAuth2MergePage />}
				/>
				<Route
					path="/auth/oauth2/signin"
					element={<OAuth2SigninRedirectPage />}
				/>
				<Route
					path="/auth/oauth2/signup"
					element={<OAuth2SignupPage />}
				/>
				<Route
					path="/auth/forgot-password"
					element={<ForgotPasswordPage />}
				/>
				<Route
					path="/auth/new-password"
					element={<NewPasswordPage />}
				/>
				<Route
					path="/auth/change-password"
					element={<ChangePasswordPage />}
				/>
			</Routes>
		</>
	);
}

export default MainRoute;
