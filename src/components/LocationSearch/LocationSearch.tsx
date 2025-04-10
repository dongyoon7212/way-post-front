/** @jsxImportSource @emotion/react */
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react";
import { Autocomplete } from "@react-google-maps/api";
import * as s from "./style";

interface Location {
	lat: number;
	lng: number;
	address: string;
}

interface LocationSearchProps {
	onLocationSelected: (location: Location) => void;
}

export interface LocationSearchRef {
	reset: () => void;
}

const LocationSearch = forwardRef<LocationSearchRef, LocationSearchProps>(
	({ onLocationSelected }, ref) => {
		const [autocomplete, setAutocomplete] =
			useState<google.maps.places.Autocomplete | null>(null);
		// 내부 input 요소를 조작하기 위한 ref 생성
		const inputRef = useRef<HTMLInputElement>(null);

		const onLoad = (auto: google.maps.places.Autocomplete) => {
			setAutocomplete(auto);
		};

		const onPlaceChanged = () => {
			if (autocomplete) {
				const place = autocomplete.getPlace();
				console.log(place);
				if (place.geometry && place.geometry.location) {
					const location: Location = {
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
						address: place.formatted_address || "",
					};
					onLocationSelected(location);
				} else {
					console.error("선택한 장소에 위치 정보가 없습니다.");
				}
			} else {
				console.error("Autocomplete가 아직 로드되지 않았습니다.");
			}
		};

		// 부모에서 사용할 reset() 메서드 제공
		useImperativeHandle(ref, () => ({
			reset: () => {
				if (inputRef.current) {
					inputRef.current.value = "";
				}
			},
		}));

		return (
			<Autocomplete
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
				options={{
					fields: ["formatted_address", "geometry", "name"],
				}}
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="장소를 검색해 주세요"
					css={s.input}
				/>
			</Autocomplete>
		);
	}
);

export default LocationSearch;
