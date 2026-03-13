export default function Team() {
  const team = [
    {
      name: "Nurnaz",
      role: "Full Stack developer",
      image: "/images/default.png",
    },
    {
      name: "Ayan",
      role: "Web-designer",
      image: "/images/default.png",
    },
    {
      name: "Kuanysh",
      role: "UI/UX Designer",
      image: "/images/default.png",
    },
    {
      name: "Elnur",
      role: "Web-designer",
      image: "/images/default.png ",
    },
  ];

  return (
<div className="min-h-screen bg-black text-white px-6 md:px-10 py-12">
  <h1 className="text-4xl font-bold mb-12 text-center mt-8">
    Біздің команда
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

    {team.map((member, index) => (
      <div
        key={index}
        className="
        relative
        p-6
        text-center
        rounded-2xl
        backdrop-blur-xl
        bg-white/5
        border border-white/10
        shadow-lg
        hover:shadow-white/20
        hover:bg-white/10
        transition
        duration-300
        hover:-translate-y-1
        "
      >

        <img
          src={member.image}
          alt={member.name}
          className="
          w-28
          h-28
          mx-auto
          rounded-full
          object-cover
          mb-4
          border
          border-white/20
          "
        />

        <h2 className="text-lg font-semibold">
          {member.name}
        </h2>

        <p className="text-gray-400 text-sm">
          {member.role}
        </p>

      </div>
    ))}

  </div>
</div>  
  );
}
