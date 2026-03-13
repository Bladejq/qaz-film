import BillBoard from "@/components/BillBoard"
import Navbar from "@/components/Navbar"
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

      <Navbar />

      <BillBoard />

      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favoriteMovies} title="My List" />
      </div>

      <Footer />
    </>
  )
}