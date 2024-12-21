import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
        <p className="w-full md:w-2/3 text-gray-600">
          We are committed to providing high-quality products and exceptional
          service to our customers. Explore our collection and experience the
          perfect blend of style and comfort.
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-212-456-7890</li>
          <li>contact@forever.com</li>
        </ul>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
