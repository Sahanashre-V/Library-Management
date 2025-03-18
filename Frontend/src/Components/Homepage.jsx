
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 p-4 text-white text-center text-xl font-semibold shadow-md">
        Library Management System
      </nav>

      {/* Hero Section */}
      <section className="text-center my-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Digital Library</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage books, track members, and streamline library operations with ease.
        </p>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-gray-800 text-white w-full text-center p-4">
        &copy; {new Date().getFullYear()} Library Management. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
