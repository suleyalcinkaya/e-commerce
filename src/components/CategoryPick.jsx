import React from "react";

const CategoryPick = () => {
  const categories = [
    {
      id: 1,
      title: "WOMEN",
      image: "/images/woman.png",
      link: "/"
    },
    {
      id: 2,
      title: "MEN",
      image: "/images/man.png",
      link: "/"
    },
    {
      id: 3,
      title: "KIDS",
      image: "/images/kids.png",
      link: "/"
    },
    {
      id: 4,
      title: "ACCESSORIES",
      image: "/images/accessories.png",
      link: "/"
    }
  ];

  return (
    <section className="py-8">
      <h2 className="text-4xl font-bold text-center m-20">Shop By Category</h2>
      <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative w-full"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-6xl font-semibold">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPick;
