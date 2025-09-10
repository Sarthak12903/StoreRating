import { useState } from "react";

export default function HomePage() {
  const [role] = useState("ADMIN");

  const stats = {
    totalUsers: 120,
    totalStores: 15,
    totalRatings: 340,
    avgRating: 4.2,
    reviews: [
      { user: "Alice", rating: 5 },
      { user: "Bob", rating: 4 },
    ],
  };

  const stores = [
    { id: 1, name: "Tech Hub", address: "123 Main St", rating: 4.5 },
    { id: 2, name: "Gadget World", address: "456 Elm St", rating: 3.8 },
    { id: 3, name: "Book Haven", address: "789 Oak St", rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to Store Ratings Platform
      </h1>

      {role === "ADMIN" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl">{stats.totalUsers}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">Total Stores</h2>
            <p className="text-3xl">{stats.totalStores}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">Total Ratings</h2>
            <p className="text-3xl">{stats.totalRatings}</p>
          </div>
        </div>
      )}

      {role === "USER" && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Stores</h2>
          <div className="grid gap-4">
            {stores.map((store) => (
              <div
                key={store.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">{store.name}</h3>
                  <p className="text-gray-600">{store.address}</p>
                  <p className="text-yellow-500">⭐ {store.rating}</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Rate Store
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {role === "OWNER" && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">My Store Dashboard</h2>
          <p className="text-lg">Average Rating: ⭐ {stats.avgRating}</p>
          <h3 className="mt-4 font-semibold">Recent Ratings</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {stats.reviews.map((r, idx) => (
              <li key={idx}>
                {r.user}: {r.rating} ⭐
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
