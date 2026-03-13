import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Auth = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
    setMessage("");
    setError("");
  }, []);

  const login = useCallback(async () => {
    try {
      setError("");
      setMessage("");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.ok) {
        setMessage("Сіз сәтті кірдіңіз");

        setTimeout(() => {
          router.push("/");
        }, 1200);
      }

      if (result?.error) {
        setError("Email немесе құпиясөз дұрыс емес");
      }
    } catch (error) {
      console.log(error);
      setError("Кіру кезінде қате пайда болды");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      setError("");
      setMessage("");

      await axios.post("/api/register", {
        email,
        name,
        password
      });

      setMessage("Сіз сәтті тіркелдіңіз! Енді жүйеге кіріңіз.");
      setVariant("login");
    } catch (error) {
      console.log(error);
      setError("Тіркелу кезінде қате пайда болды");
    }
  }, [email, name, password]);

  return (
<div className="relative h-screen w-full bg-[url('/images/hero.gif')] bg-no-repeat bg-center bg-cover">
      <div className="lg:bg-black/70 w-full h-full">

        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>

        <div className="flex justify-center">

          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">

            <h2 className="text-white text-4xl mb-8 font-semibold text-center">
              {variant === "login" ? "Жүйеге кіру" : "Тіркелу"}
            </h2>

            {message && (
              <div className="text-green-500 text-center mb-4">
                {message}
              </div>
            )}

            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">

              {variant === "register" && (
                <Input
                  label="Аты"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  id="name"
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Құпиясөз"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id="password"
                type="password"
                value={password}
              />

            </div>

            <button
              onClick={variant === "login" ? login : register}
              className="
                bg-green-600
                text-white
                py-3
                rounded-md
                w-full
                mt-10
                hover:bg-green-700
                transition
              "
            >
              {variant === "login" ? "Кіру" : "Тіркелу"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-4 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-6 text-center">
              {variant === "login"
                ? "Бірінші рет келдіңіз бе?"
                : "Аккаунтыңыз бар ма?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login"
                  ? "Тіркелу"
                  : "Кіру"}
              </span>
            </p>

            <p className="text-white mt-2 text-center hover:underline">
            <Link href="/privacy">
              Құпиялық саясатпен танысу
            </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;