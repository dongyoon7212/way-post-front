/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { LuAlignJustify } from "react-icons/lu";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import SideBarComponent from "../../components/SideBar/SideBarComponent";

function MainPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div css={s.layout}>
			<SideBarComponent
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
			<GoogleMapComponent />
			<button css={s.sidebarBtn} onClick={() => setIsSidebarOpen(true)}>
				<LuAlignJustify />
			</button>
		</div>
	);
}

export default MainPage;
