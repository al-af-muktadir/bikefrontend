const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      message: "Amazing bike! The quality and ride feel are top-notch.",
      image: "https://i.pravatar.cc/100?img=1",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Fantastic customer service and super smooth rides.",
      image: "https://i.pravatar.cc/100?img=2",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Johnson",
      message: "Best bike I’ve ever purchased. Highly recommend!",
      image: "https://i.pravatar.cc/100?img=3",
      rating: 5,
    },
  ];

  return (
    <div className="py-10 bg-[#ECE3D2] mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600 my-2">"{testimonial.message}"</p>
              <div className="flex justify-center mt-3 text-yellow-500">
                {"⭐".repeat(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
