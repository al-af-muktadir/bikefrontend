import { Helmet } from "react-helmet-async";
// import Banner from "../Components/Banner";
import Carousel from "../folders/Carousel";
import Testimonial from "../folders/Testimonial";

import Product from "./UserProtectedPage/Product";
import NewsLetterSection from "../folders/NewsLetterSection";
import MegaNavbar from "../folders/MegaNavbar";
import QnADrawer from "../folders/QandASection";
import HowItWorks from "../folders/ExtraSection";

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
