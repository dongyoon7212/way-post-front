/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { getPhotoPostList } from "../../apis/apis/postApi";
import { PhotoPost } from "../../types";

const containerStyle = { width: "100vw", height: "100vh" };

interface GoogleMapProps {
	markerPosition: { lat: number; lng: number } | null;
	upLoadModalOpen: boolean;
	setIsPhotoPostModalOpen: () => void;
	setPostGroup: (posts: PhotoPost[]) => void;
}

const imageIconCache: Record<string, google.maps.Icon> = {};

export default function GoogleMapComponent({
	markerPosition,
	upLoadModalOpen,
	setIsPhotoPostModalOpen,
	setPostGroup,
}: GoogleMapProps) {
	const GOOGLE_LIBRARIES: ("places" | "marker")[] = ["places"];
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showOverlay, setShowOverlay] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			const timeout = setTimeout(() => setShowOverlay(false), 300);
			return () => clearTimeout(timeout);
		} else {
			setShowOverlay(true);
		}
	}, [isLoading]);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		libraries: GOOGLE_LIBRARIES,
	});

	const [currentLocation, setCurrentLocation] = useState({
		lat: 37.5665,
		lng: 126.978,
	});
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const clustererRef = useRef<MarkerClusterer | null>(null);

	const drawRoundedImageWithBorder = (
		ctx: CanvasRenderingContext2D,
		img: HTMLImageElement,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		borderColor = "#ffffff",
		borderWidth = 3
	) => {
		ctx.clearRect(0, 0, width, height);
		ctx.save();
		ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
		ctx.shadowBlur = 6;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 2;

		// 중심 crop 비율 유지
		const imgRatio = img.width / img.height;
		const targetRatio = width / height;
		let sx = 0,
			sy = 0,
			sWidth = img.width,
			sHeight = img.height;
		if (imgRatio > targetRatio) {
			sWidth = img.height * targetRatio;
			sx = (img.width - sWidth) / 2;
		} else {
			sHeight = img.width / targetRatio;
			sy = (img.height - sHeight) / 2;
		}

		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(
			x + width,
			y + height,
			x + width - radius,
			y + height
		);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
		ctx.restore();

		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(
			x + width,
			y + height,
			x + width - radius,
			y + height
		);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		ctx.lineWidth = borderWidth;
		ctx.strokeStyle = borderColor;
		ctx.stroke();
	};

	const createOverlayImageIcon = async (
		imgUrl: string,
		count: number
	): Promise<google.maps.Icon> => {
		const cacheKey = `${imgUrl}_count_${count}`;
		if (imageIconCache[cacheKey]) return imageIconCache[cacheKey];

		const size = 60;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d")!;

		return new Promise((resolve) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = imgUrl;
			img.onload = () => {
				drawRoundedImageWithBorder(ctx, img, 0, 0, size, size, 10);
				if (count > 1) {
					ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
					ctx.fillRect(0, 0, size, size);
					ctx.font = "bold 18px sans-serif";
					ctx.fillStyle = "white";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(`+${count}`, size / 2, size / 2);
				}
				const icon: google.maps.Icon = {
					url: canvas.toDataURL(),
					scaledSize: new google.maps.Size(size, size),
					anchor: new google.maps.Point(size / 2, size / 2),
				};
				imageIconCache[cacheKey] = icon;
				resolve(icon);
			};
		});
	};

	const createRoundedImageIcon = async (
		imgUrl: string
	): Promise<google.maps.Icon> => {
		if (imageIconCache[imgUrl]) return imageIconCache[imgUrl];

		const displaySize = 60; // 실제 마커 표시 크기
		const scale = 2; // Retina 대응 스케일
		const canvasSize = displaySize * scale;

		const canvas = document.createElement("canvas");
		canvas.width = canvasSize;
		canvas.height = canvasSize;
		const ctx = canvas.getContext("2d")!;

		return new Promise((resolve) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = imgUrl;
			img.onload = () => {
				if (typeof google === "undefined") return;

				// 중심 crop 로직
				const ratio = img.width / img.height;
				let sx = 0,
					sy = 0,
					sWidth = img.width,
					sHeight = img.height;
				if (ratio > 1) {
					sx = (img.width - img.height) / 2;
					sWidth = sHeight = img.height;
				} else if (ratio < 1) {
					sy = (img.height - img.width) / 2;
					sHeight = sWidth = img.width;
				}

				// 고해상도 캔버스 기준 drawImage
				ctx.drawImage(
					img,
					sx,
					sy,
					sWidth,
					sHeight,
					0,
					0,
					canvasSize,
					canvasSize
				);

				drawRoundedImageWithBorder(
					ctx,
					img,
					0,
					0,
					canvasSize,
					canvasSize,
					10 * scale, // radius도 배율에 맞게
					"#ffffff",
					3 * scale // border도 배율에 맞게
				);
				const icon: google.maps.Icon = {
					url: canvas.toDataURL(),
					scaledSize: new google.maps.Size(displaySize, displaySize), // 실제 보여질 크기
					anchor: new google.maps.Point(
						displaySize / 2,
						displaySize / 2
					),
				};

				imageIconCache[imgUrl] = icon;
				resolve(icon);
			};
		});
	};

	const onLoad = useCallback(
		(mapInstance: google.maps.Map) => {
			setMap(mapInstance);
			mapInstance.panTo(markerPosition || currentLocation);
		},
		[markerPosition, currentLocation]
	);

	const onIdle = useCallback(() => {
		setIsLoading(true);
		if (!map) return;
		const bounds = map.getBounds();
		if (!bounds) return;
		getPhotoPostList({
			minLat: bounds.getSouthWest().lat(),
			maxLat: bounds.getNorthEast().lat(),
			minLng: bounds.getSouthWest().lng(),
			maxLng: bounds.getNorthEast().lng(),
		})
			.then((res) => (res as any).data as PhotoPost[])
			.then(async (posts) => {
				clustererRef.current?.clearMarkers();
				const groupedByPosition: Record<string, PhotoPost[]> = {};
				posts.forEach((post) => {
					const key = `${post.latitude.toFixed(
						6
					)},${post.longitude.toFixed(6)}`;
					if (!groupedByPosition[key]) groupedByPosition[key] = [];
					groupedByPosition[key].push(post);
				});
				const markers: google.maps.Marker[] = [];
				for (const group of Object.values(groupedByPosition)) {
					const { latitude, longitude, imgUrl } = group[0];
					const position = { lat: latitude, lng: longitude };
					const icon =
						group.length > 1
							? await createOverlayImageIcon(imgUrl, group.length)
							: await createRoundedImageIcon(imgUrl);
					const marker = new google.maps.Marker({ position, icon });
					marker.addListener("click", () => {
						setIsPhotoPostModalOpen();
						setPostGroup(group);
					});
					markers.push(marker);
				}
				clustererRef.current = new MarkerClusterer({ map, markers });
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, [map]);

	useEffect(() => {
		if (map) {
			map.panTo(markerPosition || currentLocation);
			if (upLoadModalOpen) map.panBy(window.innerWidth * 0.175, 0);
		}
	}, [map, markerPosition, upLoadModalOpen, currentLocation]);

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

	if (!isLoaded) return null;

	return (
		<div style={{ position: "relative" }}>
			{showOverlay && (
				<div css={s.overlayStyle(isLoading)}>
					<div css={s.loadingBoxStyle}>
						📍 지도 데이터를 불러오는 중...
					</div>
				</div>
			)}
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={markerPosition || currentLocation}
				zoom={12}
				options={{ disableDefaultUI: true }}
				onLoad={onLoad}
				onIdle={onIdle}
			></GoogleMap>
		</div>
	);
}
