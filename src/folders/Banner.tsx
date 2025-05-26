import gsap from "gsap";
import bike from "../assets/bike.webp";
import { useGSAP } from "@gsap/react";
const Banner = () => {
  useGSAP(() => {
    gsap.from(".banner", {
      x: 1500,
      duration: 1,

      delay: 0.5,
      ease: "back.in(0.1)",
    });
  });
  return (
    <div className="banner">
      <img src={bike} alt="" />
    </div>
  );
};

export default Banner;
