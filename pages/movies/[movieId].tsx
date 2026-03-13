import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BillBoard from "@/components/BillBoard"
import useMovie from "@/hooks/useMovie"
import { useRouter } from "next/router"

const MoviePage = () => {

  const router = useRouter()
  const { movieId } = router.query

  const { data: movie } = useMovie(movieId as string)

  if (!movie) {
    return null
  }

  return (
    <>
      <Navbar />

      <div className="bg-black text-white min-h-screen">

        <BillBoard movie={movie} />

        <div className="
          max-w-6xl
          mx-auto
          px-6
          md:px-16
          py-14
          grid
          md:grid-cols-2
          gap-12
          items-start
        ">

          <div className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-xl
            p-6
          ">

            <h2 className="text-xl font-semibold mb-4">
              Фильм туралы
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {movie.description}
            </p>

          </div>

          <div className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-xl
            p-6
          ">

            <h2 className="text-xl font-semibold mb-6">
              Ақпарат
            </h2>

            <div className="space-y-3 text-gray-300">

              <div className="flex justify-between">
                <span className="text-gray-500">Жанр</span>
                <span>{movie.genre}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Ұзақтығы</span>
                <span>{movie.duration}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Жыл</span>
                <span>2023</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default MoviePage