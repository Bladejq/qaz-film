import React from "react";
import { FaGithub, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";


const Footer = () => {

  const router = useRouter();

  const links = [
    { label: "Басты бет", href: "/" },
    { label: "Фильмдер", href: "/movies" },
    { label: "Профиль", href: "/profiles" },
    { label: "Біздің команда", href: "/teams" },
    { label: "Құпиялылық саясат", href: "/privacy" }
  ];

  return (
    <footer className="bg-zinc-900 text-gray-400 py-10 px-6 md:px-16 mt-auto">

      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <div className="flex gap-6 text-xl">
          <FaGithub className="cursor-pointer hover:text-white transition" />
          <FaTelegram className="cursor-pointer hover:text-white transition" />
          <FaInstagram className="cursor-pointer hover:text-white transition" />
          <FaYoutube className="cursor-pointer hover:text-white transition" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

          {links.map((link) => (
            <div
              key={link.href}
              onClick={() => router.push(link.href)}
              className="cursor-pointer hover:text-white transition"
            >
              {link.label}
            </div>
          ))}

        </div>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} QazFilm. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;