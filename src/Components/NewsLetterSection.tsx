const NewsLetterSection = () => {
  return (
    <div className="bg-[#ECE3D2] w-full py-16 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto text-center rounded-2xl shadow-md bg-white p-10 border border-[#d4c9aa]">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#58652D]">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mt-4 mb-8 text-lg">
          Be the first to know about new bikes, deals, and exclusive offers.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const email = formData.get("email");
            const name = formData.get("name");
            const newsData = {
              email: email as string,
              name: name as string,
            };
            console.log(newsData);
            const res = await fetch(
              "https://bike-store-backend-ovyb.vercel.app/api/news",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newsData),
              }
            );

            const data = await res.json();
            if (data.status === "success") {
              alert("Subscription successful!");
            } else {
              alert("Subscription failed. Please try again.");
            }
          }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#58652D] focus:ring-2 focus:ring-[#bcbb9d] transition-all text-gray-800"
            required
          />
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            className="w-full sm:w-2/3 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#58652D] focus:ring-2 focus:ring-[#bcbb9d] transition-all text-gray-800"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#58652D] text-white font-semibold rounded-full hover:bg-[#445021] transition-all"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsLetterSection;
