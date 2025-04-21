/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { PhotoPost } from "../../types";
import { getPhotoPostList } from "../../apis/apis/postApi";

const containerStyle = { width: "100vw", height: "100vh" };
const MARKER_SIZE = 50;

interface GoogleMapProps {
	markerPosition: { lat: number; lng: number } | null;
	upLoadModalOpen: boolean;
}

export default function GoogleMapComponent({
	markerPosition,
	upLoadModalOpen,
}: GoogleMapProps) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		libraries: ["places"],
	});

	const [currentLocation, setCurrentLocation] = useState({
		lat: 37.5665,
		lng: 126.978,
	});
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const clustererRef = useRef<MarkerClusterer | null>(null);

	// 초기 위치 요청
	useEffect(() => {
		if (!markerPosition && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const loc = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};
					setCurrentLocation(loc);
				},
				console.error,
				{ enableHighAccuracy: true }
			);
		}
	}, [markerPosition]);

	const onLoad = useCallback(
		(mapInstance: google.maps.Map) => {
			setMap(mapInstance);
			// 초기 센터 이동
			mapInstance.panTo(markerPosition || currentLocation);
		},
		[markerPosition, currentLocation]
	);

	const onIdle = useCallback(() => {
		if (!map) return;

		const bounds = map.getBounds()!;
		const ne = bounds.getNorthEast();
		const sw = bounds.getSouthWest();

		getPhotoPostList({
			minLat: sw.lat(),
			maxLat: ne.lat(),
			minLng: sw.lng(),
			maxLng: ne.lng(),
		})
			.then((res) => (res as any).data as PhotoPost[])
			.then((posts) => {
				// 기존 마커/클러스터 제거
				clustererRef.current?.clearMarkers();

				// photo icon 마커 생성
				const markers = posts.map((p) => {
					const iconUrl = p.imgUrl; // 필요시 커스텀 SVG 또는 크기 조정
					return new google.maps.Marker({
						position: { lat: p.latitude, lng: p.longitude },
						icon: {
							url: iconUrl,
							scaledSize: new google.maps.Size(
								MARKER_SIZE,
								MARKER_SIZE
							),
							anchor: new google.maps.Point(
								MARKER_SIZE / 2,
								MARKER_SIZE / 2
							),
						},
					});
				});

				// 기본 MarkerClusterer 사용
				clustererRef.current = new MarkerClusterer({
					map,
					markers,
				});
			})
			.catch(console.error);
	}, [map]);

	// 지도 중심 및 모달 오픈 상태에 따른 오프셋
	useEffect(() => {
		if (map) {
			map.panTo(markerPosition || currentLocation);
			if (upLoadModalOpen) {
				map.panBy(window.innerWidth * 0.175, 0);
			}
		}
	}, [map, markerPosition, upLoadModalOpen, currentLocation]);

	if (!isLoaded) return null;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={markerPosition || currentLocation}
			zoom={12}
			options={{ disableDefaultUI: true }}
			onLoad={onLoad}
			onIdle={onIdle}
		>
			{/* 현재 위치 마커 */}
			<Marker position={markerPosition || currentLocation} />
		</GoogleMap>
	);
}
