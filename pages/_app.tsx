import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// font, style
import "@/styles/globals.css";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"]
})

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const hideNavbar =
    router.pathname === "/auth" ||
    router.pathname.startsWith("/watch")

  if (loading) {
    return <SplashScreen />
  }

  return (
  <main className={montserrat.className}>
    {!hideNavbar && <Navbar />}
    <Component {...pageProps} />
  </main>
  )
}