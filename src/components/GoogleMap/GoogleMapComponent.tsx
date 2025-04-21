/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { PhotoPost } from "../../types";
import { getPhotoPostList } from "../../apis/apis/postApi";

const containerStyle = { width: "100vw", height: "100vh" };
const CLUSTER_MAX_ZOOM = 15;
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
	const manualMarkersRef = useRef<google.maps.Marker[]>([]);

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
					map?.panTo(loc);
				},
				console.error,
				{ enableHighAccuracy: true }
			);
		}
	}, [markerPosition, map]);

	const onLoad = useCallback(
		(mapInstance: google.maps.Map) => {
			setMap(mapInstance);
			mapInstance.panTo(markerPosition || currentLocation);
		},
		[markerPosition, currentLocation]
	);

	const onIdle = useCallback(() => {
		if (!map) return;
		const zoom = map.getZoom()!;
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
				// 이전 클러스터 및 수동 마커 제거
				clustererRef.current?.clearMarkers();
				manualMarkersRef.current.forEach((m) => m.setMap(null));
				manualMarkersRef.current = [];

				if (zoom <= CLUSTER_MAX_ZOOM) {
					// 기본 클러스터링 모드: 모든 마커를 clusterer에 전달
					const markers = posts.map((p) => {
						const m = new google.maps.Marker({
							position: { lat: p.latitude, lng: p.longitude },
							icon: {
								url: p.imgUrl,
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
						return m;
					});
					clustererRef.current = new MarkerClusterer({
						map,
						markers,
					});
				} else {
					// 확대된 상태: 모든 그룹별 마커 직접 표시, 동일 좌표 그룹은 label 처리
					const groups = new Map<string, PhotoPost[]>();
					posts.forEach((p) => {
						const key = `${p.latitude},${p.longitude}`;
						const arr = groups.get(key) || [];
						arr.push(p);
						groups.set(key, arr);
					});

					const manualMarkers: google.maps.Marker[] = [];
					groups.forEach((group, key) => {
						const [latStr, lngStr] = key.split(",");
						const pos = {
							lat: parseFloat(latStr),
							lng: parseFloat(lngStr),
						};

						const m = new google.maps.Marker({
							position: pos,
							map,
							icon: {
								url: group[0].imgUrl,
								scaledSize: new google.maps.Size(
									MARKER_SIZE,
									MARKER_SIZE
								),
								anchor: new google.maps.Point(
									MARKER_SIZE / 2,
									MARKER_SIZE / 2
								),
							},
							label:
								group.length > 1
									? {
											text: String(group.length),
											color: "#fff",
											fontSize: "12px",
											fontWeight: "bold",
									  }
									: undefined,
						});
						if (group.length > 1) {
							m.addListener("click", () => {
								console.log(
									"Clicked overlapping group:",
									group
								);
							});
						}
						manualMarkers.push(m);
					});
					manualMarkersRef.current = manualMarkers;
				}
			})
			.catch(console.error);
	}, [map]);

	// 모달 오픈 시 지도 패닝
	useEffect(() => {
		if (map) {
			map.panTo(markerPosition || currentLocation);
			if (upLoadModalOpen) map.panBy(window.innerWidth * 0.175, 0);
		}
	}, [map, markerPosition, upLoadModalOpen, currentLocation]);

	const center = markerPosition || currentLocation;
	if (!isLoaded) return null;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={12}
			options={{ disableDefaultUI: true }}
			onLoad={onLoad}
			onIdle={onIdle}
		>
			<Marker position={center} />
		</GoogleMap>
	);
}
