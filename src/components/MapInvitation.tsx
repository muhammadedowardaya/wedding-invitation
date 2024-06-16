'use client';

import { useMemo, useState } from "react";
// for maps
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '@/styles/customIconMap.css';
import Image from "next/image";

export default function MapInvitation({
    targetLocation
}: {
    targetLocation: [number, number]
}) {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const handleGetRoute = () => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
                const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${targetLocation[0]},${targetLocation[1]}&travelmode=driving`;
                window.open(url, '_blank');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Menggunakan useMemo untuk membuat icon hanya sekali
    const customIcon = useMemo(() => {
        return L.divIcon({
            className: 'custom-marker-wrapper',
            html: `
                <div class="custom-marker">
                    <div class="marker-image" style="background-image: url('/assets/my-photo.jpg');"></div>
                </div>
                <div class="marker-tip"></div>
            `,
            iconSize: [50, 70], // ukuran keseluruhan icon (termasuk tanda mengerucut)
            iconAnchor: [25, 70], // titik anchor icon (tengah bawah)
            popupAnchor: [0, -70], // titik anchor popup (di atas icon)
        });
    }, []);

    return (
        <section className="h-[190px] xs:h-[300px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] relative">
            <MapContainer
                center={targetLocation}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full"
                doubleClickZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={targetLocation} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="text-xxs xs:text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl relative left-[50%] translate-x-[-50%] bottom-16 xs:bottom-24 md:bottom-40 bg-white rounded-md w-max flex items-center justify-center gap-x-2 z-[444] border-b border-slate-400 pr-2 xs:pr-4">
                <button onClick={handleGetRoute} className="flex items-center gap-x-1 xs:gap-x-4">
                    <div className="relative w-5 h-5 xs:w-10 xs:h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 h:w-24 xl:w-28 xl:h-28">
                        <Image src="/assets/google-maps.svg" alt="maps icon" fill sizes="100%" />
                    </div>
                    Buka Google Maps
                </button>
            </div>
        </section>
    );
}
