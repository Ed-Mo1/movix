import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const links = [FaFacebookF, FaInstagram, FaXTwitter, FaLinkedin];
const Footer = () => {
  return (
    <footer className="bg-black3">
      <div className="py-12 container flex flex-col items-center gap-8">
        <ul className="flex gap-6 justify-center items-center flex-wrap">
          <Link className="hover:text-pink transition-colors">
            Terms Of Use
          </Link>
          <Link className="hover:text-pink transition-colors">
            Privacy-PoLinkcy
          </Link>
          <Link className="hover:text-pink transition-colors">About</Link>
          <Link className="hover:text-pink transition-colors">Blog</Link>
          <Link className="hover:text-pink transition-colors">FAQ</Link>
        </ul>

        <p className="text-center opacity-[.5] max-w-[1000px] sm:text-base text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          {links.map((Item, i) => (
            <Link key={i} className="hover:text-pink p-4 transition-all hover:shadow-[0_0_15px_0px] bg-black text-xl shadow-pink  cursor-pointer rounded-full text-white">
              <Item />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
