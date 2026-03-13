import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Navbar />

      <div className="bg-zinc-900 text-white min-h-screen w-full">
        <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://avatars.mds.yandex.net/get-ott/236744/2da6ee33-48d6-436c-a490-ba5ac209608a/960x540')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray/40 via-black/50" />
          <div className="relative z-10 max-w-5xl px-6">

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
              QazFILM
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Қазақ тіліндегі фильмдер, сериалдар және мультфильмдер
            </p>

            <button
              onClick={() => router.push("/movies")}
              className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-semibold transition shadow-lg hover:scale-105"
            >
              Көруді бастау
            </button>

          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              1000+ фильмдер
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Әлемнің түкпір-түкпірінен қазақ тіліндегі фильмдер мен сериалдарды көріңіз.
            </p>
          </div>

            <img src="https://static.tildacdn.pro/tild3231-6637-4861-a632-303233656436/b3a485c2-1c1e-41a2-8.png" alt="" />

        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        <img src="/images/section1.png" alt="" />

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Жоғары сапа
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Қазақ тіліндегі үздік дубляж және жоғары сападағы контент.
            </p>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Жаңа фильмдер әр апта
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Біздің кітапхана үнемі жаңа фильмдермен толықтырылады.
            </p>
          </div>

    <img src="https://static.tildacdn.pro/tild3466-6334-4462-a535-303138353364/651ec98d-f680-44bb-8.png" alt="" />

        </section>

        <section className="text-center py-24 bg-zinc-900 border-t border-zinc-800">

          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Қазір көруді бастаңыз
          </h2>

          <button
            onClick={() => router.push("/movies")}
            className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-full font-semibold transition shadow-lg hover:scale-105"
          >
            Фильмдерді көру
          </button>

        </section>

      </div>

      <Footer />
    </>
  )
}