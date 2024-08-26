'use client';

import Map, { Marker } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
    propertyItem: Property
}

export default function PropertyMap({ propertyItem }: Props) {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 10,
        width: '100%',
        height: '500px'
    });

    const [loading, setLoading] = useState(true);
    const [geoCodeError, setGeoCodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: 'en',
        region: 'us',
        outputFormat: 'json' as OutputFormat
    });

    console.log('Geo coder triggered');
    /*const fetchCoords = async () => {
        try {
            const response = await fromAddress(`${propertyItem.location.street} ${propertyItem.location.city} ${propertyItem.location.state} ${propertyItem.location.zipcode}`);
            console.log('response', response);

            //Check geocode results
            if (response.results.length === 0) {
                return;
            }
            const { lat, lng } = response.results[0].geometry.location;
            console.log('lat', lat);
            console.log('lng', lng);

        } catch (error) {
            console.error('Error fetching coordinates', error);
        }
    };

    fetchCoords();*/
    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const response = await fromAddress(`${propertyItem.location.street} ${propertyItem.location.city} ${propertyItem.location.state} ${propertyItem.location.zipcode}`);
                console.log('response', response.results.length);

                //Check geocode results
                if (response.results.length === 0) {
                    setGeoCodeError(true);
                    return;
                }
                const { lat, lng } = response.results[0].geometry.location;
                console.log('lat', lat);
                console.log('lng', lng);
                setLat(lat);
                setLon(lng);

            } catch (error) {
                console.error('Error fetching coordinates', error);
                setGeoCodeError(true);
            }
            finally {
                setLoading(false);
            }
        };

        fetchCoords();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (geoCodeError) {
        return (
            <div className='text-xl'>No location data found</div>
        )
    }

    return (
        !loading && (
            <Map mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} mapLib={import('mapbox-gl')} initialViewState={
                {
                    latitude: lat,
                    longitude: lon,
                    zoom: 10
                }} style={{ width: '100%', height: 500 }} mapStyle="mapbox://styles/mapbox/streets-v9">
                <Marker longitude={lon} latitude={lat} anchor='bottom'>
                    <Image src={pin} alt='Location' width={40} height={40} />
                </Marker>
            </Map>
        )
    )
}