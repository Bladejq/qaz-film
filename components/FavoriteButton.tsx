import axios from 'axios'

import React, { useCallback, useMemo } from 'react'
import { AiOutlineLike, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { mutate } from 'swr';


interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorites } = useFavorites()
    const { data: currentUser } = useCurrentUser()

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } })
        }
        else {
            response = await axios.post('/api/favorite', { movieId })
        }

        const updatedFavoritesIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoritesIds
        })

        mutateFavorites()

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])
    const Icon = isFavorite ? AiOutlineCheck : AiOutlineLike
    return (    
        <div onClick={toggleFavorites}
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
        >
            <Icon className="text-white" size={18} />
        </div>)
}

export default FavoriteButton