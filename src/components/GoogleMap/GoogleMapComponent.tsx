import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
	width: "100vw",
	height: "100vh",
};

function GoogleMapComponent() {
	const [currentLocation, setCurrentLocation] = useState({
		lat: 37.5665,
		lng: 126.978,
	}); // 기본값: 서울

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCurrentLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					console.log(currentLocation);
				},
				(error) => console.error("위치 정보 오류:", error),
				{ enableHighAccuracy: true }
			);
		}
	}, []);

	return (
		<LoadScript
			googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentLocation}
				zoom={14}
				options={{ disableDefaultUI: true }}
			>
				{/* 현재 위치 마커 */}
				<Marker position={currentLocation} />
			</GoogleMap>
		</LoadScript>
	);
}

export default GoogleMapComponent;
