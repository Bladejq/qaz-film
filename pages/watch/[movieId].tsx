import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
    const router = useRouter()
    const { movieId } = router.query
    const { data } = useMovie(movieId as string)

    return (
        <div className='h-screen w-screen bg-black'>
            <nav className='
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-70
            '>
                <AiOutlineArrowLeft
                    onClick={() => router.push(`/movies/${data?.id}`)}
                    className="text-white cursor-pointer"
                    size={30}
                />
                <p className='text-white text-1xl md:text-3xl font-bold'>
                    <span className='font-light'>Көру: </span>
                    {data?.title}
                </p>
            </nav>

            <div className="w-full h-full flex items-center justify-center">
                {data?.videoUrl && (
                    <video
                        className="w-full h-full"
                        src={data.videoUrl}
                        controls
                        autoPlay
                    />
                )}
            </div>
        </div>
    )
}

export default Watch