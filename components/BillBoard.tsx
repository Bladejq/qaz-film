import React, { useCallback, useState } from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from './PlayButton'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import useMovieList from '@/hooks/useMovieList'

interface BillBoardProps {
  movie?: any
}

const BillBoard: React.FC<BillBoardProps> = ({ movie }) => {
  const { data: movies } = useMovieList()
  const { openModal } = useInfoModalStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const currentMovie = movie || movies?.[0]

  const handleOpenModal = useCallback(() => {
    if (!currentMovie?.id) return
    openModal(currentMovie.id)
  }, [openModal, currentMovie])

  if (!currentMovie) return null

  const toggleReadMore = () => setIsExpanded((prev) => !prev)
  const shortText = currentMovie.description?.slice(0, 100)

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-black">
      <video
        className="w-full h-full object-cover brightness-[75%]"
        autoPlay
        muted
        loop
        poster={currentMovie.thumbnailUrl}
        src={currentMovie.videoUrl}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute bottom-[20%] left-6 md:left-16 w-[90%] md:w-[50%] lg:w-[40%]">
        
        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight italic drop-shadow-xl">
          {currentMovie.title}
        </h1>

        <div className="mt-3">
          <p className="text-gray-200 text-xs md:text-base leading-snug drop-shadow-md">
            {isExpanded ? currentMovie.description : `${shortText}...`}
          </p>
          
          <button
            onClick={toggleReadMore}
            className="text-orange-500 font-semibold text-[10px] md:text-xs mt-1 hover:text-orange-400 transition"
          >
            {isExpanded ? 'Жабу' : 'Толығырақ'}
          </button>
        </div>

        <div className="flex flex-row items-center gap-3 mt-5">
          <div className="transform scale-90 md:scale-100 origin-left">
            <PlayButton movieId={currentMovie.id} />
          </div>

          <button
            onClick={handleOpenModal}
            className="
              flex
              items-center
              gap-2
              bg-white/15
              backdrop-blur-sm
              text-white
              rounded-lg
              py-1.5 md:py-2
              px-4 md:px-6
              text-xs md:text-sm
              font-medium
              hover:bg-white/25
              transition
              border border-white/10
            "
          >
            <AiOutlineInfoCircle size={18} />
            Мәліметтер
          </button>
        </div>
      </div>

      <div className="absolute -bottom-1 w-full h-16 bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  )
}

export default BillBoard