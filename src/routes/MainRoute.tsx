import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import NewPostPage from "../pages/NewPostPage";
import PostPage from "../pages/PostPage";

function MainRoute() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/new-post" element={<NewPostPage />} />
				<Route path="/post/:id" element={<PostPage />} />
			</Routes>
		</>
	);
}

export default MainRoute;
