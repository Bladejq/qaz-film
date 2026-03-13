import useBillboard from '@/hooks/useBillBoard'
import React, { useCallback } from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from './PlayButton'
import useInfoModalStore from '@/hooks/useInfoModalStore'

interface BillBoardProps {
  movie?: any
}

const BillBoard: React.FC<BillBoardProps> = ({ movie }) => {

  const { data } = useBillboard()
  const { openModal } = useInfoModalStore()

  const currentMovie = movie || data

  const handleOpenModal = useCallback(() => {
    if (!currentMovie?.id) return
    openModal(currentMovie.id)
  }, [openModal, currentMovie])

  if (!currentMovie) return null

  return (
    <div className="relative h-[56.25vw]">

      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={currentMovie.thumbnailUrl}
        src={currentMovie.videoUrl}
      />

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">

        <p className="text-white text-xl md:text-5xl w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {currentMovie.title}
        </p>

        <p className="text-white text-[10px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {currentMovie.description}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">

          <PlayButton movieId={currentMovie.id} />

          <button
            onClick={handleOpenModal}
            className="
              bg-white
              text-black
              bg-opacity-30
              rounded-md
              py-1 md:py-2
              px-2 md:px-4
              text-xs lg:text-lg
              font-semibold
              flex
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>

        </div>

      </div>

    </div>
  )
}

export default BillBoard