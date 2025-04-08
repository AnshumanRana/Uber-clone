"use client"
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState, useContext } from 'react';
import { SourceContext } from '../../../context/SourceContext'
import { DestinationContext } from '../../../context/DestinationContext'

export default function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(SourceContext)
  const { destination, setDestination } = useContext(DestinationContext)
  
  const getLalAndLng = (place, type) => {
    const placeId = place.value.place_id
    const service = new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        console.log('Place type:', type); // Add this to debug
        
        if (type === 'source') { // Make sure exact comparison
          console.log('Setting source');
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        } else {
          console.log('Setting destination');
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        }
      }
    })
  }

  const placeholder = type === 'source' ? 'Pickup Location' : 'Drop-off Location';

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <img src="location.png" width={17} height={17} alt="" />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLalAndLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none"
            })
          }
        }}
      />
    </div>
  )
}