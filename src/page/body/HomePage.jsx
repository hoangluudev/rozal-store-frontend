import FeaturedProductSection from "../../components/homepagebody/featuredproductsection";
import LatestProductSection from "../../components/homepagebody/latestproductsection";
import Policy from "../../components/homepagebody/policy";

import HeroSection from "../header/herosection";

export const HomePageSection = () => {
  return (
    <>
      <HeroSection />
      <Policy />
      <FeaturedProductSection />
      <LatestProductSection />
    </>
  );
};
