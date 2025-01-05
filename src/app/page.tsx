export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <div className="absolute inset-0 bg-[url('/path-to-your-mountain-image.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Choose a Country For Your Next Adventure?
          </h1>
          <p className="text-lg mb-8 text-center">
            From local escapes to far-flung adventures
          </p>
          <div className="w-full max-w-2xl">
            <input
              type="search"
              placeholder="Search destinations"
              className="w-full px-4 py-3 rounded-lg text-black"
            />
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Top Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Destination cards go here */}
        </div>
      </section>

      {/* Other sections... */}
    </div>
  );
} 