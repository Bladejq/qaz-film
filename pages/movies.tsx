import BillBoard from "@/components/BillBoard"
import Footer from "@/components/Footer"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"

import InfoModal from "@/components/InfoModal"
import useInfoModalStore from "@/hooks/useInfoModalStore"

export default function Home() {

  const { data: movies } = useMovieList()
  const { data: favoriteMovies } = useFavorites()

  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />

      <BillBoard />

      <div className="pb-40">
        <MovieList data={movies} title="Барлық фильмдер" />
        <MovieList data={favoriteMovies} title="Менің фильмдерім" />
      </div>

      <Footer />
    </>
  )
}