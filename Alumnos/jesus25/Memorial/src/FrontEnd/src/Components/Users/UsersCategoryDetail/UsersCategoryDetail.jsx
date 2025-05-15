import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar';
import { BASE_API_URL } from './../../../utils'
import Error from '../../Error/Error';

export default function UsersCategoryDetail() {

    //#region Variables 
    const { user, categoryName } = useParams();

    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Anime", param: "anime" },
        { name: "Serie", param: "serie" },
    ];

    const currentCategory = categories.find(c => c.param === categoryName)
    if (!currentCategory) return <Error />

    const [mediaList, SetMediaList] = useState([])

    //#endregion

    //#region Logica

    //GET
    useEffect(() => {
        fetch(`${BASE_API_URL}/api/memorialApp/media`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const filteredMedia = data.filter(m => m.category === categoryName)
                SetMediaList(filteredMedia)
            })
            .catch(e => console.error('Error fetching media:', e))
    }, [categoryName])

    return (
        <>
            <Navbar />
            <div className='media-detail-container'>
                <div className='category-detail-body-title'>
                    <h3>{currentCategory.name}</h3>

                </div>
                {mediaList.length > 0 ? (
                    <div className='media-grid'>
                        {mediaList.map(media => (
                            <div className='media-card' key={media.id} >
                                <Link to={`/users/${user}/${categoryName}/${media.id}`}>
                                    <div className="media-image" >
                                        {media.image ? (
                                            <img src={media.image} alt={media.title} />
                                        ) : (
                                            <div className="media-placeholder">Sin imagen</div>
                                        )}
                                    </div>
                                    <div className='media-info'>
                                        <h3>{media.title}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <p>No se ha encotrado ninguna {currentCategory.name}</p>
                    </>)}

            </div>
        </>
    )

}