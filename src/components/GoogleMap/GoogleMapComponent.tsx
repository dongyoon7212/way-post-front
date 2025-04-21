/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	OverlayView,
	useJsApiLoader,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { PhotoPost } from "../../types";
import { getPhotoPostList } from "../../apis/apis/postApi";
import { css } from "@emotion/react";

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
	const [overlayPosts, setOverlayPosts] = useState<PhotoPost[]>([]);
	const clustererRef = useRef<MarkerClusterer | null>(null);

	// 초기 위치 요청
	useEffect(() => {
		if (!markerPosition && navigator.geolocation && map) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const loc = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};
					setCurrentLocation(loc);
					map.panTo(loc);
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
		const bounds = map.getBounds();
		if (!bounds) return;
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
				// 1) 초기화
				clustererRef.current?.clearMarkers();
				setOverlayPosts([]);

				// 2) 좌표별 그룹핑
				const groups = new Map<string, PhotoPost[]>();
				posts.forEach((p) => {
					const key = `${p.latitude},${p.longitude}`;
					if (!groups.has(key)) groups.set(key, []);
					groups.get(key)!.push(p);
				});

				if (0) {
					// — 클러스터 모드: 모든 포스트 묶기
					const markers = posts.map((p) => {
						return new google.maps.Marker({
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
					});
					clustererRef.current = new MarkerClusterer({
						map,
						markers,
					});
				} else {
					// — 커스텀 오버레이 모드 —
					const overlapPosts: PhotoPost[] = [];
					const singlePosts: PhotoPost[] = [];

					groups.forEach((group) => {
						if (group.length > 1) {
							overlapPosts.push(...group);
						} else {
							singlePosts.push(group[0]);
						}
					});

					// 3) 겹친 포스트만 클러스터 (gridSize=1)
					const overlapMarkers = overlapPosts.map((p) => {
						return new google.maps.Marker({
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
					});
					clustererRef.current = new MarkerClusterer({
						map,
						markers: overlapMarkers,
						gridSize: 1,
					});

					// 4) 개별(single) 포스트는 OverlayView 로 커스텀
					setOverlayPosts(singlePosts);
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

	if (!isLoaded) return null;
	const center = markerPosition || currentLocation;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={12}
			options={{ disableDefaultUI: true }}
			onLoad={onLoad}
			onIdle={onIdle}
		>
			{/* 현재 위치 마커 */}
			<Marker position={center} />

			{/* 커스텀 OverlayView 마커 */}
			{overlayPosts.map((p) => (
				<OverlayView
					key={p.photoPostId}
					position={{ lat: p.latitude, lng: p.longitude }}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
				>
					<div
						css={css`
							width: ${MARKER_SIZE}px;
							height: ${MARKER_SIZE}px;
							border: 2px solid white;
							border-radius: 8px;
							overflow: hidden;
							box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
						`}
						onClick={() => console.log("Clicked post:", p)}
					>
						<img
							src={p.imgUrl}
							css={css`
								width: 100%;
								height: 100%;
								object-fit: cover;
							`}
							alt="post thumbnail"
						/>
					</div>
				</OverlayView>
			))}
		</GoogleMap>
	);
}
