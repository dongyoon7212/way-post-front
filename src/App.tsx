import React from "react";
import MainRoute from "./routes/MainRoute";
import { useQuery } from "@tanstack/react-query";
import { getPrincipal } from "./apis/apis/authApi";

function App() {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["getPrincipal"],
		queryFn: getPrincipal,
		retry: 1,
	});

	return (
		<div>
			<MainRoute />
		</div>
	);
}

export default App;
