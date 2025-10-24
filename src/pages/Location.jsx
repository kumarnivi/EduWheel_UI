import React, { useState, useEffect } from "react";
import API from "../../src/services/api";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
};

const Locations = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
  });

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("No access token found");

      const { data } = await API.get("/locations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch locations");
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // hide error while typing
  };

  const handleMapClick = (e) => {
    setFormData({
      ...formData,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Location name is required";
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreateLocation = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      await API.post("/locations", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Location added successfully!");
      setFormData({ name: "", address: "", latitude: "", longitude: "" });
      setShowModal(false);
      fetchLocations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding location");
    }
  };

  if (!isLoaded) return <p>Loading Google Map...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 ">
          <h1 className="text-2xl font-bold mb-4"> Locations Dashboard</h1>

          {/* Button to open modal */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
          >
            Add New Location
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-bold mb-4">Add Location</h2>

                <form onSubmit={handleCreateLocation}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Location Name"
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded p-2 mb-2`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                  )}

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className={`w-full border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded p-2 mb-2`}
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mb-2">{errors.address}</p>
                  )}

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Latitude"
                      className="border p-2 rounded"
                      value={formData.latitude}
                      readOnly
                    />
                    <input
                      type="text"
                      placeholder="Longitude"
                      className="border p-2 rounded"
                      value={formData.longitude}
                      readOnly
                    />
                  </div>

                  <p className="mb-2 text-gray-500">
                    Click on the map to select coordinates
                  </p>

                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: 7.8731, lng: 80.7718 }}
                    zoom={7}
                    onClick={handleMapClick}
                  >
                    {formData.latitude && (
                      <Marker
                        position={{
                          lat: parseFloat(formData.latitude),
                          lng: parseFloat(formData.longitude),
                        }}
                      />
                    )}
                  </GoogleMap>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mr-2 px-4 py-2 rounded border hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Locations Table */}
          <div className="bg-white p-5 shadow rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">All Locations</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Latitude</th>
                  <th className="p-2">Longitude</th>
                  <th className="p-2">Revenue (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc) => (
                  <tr
                    key={loc._id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <td className="p-2">{loc.name}</td>
                    <td className="p-2">{loc.address}</td>
                    <td className="p-2">{loc.latitude}</td>
                    <td className="p-2">{loc.longitude}</td>
                    <td className="p-2 font-semibold text-green-700">
                      {loc.totalRevenue?.toFixed(2) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Location */}
          {selectedLocation && (
            <div className="bg-white shadow p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                📍 {selectedLocation.name}
              </h3>
              <p className="mb-1 text-gray-700">
                <strong>Address:</strong> {selectedLocation.address}
              </p>
              <p className="mb-1 text-gray-700">
                <strong>Latitude:</strong> {selectedLocation.latitude}
              </p>
              <p className="mb-1 text-gray-700">
                <strong>Longitude:</strong> {selectedLocation.longitude}
              </p>
              <p className="text-green-700 font-semibold mt-2">
                💰 Revenue: Rs. {selectedLocation.totalRevenue?.toFixed(2) || 0}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
