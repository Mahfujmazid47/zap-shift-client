import React from "react";
import Marquee from "react-fast-marquee";
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import start_people from '../../../assets/brands/start-people 1.png';
import start from '../../../assets/brands/start.png';

const clientLogos = [
  amazon, 
  amazon_vector,
  casio,
  moonstar,
  randstad,
  start_people,
  start
];

const ClientMarquee = () => {
  return (
    <div className="py-12 bg-white text-center border-b-2 border-dashed">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        We've helped thousands of sales teams.
      </h2>

      <Marquee
        direction="right"
        pauseOnHover={true}
        speed={40}
        gradient={false}
        className="overflow-hidden"
      >
        {clientLogos.map((logo, index) => (
          <div
            key={index}
            className="mx-10 flex items-center justify-center"
            style={{ minWidth: "150px", height: "80px" }}
          >
            <img
              src={logo}
              alt={`client-logo-${index}`}
              className="max-h-full object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientMarquee;
