import Footer from "@/components/Footer"
import MovieList from "@/components/MovieList"
import useFavorites from "@/hooks/useFavorites"

export default function FavoritesPage() {

  const { data: favoriteMovies } = useFavorites()

  return (
    <>

      <div className="bg-zinc-900 min-h-screen pt-24">

        <h1 className="text-white text-3xl font-bold px-6 md:px-16 mb-6">
          Менің таңдаулыларым
        </h1>

        <MovieList data={favoriteMovies} title="" />

      </div>

      <Footer />
    </>
  )
}