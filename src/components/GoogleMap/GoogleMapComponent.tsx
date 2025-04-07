import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState, useCallback } from "react";

const containerStyle = {
	width: "100vw",
	height: "100vh",
};

interface GoogleMapProps {
	markerPosition: { lat: number; lng: number } | null;
}

function GoogleMapComponent({ markerPosition }: GoogleMapProps) {
	const [currentLocation, setCurrentLocation] = useState({
		lat: 37.5665,
		lng: 126.978,
	}); // 기본값: 서울
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback(
		(mapInstance: google.maps.Map) => {
			setMap(mapInstance);
			// 사진 메타데이터가 없을 경우에만 사용자의 현재 위치를 받아서 중심 설정
			if (!markerPosition && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(pos) => {
						const newLocation = {
							lat: pos.coords.latitude,
							lng: pos.coords.longitude,
						};
						setCurrentLocation(newLocation);
						mapInstance.panTo(newLocation);
					},
					(error) => console.error("위치 정보 오류:", error),
					{ enableHighAccuracy: true }
				);
			}
		},
		[markerPosition]
	);

	useEffect(() => {
		if (map && markerPosition) {
			// 먼저 사진 메타데이터의 위치로 이동
			map.panTo(markerPosition);
			// 모달이 화면 오른쪽 35%를 가린다면, 지도 중심을 왼쪽으로 이동해야 함.
			// 예를 들어, 화면 너비의 약 17.5% 정도(35%의 절반)를 왼쪽으로 이동시키는 오프셋
			map.panBy(+window.innerWidth * 0.175, 0);
		}
	}, [map, markerPosition]);

	const mapCenter = markerPosition || currentLocation;

	return (
		<LoadScript
			googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCenter}
				zoom={12}
				options={{ disableDefaultUI: true }}
				onLoad={onLoad}
			>
				{/* 현재 위치 마커 */}
				<Marker position={mapCenter} />
			</GoogleMap>
		</LoadScript>
	);
}

export default GoogleMapComponent;
