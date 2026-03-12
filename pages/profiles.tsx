import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaLock, FaCheck, FaUpload } from "react-icons/fa";

const Profiles = () => {
  const { data: user, mutate } = useCurrentUser();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image || "");
    }
  }, [user]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Выберите изображение");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Файл не должен быть больше 5MB");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      setUploading(true);

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result;

        const response = await axios.post("/api/upload", {
          image: base64,
        });

        setImage(response.data.url);
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setUploading(false);
      setMessageType("error");
      setMessage("Ошибка загрузки изображения");
    }
  };

  const updateProfile = async () => {
    if (!name.trim()) {
      setMessageType("error");
      setMessage("Имя не может быть пустым");
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

      await mutate();

      setMessageType("success");
      setMessage("Профиль обновлен");

      setPassword("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessageType("error");
      setMessage("Ошибка обновления");

      setTimeout(() => {
        setMessage("");
      }, 3000);
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
          Измените данные аккаунта
        </p>

        {message && (
          <div
            className={`text-center mb-6 p-3 rounded-lg text-sm font-medium
              ${
                messageType === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
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
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-sm">
                Upload...
              </div>
            )}

          </div>

          <label className="cursor-pointer bg-zinc-800 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-2">

            <FaUpload />
            Выбрать фото

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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-500">
                <FaLock />
              </span>

              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              {loading ? "Сохранение..." : "Сохранить"}
              {!loading && <FaCheck />}
            </button>

            <p className="text-zinc-500 text-xs text-center">
              Оставьте пароль пустым если не хотите менять
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;