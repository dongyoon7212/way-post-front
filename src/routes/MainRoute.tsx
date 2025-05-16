import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import NewPostPage from "../pages/NewPost/NewPostPage";
import PostPage from "../pages/Post/PostPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import HotPostPage from "../pages/HotPost/HotPostPage";

function MainRoute() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/profile/:id" element={<ProfilePage />} />
				<Route path="/new-post" element={<NewPostPage />} />
				<Route path="/post/:id" element={<PostPage />} />
				<Route path="/hot-post" element={<HotPostPage />} />
			</Routes>
		</>
	);
}

export default MainRoute;
