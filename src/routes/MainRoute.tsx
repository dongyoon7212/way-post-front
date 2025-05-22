import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import NewPostPage from "../pages/NewPost/NewPostPage";
import PostPage from "../pages/Post/PostPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import HotPostPage from "../pages/HotPost/HotPostPage";
import RecentPostPage from "../pages/RecentPost/RecentPostPage";
import DeactivateAccountPage from "../pages/DeactivateAccount/DeactivateAccountPage";

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
			</Routes>
		</>
	);
}

export default MainRoute;
