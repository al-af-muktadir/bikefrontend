import sda from "../assets/sda.jpg";
import image from "../assets/imgbike.jpg";
import bike from "../assets/ead3cb204295869.Y3JvcCwzMjY2LDI1NTUsMTI5LDA.jpg";

const Carousel = () => {
  return (
    <div>
      <div className="carousel w-7xl translate-x-24 h-[400px] ">
        <div id="item1" className="carousel-item w-full">
          <img src={sda} className="w-7xl" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={image} className="w-7xl" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={bike} className="w-7xl" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2 mb-4">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
      </div>
    </div>
  );
};

export default Carousel;
