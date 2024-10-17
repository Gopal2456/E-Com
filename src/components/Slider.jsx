import React, { useEffect, useState } from "react";
import axios from "axios";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;

        // Randomly select 4 images from the products
        const randomProducts = [];
        while (randomProducts.length < 4) {
          const randomIndex = Math.floor(Math.random() * products.length);
          if (!randomProducts.includes(products[randomIndex])) {
            randomProducts.push(products[randomIndex]);
          }
        }

        // Create slide data with messages and images
        const slideData = randomProducts.map((product, index) => ({
          image: product.image,
          title: [
            "Welcome to Our Store!",
            "Exclusive Offers!",
            "New Arrivals!",
            "Best Sellers!",
          ][index],
          description: [
            "Discover amazing products at unbeatable prices.",
            "Grab your favorite items with our special discounts.",
            "Check out the latest trends and styles.",
            "Shop our top-selling products and join the crowd.",
          ][index],
          backgroundColor: [
            "bg-red-300",
            "bg-blue-300",
            "bg-green-300",
            "bg-purple-300",
          ][index],
        }));

        setSlides(slideData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [slides]);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
            currentIndex === index ? "translate-x-0" : "translate-x-full"
          } ${slide.backgroundColor} flex items-center justify-center text-white p-4`}
        >
          {/* Background image with overlay */}
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          {/* Slide Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">{slide.title}</h2>
            <p className="text-lg drop-shadow-md">{slide.description}</p>
            {/* <button className="mt-4 px-6 py-2 bg-white text-orange-500 font-semibold rounded-md hover:bg-orange-500 hover:text-white transition">
              Shop Now
            </button> */}
          </div>
        </div>
      ))}

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-800 text-white p-2 rounded-full transition shadow-lg"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-800 text-white p-2 rounded-full transition shadow-lg"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
