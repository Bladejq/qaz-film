import React from 'react'
import { useRouter } from 'next/router'
import { BsFillPlayFill } from "react-icons/bs"
import { BiPlus, BiCheck, BiInfoCircle } from "react-icons/bi"
import FavoriteButton from './FavoriteButton'

interface MovieCardProps {
    data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter()

    return (
        <div className='group bg-[#1a1a1a] rounded-xl overflow-hidden relative w-full max-w-[220px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,102,0,0.3)]'>
            <div className='relative aspect-[2/3] w-full overflow-hidden'>
                <img
                    src={data.thumbnailUrl}
                    alt={data.title}
                    className='
                        cursor-pointer
                        object-cover
                        w-full
                        h-full
                        transition
                        duration-700
                        group-hover:scale-110
                    '
                />

                <div className='
                    absolute 
                    inset-0 
                    bg-gradient-to-t 
                    from-black/90 
                    via-black/20 
                    to-transparent 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-all 
                    duration-300 
                    flex 
                    flex-col 
                    p-4
                '>
                    <div className='flex flex-row items-center justify-end gap-2 translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300'>
                        <div className='transform hover:scale-110 active:scale-90 transition'>
                            <FavoriteButton movieId={data?.id} />
                        </div>
                        
                        <div
                            onClick={() => router.push(`/movies/${data?.id}`)}
                            className='
                                cursor-pointer
                                w-9 h-9
                                bg-white/10
                                backdrop-blur-md
                                hover:bg-white/20
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition-all
                                hover:rotate-12
                            '
                            title="Толығырақ"
                        >
                            <BiInfoCircle size={22} className="text-white" />
                        </div>
                    </div>

                    <div className='flex-1 flex justify-center items-center'>
                        <div
                            onClick={() => router.push(`/movies/${data?.id}`)}
                            className='
                                cursor-pointer
                                w-14 h-14
                                bg-orange-600
                                hover:bg-orange-500
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition-all
                                duration-300
                                shadow-lg
                                scale-75
                                group-hover:scale-100
                                hover:shadow-orange-500/50
                            '
                        >
                            <BsFillPlayFill size={35} className="text-white ml-1" />
                        </div>
                    </div>

                </div>
            </div>

            <div className='p-3 bg-[#1a1a1a]'>
                <p className='text-white text-xs lg:text-sm font-bold truncate group-hover:text-orange-500 transition-colors'>
                    {data.title}
                </p>
                <div className='flex items-center gap-2 mt-1'>
                    <span className='text-[10px] text-zinc-500 font-medium uppercase'>
                        {data.genre}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard