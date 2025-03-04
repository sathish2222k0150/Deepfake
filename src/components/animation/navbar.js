// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { data } from './data';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const socialLinks = [
    { icon: '𝕏', href: '#' },
    { icon: 'IG', href: '#' },
    { icon: 'in', href: '#' },
    { icon: 'YT', href: '#' }
  ];

  const openImage = (index) => setSelectedImageIndex(index);
  const closeImage = () => setSelectedImageIndex(null);

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (selectedImageIndex < data.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Expanding Menu */}
      <div
        className={`fixed inset-0 bg-purple-600 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Title (Fixed) */}
        <div className="absolute top-0 left-0 w-full py-6 bg-purple-600 text-center">
          <h1 className="text-4xl font-bold text-white">Deepfake Detection</h1>
        </div>

        {/* Scrollable Content */}
        <div className="absolute top-20 left-0 right-0 bottom-0 overflow-y-auto">
          {/* Left Side Social Links */}
          <div className="absolute left-8 top-1/4 flex flex-col gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{ fontSize: '48px', fontWeight: 'bold' }}
                className="text-purple-300 hover:text-white transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Image Grid (Scrollable, 3 images per row) */}
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-3 gap-6 p-8">
              {data.map((item, index) => (
                <div key={item.id} className="flex flex-col items-center">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-80 h-52 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openImage(index)}
                  />
                  <p className="text-white font-bold mt-2">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <a
          href="#contact"
          className="fixed bottom-8 right-8 bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition-colors"
        >
          DeepFake →
        </a>
      </div>

      {/* Image Modal with Previous & Next Buttons */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md" onClick={closeImage}>
            <X className="w-6 h-6 text-black" />
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              className="absolute left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-300"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8 text-black" />
            </button>
          )}

          {/* Image Display */}
          <img
            src={data[selectedImageIndex].imgUrl}
            alt="Large preview"
            className="w-auto max-w-4xl h-auto max-h-[90vh] rounded-lg shadow-lg"
          />

          {/* Next Button */}
          {selectedImageIndex < data.length - 1 && (
            <button
              className="absolute right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-300"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8 text-black" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
