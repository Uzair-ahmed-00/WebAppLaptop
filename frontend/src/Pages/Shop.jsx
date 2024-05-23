import React from "react";
import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";
import Featured from "../Components/Featured/Featured";
import Offers from "../Components/Offers/Offers";
import NewCollection from "../Components/NewCollection/NewCollection";
import RecentPost from "../Components/RecentPost/RecentPost";
import Filter from "../Components/Filter/Filter";

const Shop = () => {
  return (
    <div>
      <Filter />
      {/* <Hero /> */}
      <Offers />
      <Card />
      {/* <Featured /> */}
      <RecentPost />
      {/* <NewCollection /> */}
    </div>
  );
};

export default Shop;
