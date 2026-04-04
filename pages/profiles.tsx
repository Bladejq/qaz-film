import React, { useEffect, useState } from "react";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { FaUpload, FaUser, FaLock, FaCheck } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  const { data: user, mutate: mutateUser } = useCurrentUser();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Суретті таңдаңыз");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Файл көлемі 5MB-тан аспауы керек");
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result;
        const response = await axios.post("/api/upload", { image: base64 });
        setImage(response.data.url);
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setUploading(false);
      setMessageType("error");
      setMessage("Суретті жүктеу кезінде қате шықты");
    }
  };

  const updateProfile = async () => {
    if (!name.trim()) {
      setMessageType("error");
      setMessage("Аты бос болмауы керек");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("/api/update-profile", {
        name,
        image,
        password: password || undefined,
      });

      await mutateUser();

      setMessageType("success");
      setMessage("Профиль жаңартылды");
      setPassword("");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessageType("error");
      setMessage("Жаңарту кезінде қате шықты");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="h-screen pt-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-zinc-900/90 backdrop-blur-sm w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-800/50">
        <h1 className="text-white text-3xl font-bold text-center mb-2">
          Профиль
        </h1>

        <p className="text-zinc-400 text-center text-sm mb-8">
          Профиль деректерін өзгертіңіз. Фото көлемі 5MB-тан аспауы керек.
        </p>

        {message && (
          <div
            className={`text-center mb-6 p-3 rounded-lg text-sm font-medium border ${
              messageType === "success"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <img
              src={image || "/images/default.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-zinc-800"
            />

            {uploading && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-xs">
                Жүктелуде...
              </div>
            )}
          </div>

          <label className="cursor-pointer bg-zinc-800 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition text-sm flex items-center gap-2">
            <FaUpload />
            Фотосуретті таңдау
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="w-full flex flex-col gap-4">
            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-500">
                <FaUser />
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Атыңыз"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-500">
                <FaLock />
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                placeholder="Жаңа құпия сөз"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={updateProfile}
              disabled={loading || uploading}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-zinc-700 transition flex items-center justify-center gap-2"
            >
              {loading ? "Сақталуда..." : "Сақтау"}
              {!loading && <FaCheck />}
            </button>

            <p className="text-zinc-500 text-xs text-center">
              Егер құпия сөзді өзгерткіңіз келмесе, бос қалдырыңыз.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;