
import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUserCircle, FaUserShield, FaExchangeAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Main Content with added space */}
      <main className="flex-grow">
        {/* Added space between navbar and hero section */}
        <div className="h-1"></div>
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Readora
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Bringing books and people together — anytime, anywhere.
            </p>
            {/* Added Learn More button with Link to signup */}
            <div className="flex justify-center">
              <Link to="/signup" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-semibold transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#f9fafb" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Featured Books Carousel */}
        <section className="max-w-6xl mx-auto mt-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUUBCE4SMuB_PRyTALuby3vYZ944P9AhQCg&s",
                title: "Academic Collection",
                count: "2,500+ books"
              },
              {
                src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
                title: "Research Papers",
                count: "1,200+ papers"
              },
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN9rs1H1Ax6whc7kg9cZyZsUiHzoyRke6GeA&s",
                title: "Fiction & Literature",
                count: "3,800+ books"
              }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={`${item.src}?auto=format&fit=crop&w=800&q=80`}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-5px] transition duration-300 border-t-4 border-blue-600">
              <FaUserShield className="text-5xl text-blue-600 mb-6" />
              <h2 className="text-xl font-semibold mb-4">Secure Authentication</h2>
              <p className="text-gray-600">Role-based access control with encrypted credentials and multi-factor authentication options.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-5px] transition duration-300 border-t-4 border-indigo-600">
              <FaBook className="text-5xl text-indigo-600 mb-6" />
              <h2 className="text-xl font-semibold mb-4">Comprehensive Catalog</h2>
              <p className="text-gray-600">Browse through thousands of books with advanced filtering, sorting, and recommendation features.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-5px] transition duration-300 border-t-4 border-purple-600">
              <FaExchangeAlt className="text-5xl text-purple-600 mb-6" />
              <h2 className="text-xl font-semibold mb-4">Smart Issuance System</h2>
              <p className="text-gray-600">Automated borrowing with QR code scanning, due date reminders, and online renewal options.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Readora</h3>
              <p className="text-gray-400 mb-4">Your complete solution for modern library management.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                <p>123 Library Street</p>
                <p>Booktown, BT 12345</p>
                <p className="mt-2">Email: info@readora.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Readora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;