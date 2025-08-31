import Hero from "../components/Common/Hero";
import BestSeller from "../components/Products/BestSeller";
import FeatureCollection from "../components/Products/FeatureCollection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";

const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <BestSeller />
      <FeatureCollection />
    </>
  );
};

export default Home;
