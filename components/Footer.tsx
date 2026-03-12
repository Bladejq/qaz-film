import React from "react";
import { FaGithub, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-400 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Social Icons */}
        <div className="flex gap-6 mb-8 text-xl">
          <FaGithub className="cursor-pointer hover:text-white transition" />
          <FaTelegram className="cursor-pointer hover:text-white transition" />
          <FaInstagram className="cursor-pointer hover:text-white transition" />
          <FaYoutube className="cursor-pointer hover:text-white transition" />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">

          <div className="flex flex-col gap-3">
            <a className="hover:text-white cursor-pointer">Audio Description</a>
            <a className="hover:text-white cursor-pointer">Investor Relations</a>
            <a className="hover:text-white cursor-pointer">Legal Notices</a>
          </div>

          <div className="flex flex-col gap-3">
            <a className="hover:text-white cursor-pointer">Help Center</a>
            <a className="hover:text-white cursor-pointer">Jobs</a>
            <a className="hover:text-white cursor-pointer">Cookie Preferences</a>
          </div>

          <div className="flex flex-col gap-3">
            <a className="hover:text-white cursor-pointer">Account</a>
            <a className="hover:text-white cursor-pointer">Ways to Watch</a>
            <a className="hover:text-white cursor-pointer">Corporate Information</a>
          </div>

          <div className="flex flex-col gap-3">
            <a className="hover:text-white cursor-pointer">Media Center</a>
            <a className="hover:text-white cursor-pointer">Terms of Use</a>
            <a className="hover:text-white cursor-pointer">Contact Us</a>
          </div>

        </div>

        <div className="mt-8">
          <button className="
            border 
            border-gray-500 
            px-4 
            py-2 
            text-sm 
            hover:text-white 
            hover:border-white 
            transition
          ">
            Service Code
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} QazFlix. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;