import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BillBoard from "@/components/BillBoard"
import InfoModal from "@/components/InfoModal"
import MovieList from "@/components/MovieList"
import useMovie from "@/hooks/useMovie"
import useMovieList from "@/hooks/useMovieList"
import useInfoModalStore from "@/hooks/useInfoModalStore"
import { useRouter } from "next/router"

const MoviePage = () => {

  const router = useRouter()
  const { movieId } = router.query

  const { data: movie } = useMovie(movieId as string)
  const { data: movies = [] } = useMovieList()
  const { isOpen, closeModal } = useInfoModalStore()

  if (!movie) {
    return null
  }

  const filteredMovies = movies.filter((m: any) => m.id !== movie.id)

  return (
    <>
      <Navbar />

      <InfoModal visible={isOpen} onClose={closeModal} />

      <div className="bg-black text-white min-h-screen">

        <BillBoard movie={movie} />

        <div className="
          max-w-6xl
          mx-auto
          px-6
          md:px-16
          py-14
          grid
          md:grid-cols-1
          gap-12
          items-start
        ">

<div className="
  bg-white/5
  backdrop-blur-xl
  border border-white/10
  rounded-2xl
  p-6
  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
">

  <h2 className="text-xl font-semibold mb-6 text-white">
    Ақпарат
  </h2>

  <div className="space-y-3 text-gray-200 text-sm md:text-base">

    <p className="flex justify-between items-center">
      <span className="text-gray-400">Жанр</span>
      <span className="font-medium text-white">
        {movie.genre}
      </span>
    </p>

    <p className="flex justify-between items-center">
      <span className="text-gray-400">Ұзақтығы</span>
      <span className="font-medium text-white">
        {movie.duration}
      </span>
    </p>

    <p className="flex justify-between items-center">
      <span className="text-gray-400">Жылы</span>
      <span className="font-medium text-white">
        {movie.year || movie.title?.match(/\((\d{4})\)/)?.[1] || "Белгісіз"}
      </span>
    </p>

  </div>

</div>

        </div>

        <div className="px-6 md:px-16 pb-10">
          <MovieList title="Барлық фильмдер" data={filteredMovies} />
        </div>

      </div>

      <Footer />
    </>
  )
}

export default MoviePage