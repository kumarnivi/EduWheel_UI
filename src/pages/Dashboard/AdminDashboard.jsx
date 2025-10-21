import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
};

const AdminDashboard = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No access token found. Please login again.");
        return;
      }

      const { data } = await API.get("/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLocations(data);
      console.log("Fetched locations:", data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to fetch locations");
    }
  };

  const handleMapClick = (e) => {
    setNewLocation({
      ...newLocation,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
  };

  const handleCreateLocation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/locations", newLocation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("✅ Location added successfully!");
      setNewLocation({ name: "", address: "", latitude: "", longitude: "" });
      fetchLocations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding location");
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  if (!isLoaded) return <p>Loading Google Map...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📍 Admin Dashboard</h1>

      {/* Create New Location Form */}
      <form
        onSubmit={handleCreateLocation}
        className="bg-white shadow p-5 rounded-lg mb-6"
      >
        <h2 className="text-lg font-semibold mb-3">Add New Location</h2>
        <input
          type="text"
          placeholder="Location Name"
          className="border p-2 rounded w-full mb-2"
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded w-full mb-2"
          value={newLocation.address}
          onChange={(e) =>
            setNewLocation({ ...newLocation, address: e.target.value })
          }
          required
        />

        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Latitude"
            className="border p-2 rounded"
            value={newLocation.latitude}
            readOnly
          />
          <input
            type="text"
            placeholder="Longitude"
            className="border p-2 rounded"
            value={newLocation.longitude}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Location
        </button>
      </form>

      {/* Google Map */}
      <div className="mb-6">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 7.8731, lng: 80.7718 }}
          zoom={7}
          onClick={handleMapClick}
        >
          {locations.map((loc) => (
            <Marker
              key={loc._id}
              position={{ lat: loc.latitude, lng: loc.longitude }}
              onClick={() => setSelectedLocation(loc)}
            />
          ))}
          {newLocation.latitude && (
            <Marker
              position={{
                lat: parseFloat(newLocation.latitude),
                lng: parseFloat(newLocation.longitude),
              }}
            />
          )}
        </GoogleMap>
      </div>

      {/* Location List */}
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

      {/* Selected Location Details */}
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
  );
};

export default AdminDashboard;
