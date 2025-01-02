const destinations = [
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
    description: "Experience the magic of white-washed buildings and stunning sunsets.",
  },
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    description: "Discover tropical paradise with rich culture and pristine beaches.",
  },
  {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    description: "Immerse yourself in the perfect blend of tradition and modernity.",
  },
  {
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
    description: "Explore the ancient wonders of the Incan civilization.",
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explore Our Top Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                  View Trips
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;