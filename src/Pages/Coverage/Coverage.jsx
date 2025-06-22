import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiSearch } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import branchData from '../../assets/warehouses.json'; // আপনার JSON ডেটা

import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';



// Marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

// Component to fly/pan
const FlyToLocation = ({ position }) => {
  const map = useMap();
   useEffect(() => {
    if (position) {
      map.flyTo(position, 14, {
        duration: 1.5
      });
    }
  }, [position, map]);
  return null;
};

const Coverage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSearch = () => {
    const matched = branchData.find(
      item =>
        item.district.toLowerCase().includes(searchText.toLowerCase()) ||
        item.city.toLowerCase().includes(searchText.toLowerCase()) ||
        item.covered_area.some(area =>
          area.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    if (matched) {
      setSelectedPosition([matched.latitude, matched.longitude]);
    } else {
      alert('No matching area found!');
    }
  };

  return (
    <div className='my-10 px-4'>
      <h2 className='text-3xl font-bold text-center mb-4'>We are available in 64 districts</h2>

      {/* Search bar */}
      <div className='flex justify-center mb-6'>
        <div className='flex items-center bg-white shadow rounded-full overflow-hidden w-full max-w-md'>
          <input
            type='text'
            placeholder='Search district, city or area...'
            className='px-4 py-2 w-full outline-none rounded-full'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className='bg-[#CAEB66] btn p-3 text-black rounded-full'
          >
            Search
          </button>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[23.685, 90.3563]} // Default Bangladesh center
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* Smooth FlyTo */}
        <FlyToLocation position={selectedPosition} />

        {branchData.map((branch, index) => (
          <Marker
            key={index}
            position={[branch.latitude, branch.longitude]}
          >
            <Popup>
              <strong>{branch.city}, {branch.district}</strong><br />
              Areas: {branch.covered_area.join(', ')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
