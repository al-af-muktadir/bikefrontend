import { Helmet } from "react-helmet-async";
// import Banner from "../Components/Banner";
import Carousel from "../Components/Carousel";
import Testimonial from "../Components/Testimonial";

import Product from "./UserProtectedPage/Product";
import NewsLetterSection from "../Components/NewsLetterSection";
import MegaNavbar from "../Components/MegaNavbar";
import QnADrawer from "../Components/QandASection";
import HowItWorks from "../Components/ExtraSection";

const Home = () => {
  //(user, token);
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MegaNavbar />
      <Carousel />
      {/* <Banner /> */}
      <Product />
      <NewsLetterSection />
      <Testimonial />
      <QnADrawer />
      <HowItWorks />
    </div>
  );
};

export default Home;
