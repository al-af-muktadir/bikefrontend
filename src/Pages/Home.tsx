import { Helmet } from "react-helmet-async";
// import Banner from "../Components/Banner";
import Carousel from "../components/Carousel";
import Testimonial from "../components/Testimonial";

import Product from "./UserProtectedPage/Product";
import NewsLetterSection from "../components/NewsLetterSection";
import MegaNavbar from "../components/MegaNavbar";
import QnADrawer from "../components/QandASection";
import HowItWorks from "../components/ExtraSection";

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
