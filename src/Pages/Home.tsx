import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Carousel from "../Components/Carousel";
import Testimonial from "../Components/Testimonial";

import Product from "./UserProtectedPage/Product";

const Home = () => {
  //(user, token);
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Carousel />
      <Banner />
      <Product />
      <Testimonial />
    </div>
  );
};

export default Home;
