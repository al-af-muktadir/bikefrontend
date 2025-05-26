import sda from "../assets/sda.jpg";
import image from "../assets/slider-motorcycle-25-03-v2.webp";
import bike from "../assets/download.webp";

const Carousel = () => {
  return (
    <div className="w-full">
      {/* Full-Width Carousel */}
      <div className="carousel w-full h-[400px] md:h-[500px] rounded-none">
        <div id="item1" className="carousel-item w-full">
          <img src={sda} className="w-full object-cover" alt="Slide 1" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={image} className="w-full object-cover" alt="Slide 2" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={bike} className="w-full object-cover" alt="Slide 3" />
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 py-4">
        <a href="#item1" className="btn btn-sm btn-outline">
          1
        </a>
        <a href="#item2" className="btn btn-sm btn-outline">
          2
        </a>
        <a href="#item3" className="btn btn-sm btn-outline">
          3
        </a>
      </div>
    </div>
  );
};

export default Carousel;
