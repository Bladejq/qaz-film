import { useRouter } from 'next/router';
import React from 'react'

import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
    movieId: string
}


const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

    const router = useRouter()
    return (

        <div
            onClick={() => router.push(`/watch/${movieId}`)}
            className='
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
            '>
            <BsFillPlayFill size={18} className="mr-1" />
            Қарау
        </div>)
}


export default PlayButton