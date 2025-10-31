import { useState, useRef, useCallback } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const useGoogleMapApi = (mapContainerRef) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapLoadedRef = useRef(false); // ✅ Only load map once

  const autocompleteRef = useRef(null);

  const loadGoogleMapsScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) return resolve();

      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (window.google && window.google.maps) resolve();
          else reject("Google Maps failed to load.");
        });
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, []);

  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK" && data.results.length > 0) {
        const best = data.results[0];
        setAddress({
          fullAddress: best.formatted_address,
          coords: { lat, lng },
        });
      } else {
        throw new Error("Geocoding failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const initMap = useCallback(async () => {
    if (mapLoadedRef.current) return; // ✅ Already loaded
    if (!mapContainerRef.current) return; // DOM not ready
     
    try {
      await loadGoogleMapsScript();

      const initialPos = { lat: 31.413489, lng: 73.115107 };
      const mapInstance = new window.google.maps.Map(mapContainerRef.current, {
        center: initialPos,
        zoom: 14,
      });

      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        position: initialPos,
        draggable: true,
      });

      markerInstance.addListener("dragend", () => {
        const pos = markerInstance.getPosition();
        if (pos) reverseGeocode(pos.lat(), pos.lng());
      });

      setMap(mapInstance);
      setMarker(markerInstance);
      mapLoadedRef.current = true;
      setLoading(true);
    } catch (err) {
      console.error("Google Maps init error:", err);
      setError("Failed to initialize Google Maps.");
      setLoading(true)
    }
  }, [mapContainerRef, loadGoogleMapsScript, reverseGeocode]);

  const updateMap = useCallback(
    (lat, lng) => {
      if (!map || !marker) return;

      const pos = { lat, lng };
      map.setCenter(pos);
      map.setZoom(17);
      marker.setPosition(pos);
      reverseGeocode(lat, lng);
    },
    [map, marker, reverseGeocode]
  );

  const fetchUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        updateMap(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, [updateMap]);

  const initAutocomplete = useCallback(
    (inputEl) => {
      if (!window.google || !inputEl) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputEl);

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        updateMap(lat, lng);
      });
    },
    [updateMap]
  );

  const resetMap = useCallback(() => {
  if (mapContainerRef.current) {
    mapContainerRef.current.innerHTML = ""; // Clear any leftover map
  }
  mapLoadedRef.current = false;
  setMap(null);
  setMarker(null);
}, [mapContainerRef]);

  return {
    address,
    loading,
    error,
    fetchUserLocation,
    initAutocomplete,
    initMap,
    resetMap,
  };
};
