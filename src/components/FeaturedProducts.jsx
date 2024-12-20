import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/images/pick1.png",
      category: "Men"
    },
    {
      id: 2,
      name: "Summer Floral Dress",
      price: 49.99,
      image: "/images/pick2.png",
      category: "Women"
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      price: 79.99,
      image: "/images/pick3.png",
      category: "Accessories"
    },
    {
      id: 4,
      name: "Kids Denim Jacket",
      price: 39.99,
      image: "/images/pick4.png",
      category: "Kids"
    },
    {
      id: 5,
      name: "Classic Sunglasses",
      price: 24.99,
      image: "/images/pick5.png",
      category: "Accessories"
    },
    {
      id: 6,
      name: "Casual Sneakers",
      price: 59.99,
      image: "/images/pick6.png",
      category: "Men"
    },
    {
      id: 7,
      name: "Evening Gown",
      price: 129.99,
      image: "/images/pick7.png",
      category: "Women"
    },
    {
      id: 8,
      name: "Kids Party Dress",
      price: 44.99,
      image: "/images/pick8.png",
      category: "Kids"
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-6">Featured Products</h2>
      <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative pt-[100%]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-xl mb-2">{product.category}</p>
              <p className="text-blue-600 text-2xl font-bold">${product.price}</p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
