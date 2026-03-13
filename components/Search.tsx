import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next/router"

interface SearchProps {
  movies: any[]
}

const Search: React.FC<SearchProps> = ({ movies }) => {

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filteredMovies = movies?.filter((movie: any) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative flex items-center">

      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="text-gray-200 hover:text-white cursor-pointer transition"
        >
          <FaSearch />
        </div>
      )}

      {open && (
        <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1">

          <FaSearch className="text-gray-400 mr-2" />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Фильм іздеу..."
            className="bg-transparent outline-none text-white placeholder-gray-400 w-40 lg:w-56"
          />

          <button
            onClick={() => {
              setOpen(false)
              setQuery("")
            }}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>

        </div>
      )}

      {open && query.length > 0 && (

        <div className="absolute top-12 right-0 w-72 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg max-h-80 overflow-y-auto">

          {filteredMovies?.length === 0 && (
            <p className="p-4 text-gray-400 text-sm">
              Нәтиже табылмады
            </p>
          )}

          {filteredMovies?.map((movie: any) => (

            <div
              key={movie.id}
              onClick={() => router.push(`/watch/${movie.id}`)}
              className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer transition"
            >

              <img
                src={movie.thumbnailUrl}
                className="w-14 h-10 object-cover rounded"
              />

              <p className="text-sm text-white">
                {movie.title}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Search