import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import auth from "../../../Firebase/firebase.init";
import Loading from "../../Loading/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import Banner from "../Banner/Banner";
import Experts from "../Experts/Experts";
import Services from "../Services/Services";

const Home = () => {
  const [user] = useAuthState(auth);

  if (user || !user) {
    <Loading></Loading>;
  }

  return (
    <div>
      <PageTitle title="Home"></PageTitle>

      <Banner></Banner>
      <Services></Services>
      <Experts></Experts>
    </div>
  );
};

export default Home;
