import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Team() {
  const team = [
    {
      name: "Nurnaz",
      role: "Full Stack developer",
      image: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
      skills: ["React", "Next.js", "MongoDB", "PostgreSql", "TailwindCss"]
    },
    {
      name: "Ayan",
      role: "Web-designer",
      image: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
      skills: ["Figma", "Web Design", "Animation"]
    },
    {
      name: "Kuanysh",
      role: "UI/UX Designer",
      image: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
      skills: ["UI UX", "Логотип", "Figma"]
    },
    {
      name: "Elnur",
      role: "Web-designer",
      image: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
      skills: ["Figma", "Branding", "Layout"]
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20 selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-green-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">Командамен танысу</h2>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Біздің команда
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/40 border border-white/5 rounded-3xl p-8 hover:bg-zinc-800/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white/10 p-1 group-hover:border-green-500 transition-colors duration-500"
                />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold group-hover:text-green-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-green-500 text-xs font-bold uppercase tracking-widest mt-1">
                  {member.role}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {member.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-[10px] px-2 py-1 bg-white/5 rounded-md border border-white/5 text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-green-500 group-hover:w-1/2 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}