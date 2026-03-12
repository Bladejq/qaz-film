import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() {

  const router = useRouter()

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-5xl font-bold mb-6">
          Добро пожаловать в QazFlix
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Смотрите лучшие фильмы и сериалы онлайн. 
          Добавляйте любимые фильмы в избранное и наслаждайтесь просмотром.
        </p>

        <button
          onClick={() => router.push("/movies")}
          className="bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
          Смотреть фильмы
        </button>

      </div>

      <Footer />
    </>
  )
}