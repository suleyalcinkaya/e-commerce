import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Vita Classic Product',
      season: 'SUMMER 2020',
      description: 'We know how large objects will act, but things on a small scale.',
      price: 16.48,
      image: '/images/slider.png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative w-full min-h-full bg-emerald-600 pt-20">
      <div className="max-w-[1400px] mx-auto relative h-[900px]">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="absolute top-0 left-0 w-full h-full"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <div className="relative h-full flex flex-col items-center justify-center px-24">
                <div className="text-white max-w-xl z-10 text-center -mt-32">
                  <p className="text-2xl mb-6">{product.season}</p>
                  <h2 className="text-6xl font-bold mb-8">{product.name}</h2>
                  <p className="text-2xl mb-10 leading-relaxed">{product.description}</p>
                  <p className="text-5xl font-bold mb-10">${product.price}</p>
                  <button className="bg-green-500 text-white px-16 py-5 text-2xl rounded-lg hover:bg-green-600 transition-colors">
                    ADD TO CART
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 h-[100%] w-1/2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/3 -translate-y-1/2 bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors z-20"
        >
          <ChevronLeft className="w-10 h-10 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/3 -translate-y-1/2 bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors z-20"
        >
          <ChevronRight className="w-10 h-10 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
