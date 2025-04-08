import React, { useContext, useEffect, useState, useCallback } from 'react'
import { DirectionsRenderer, DirectionsService, GoogleMap, MarkerF, OverlayViewF } from '@react-google-maps/api'
import { SourceContext } from '../../../context/SourceContext'
import { DestinationContext } from '../../../context/DestinationContext'


function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: 550,
  }
  
  const { source } = useContext(SourceContext)
  const { destination } = useContext(DestinationContext)
  const [map, setMap] = useState(null)
  const [directionRoutePoint, setDirectionRoutePoint] = useState(null);
  
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
  }, [])
  
  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])
  
  const directionRoute = () => {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoint(result)
      } else {
        console.log("Error", status)
      }
    })
  }

  useEffect(() => {
    if ((source?.lat && source?.lng) || (destination?.lat && destination?.lng)) {
      const bounds = new window.google.maps.LatLngBounds()
      
      if (source?.lat && source?.lng) {
        bounds.extend(new window.google.maps.LatLng(source.lat, source.lng))
      }
      
      if (destination?.lat && destination?.lng) {
        bounds.extend(new window.google.maps.LatLng(destination.lat, destination.lng))
      }
      
      if (source?.lat && source?.lng && destination?.lat && destination?.lng) {
        directionRoute();
      }
      
      if (map) {
        map.fitBounds(bounds)
      }
    }
  }, [source, destination, map])
  
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 0, lng: 0 }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '5ede85e5b980f101' }}
    >
      {source?.lat && source?.lng && (
        <>
          <MarkerF position={{ lat: source.lat, lng: source.lng }} />
          {source.label && (
            <OverlayViewF
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName="overlayMouseTarget"
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -height - 10
              })}
            >
              <div className='p-2 bg-white font-bold inline-block rounded shadow'>
                <p className='text-black text-[14px]'>{source.label}</p>
              </div>
            </OverlayViewF>
          )}
        </>
      )}
      
      {destination?.lat && destination?.lng && (
        <>
          <MarkerF position={{ lat: destination.lat, lng: destination.lng }} />
          {destination.label && (
            <OverlayViewF
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName="overlayMouseTarget"
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -height - 10
              })}
            >
              <div className='p-2 bg-white font-bold inline-block rounded shadow'>
                <p className='text-black text-[14px]'>{destination.label}</p>
              </div>
            </OverlayViewF>
          )}
        </>
      )}
      
      {directionRoutePoint && (
        <DirectionsRenderer directions={directionRoutePoint} />
      )}
    </GoogleMap>
  )
}

export default GoogleMapSection