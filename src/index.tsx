import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient(); // queryClient = 데이터가 저장되는 캐싱 공간

root.render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<BrowserRouter>
				<Reset />
				<App />
			</BrowserRouter>
		</RecoilRoot>
	</QueryClientProvider>
);
