
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center text-center"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
          New Season Arrivals
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up">
          Discover the latest trends in fashion and update your wardrobe with our new collection.
        </p>
        <a 
          href="#"
          className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
