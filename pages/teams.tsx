export default function Team() {
  const team = [
    {
      name: "Aruzhan",
      role: "Frontend Developer",
      image: "/team/aruzhan.jpg",
    },
    {
      name: "Dias",
      role: "Backend Developer",
      image: "/team/dias.jpg",
    },
    {
      name: "Ali",
      role: "UI/UX Designer",
      image: "/team/ali.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Біздің команда
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-xl p-6 text-center hover:scale-105 transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />

            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}