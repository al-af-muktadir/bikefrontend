import { useState } from "react";

const questionsAnswers = [
  {
    question: "What is Fury Cart?",
    answer:
      "Fury Cart is a premium online bike marketplace offering a wide variety of futuristic bikes with unmatched style and speed.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply click 'View Details' on any bike, then click the 'Order Now' button to complete your purchase securely.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes, we offer home delivery across the country with safe packaging and quick service.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards, bKash, Nagad, Rocket, and cash on delivery for selected cities.",
  },
];

const QnADrawer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDrawer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#58652D]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {questionsAnswers.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleDrawer(index)}
              className="w-full text-left px-5 py-4 bg-[#ECE3D2] text-[#754130] font-semibold hover:bg-[#e5dac4] transition"
            >
              {item.question}
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-white text-gray-700 border-t">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnADrawer;
