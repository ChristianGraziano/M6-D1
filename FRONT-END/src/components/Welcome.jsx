import React from "react";
import gift_travel from "../assets/world-travel-gift.gif";

const Welcome = () => {
  return (
    <section className="d-flex flex-column align-items-center gap-4 fw-bold mt-5">
      <div className=" text-center">
        <h1>Benvenuto nel TravelBlog! </h1>
        <span>
          Raccontaci delle tue esperienzi di viaggi per raccogliere recensioni
          ed aiutare i nostri utenti a scoprire nuove fantastiche mete in tutto
          iu mondo..
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <img src={gift_travel} alt="" />
      </div>
    </section>
  );
};

export default Welcome;
