import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblem, getProblemCategories } from './config/PublicApi';
import { FileEdit, Mic, MapPin, ChevronDown, RotateCw } from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker asset paths
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

/* =========================================
   MAP CONTROLLER COMPONENT
========================================= */
const MapController = ({ location, radius }) => {
  const map = useMap();

  useEffect(() => {
    if (!location?.latitude || !location?.longitude) return;

    const radiusMeters = (radius || 5) * 1000;
    const center = L.latLng(location.latitude, location.longitude);
    const bounds = center.toBounds(radiusMeters * 2);

    map.flyToBounds(bounds, {
      duration: 1.2,
      padding: [40, 40],
      maxZoom: 16,
    });
  }, [location?.latitude, location?.longitude, radius, map]);

  return null;
};

/* =========================================
   LEAFLET MAP COMPONENT
========================================= */
const Map = ({ location, radius, onLocationChange }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState('');

  const fetchAddressAndSet = async (lat, lon) => {
    setLoading(true);
    setLoadingText('Detecting area details...');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      if (response.ok) {
        const data = await response.json();
        const addr = data.address || {};

        onLocationChange({
          latitude: lat,
          longitude: lon,
          displayName: data.display_name,
          address: data.display_name || '',
          district: addr.state_district || addr.county || addr.district || '',
          // Tehsil-equivalent fields from Nominatim, in priority order
          tehsil: addr.subdistrict || addr.tehsil || addr.municipality || addr.county || '',
          village: addr.village || addr.suburb || addr.neighbourhood || addr.road || '',
        });
      } else {
        onLocationChange({
          latitude: lat,
          longitude: lon,
          displayName: `Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
          address: '',
        });
      }
    } catch (err) {
      console.error('Reverse geocode error:', err);
      onLocationChange({
        latitude: lat,
        longitude: lon,
        displayName: `Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        address: '',
      });
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleCurrentLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Browser does not support GPS.');
      return;
    }

    setLoading(true);
    setLoadingText('Acquiring GPS...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchAddressAndSet(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.warn('High-accuracy GPS failed, trying fallback...', err);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetchAddressAndSet(pos.coords.latitude, pos.coords.longitude);
          },
          (finalErr) => {
            setLoading(false);
            setLoadingText('');
            setError('Could not retrieve current location.');
          },
          { enableHighAccuracy: false, timeout: 8000 }
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        height: 220,
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 12px',
            borderRadius: 20,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            fontSize: 11,
            fontWeight: 600,
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <RotateCw size={12} className="animate-spin" />
          <span>{loadingText || 'Locating...'}</span>
        </div>
      )}

      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController location={location} radius={radius} />
        <Marker position={[location.latitude, location.longitude]} />
        <Circle
          center={[location.latitude, location.longitude]}
          radius={radius * 1000}
          pathOptions={{
            color: '#15803D',
            weight: 2,
            fillColor: '#16A34A',
            fillOpacity: 0.12,
            dashArray: '5, 5',
          }}
        />
      </MapContainer>

      <div
        style={{
          position: 'absolute',
          left: 10,
          bottom: 10,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.94)',
          borderRadius: 8,
          padding: '6px 10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
          maxWidth: '65%',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>
          LAT: {location.latitude.toFixed(4)}°, LONG: {location.longitude.toFixed(4)}°
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#4B5563',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {location.displayName || 'GPS Selected'}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCurrentLocation}
        disabled={loading}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          zIndex: 1000,
          background: '#111827',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 11.5,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <span>GPS Pin</span> <MapPin size={12} />
      </button>

      {error && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            zIndex: 1000,
            background: '#FEE2E2',
            color: '#991B1B',
            fontSize: 11,
            padding: '5px 10px',
            borderRadius: 6,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

/* =========================================
   MAIN RPROBLEM COMPONENT — STEP 1: DETAILS
========================================= */
const RProblem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  // Categories now come from the backend (with pre-set levels), not hardcoded
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState(''); // replaces the old "block" field, still maps to backend's `block` column
  const [village, setVillage] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [address, setAddress] = useState('');

  const [mapLocation, setMapLocation] = useState({
    latitude: 23.0722,
    longitude: 85.2784,
    displayName: '',
  });

  // Fetch categories from the backend on mount
  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError('');
      try {
        const response = await getProblemCategories();
        if (cancelled) return;

        // Log the raw response so we can see the actual shape in DevTools console
        console.log('Categories API response:', response);

        const fetched = response?.data || [];

        if (!Array.isArray(fetched)) {
          console.error('Expected an array of categories but got:', fetched);
          setCategoriesError('Unexpected response format from server.');
          return;
        }

        setCategories(fetched);
        if (fetched.length > 0) {
          setSelectedCategoryId(fetched[0].id);
        } else {
          setCategoriesError('No categories found. Please seed categories in the backend.');
        }
      } catch (err) {
        // Log the FULL error so you can see status code / message in the console
        console.error('Failed to load categories:', err);
        console.error('Error response:', err?.response);
        console.error('Error status:', err?.response?.status);
        console.error('Error data:', err?.response?.data);

        if (!cancelled) {
          const status = err?.response?.status;
          if (status === 404) {
            setCategoriesError('Categories endpoint not found (404). Check backend route.');
          } else if (status === 500) {
            setCategoriesError('Server error loading categories (500). Check backend logs.');
          } else if (!err?.response) {
            setCategoriesError('Cannot reach server. Check backend is running / CORS.');
          } else {
            setCategoriesError(`Could not load categories (status ${status || 'unknown'}).`);
          }
        }
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    };

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLocationUpdate = (locData) => {
    setMapLocation({
      latitude: locData.latitude,
      longitude: locData.longitude,
      displayName: locData.displayName,
    });

    if (locData.address) setAddress(locData.address);
    if (locData.district) setDistrict(locData.district);
    if (locData.tehsil) setTehsil(locData.tehsil);
    if (locData.village) setVillage(locData.village);
  };

  const handleSubmitProblem = async () => {
    setSubmitMessage('');

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = Number(storedUser?.id);

    if (!userId) {
      setSubmitMessage('Please log in again before submitting a problem.');
      return;
    }
    if (!title.trim() || !description.trim()) {
      setSubmitMessage('Please enter a problem title and description.');
      return;
    }
    if (!selectedCategoryId) {
      setSubmitMessage('Please select a category.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await createProblem({
        userId,
        title: title.trim(),
        categoryId: selectedCategoryId,
        district: district.trim(),
        block: tehsil.trim(), // sent as `block` to match the backend column
        village: village.trim(),
        description: description.trim(),
        address: address.trim(),
        latitude: mapLocation.latitude,
        longitude: mapLocation.longitude,
      });

      const problemId = response.data.id;
      navigate(`/report-problem/${problemId}/upload`);
    } catch (requestError) {
      setSubmitMessage(requestError?.response?.data?.message || 'Unable to submit the problem.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: '28px 40px 40px',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FileEdit size={19} color="#15803D" strokeWidth={2} />
          </div>

          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                color: '#111827',
              }}
            >
              Report a Community Problem{' '}
              <span style={{ fontWeight: 700, color: '#374151' }}>
                (समस्या दर्ज करें)
              </span>
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>
              Step 1 of 2 — Basic details &amp; location. Photos and videos come next.
            </p>
          </div>
        </div>

        {/* Voice assistant banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#EFF6FF',
            border: '1px solid #DBEAFE',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 26,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Mic size={14} color="#fff" />
          </div>

          <div>
            <div style={{ fontSize: 13, color: '#1E3A8A' }}>
              <b>बोलकर समस्या बताएं</b> /{' '}
              <span style={{ color: '#2563EB', fontWeight: 600 }}>
                Voice Assistant Available
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#3B5A9A' }}>
              Tap the microphone icon at any field to speak in Hindi, Santhali, Ho, or English.
            </div>
          </div>

          <button
            type="button"
            style={{
              marginLeft: 'auto',
              background: '#2563EB',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Mic size={14} />
            Start Voice
          </button>
        </div>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
          }}
        >
          {/* LEFT column */}
          <div>
            <Field label="Problem Title (समस्या का नाम)" required>
              <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <Field label="Sector Category" required>
                {categoriesLoading ? (
                  <div style={{ fontSize: 12, color: '#9CA3AF', padding: '10px 0' }}>
                    Loading categories...
                  </div>
                ) : categoriesError ? (
                  <div style={{ fontSize: 12, color: '#DC2626', padding: '10px 0' }}>
                    {categoriesError}
                  </div>
                ) : (
                  <CategorySelect
                    categories={categories}
                    selectedId={selectedCategoryId}
                    onChange={setSelectedCategoryId}
                  />
                )}
              </Field>

              <Field label="District (ज़िला)" required>
                <TextInput
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </Field>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <Field label="Tehsil" required>
                <TextInput
                  value={tehsil}
                  onChange={(e) => setTehsil(e.target.value)}
                />
              </Field>

              <Field label="Village / Tola / Area" required>
                <TextInput
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
              </Field>
            </div>

            <Field label="Full Address (पूरा पता)">
              <TextInput
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Field>

            <Field label="Detailed Description (विस्तार से बताएं)" required>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  padding: '11px 13px',
                  fontSize: 13,
                  color: '#374151',
                  resize: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.6,
                  boxSizing: 'border-box',
                }}
              />
              <div
                style={{
                  textAlign: 'right',
                  fontSize: 11,
                  color: '#9CA3AF',
                  marginTop: 3,
                }}
              >
                {description.length} / 1000
              </div>
            </Field>
          </div>

          {/* RIGHT column */}
          <div>
            <Field label="Geographic Pinpoint (स्थान चुनें)" required>
              <Map
                location={mapLocation}
                radius={2}
                onLocationChange={handleLocationUpdate}
              />
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 26,
            paddingTop: 20,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12.5,
              color: '#374151',
            }}
          >
            {submitMessage && (
              <span style={{ color: '#DC2626' }}>{submitMessage}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmitProblem}
            disabled={submitting}
            style={{
              background: '#14532D',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '13px 26px',
              fontSize: 13.5,
              fontWeight: 700,
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'SUBMITTING...' : 'NEXT: ADD PHOTOS →'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================
    REUSABLE FORM ATOMS
========================= */
const Field = ({ label, required, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label
      style={{
        display: 'block',
        fontSize: 11,
        fontWeight: 700,
        color: '#374151',
        letterSpacing: 0.3,
        marginBottom: 7,
        textTransform: 'uppercase',
      }}
    >
      {label}
      {required && ' *'}
    </label>
    {children}
  </div>
);

const TextInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      border: '1px solid #D1D5DB',
      borderRadius: 8,
      padding: '10px 13px',
      fontSize: 13,
      color: '#374151',
      boxSizing: 'border-box',
      outline: 'none',
    }}
  />
);

const CategorySelect = ({ categories, selectedId, onChange }) => {
  const [open, setOpen] = useState(false);

  const selectedCategory = categories.find((c) => c.id === selectedId);

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1.5px solid #16A34A',
          borderRadius: 8,
          padding: '10px 13px',
          fontSize: 13,
          color: '#374151',
          cursor: 'pointer',
          background: '#fff',
        }}
      >
        <span>{selectedCategory ? selectedCategory.name : 'Select category'}</span>
        <ChevronDown size={14} color="#9CA3AF" />
      </div>

      {open && categories.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            zIndex: 50,
            maxHeight: 230,
            overflowY: 'auto',
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onChange?.(cat.id);
                setOpen(false);
              }}
              style={{
                padding: '10px 13px',
                fontSize: 13,
                color: selectedId === cat.id ? '#15803D' : '#374151',
                background: selectedId === cat.id ? '#F0FDF4' : '#fff',
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RProblem;