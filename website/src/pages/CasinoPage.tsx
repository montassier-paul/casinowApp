import React, { useEffect, useState } from 'react'
import "./CasinoPage.css"
import MessagesManager from '../components/MessagesManager'
import { useParams } from 'react-router-dom'
import MapIcon from '@mui/icons-material/Map';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CasinoIcon from '@mui/icons-material/Casino';
import BusinessIcon from '@mui/icons-material/Business';
import { GameCard } from '../components/utils'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useAppSelector } from "../store"
import NoteCard from '../components/NoteCard';






function CasinoPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  const casinoId = useParams().casinoId
  const casino = useAppSelector(state => state.casinos.casinos?.filter((casino) => { return casino._id === casinoId })[0])
  const [imgSelected, setImgSelected] = useState<string>(casino?.images?.length ? casino.images[0] : '')

 


  const handleOnMouseOver = (e: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {

    setImgSelected(e.currentTarget.src)
    // console.log(e.currentTarget)

  }

  const handleOnMouseOut = (e: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {

    // setImgSelected(undefined)

  }


  return (
    <div className='casinoPage'>

      <div className='casinoPage_container'>
        <h2>{casino?.nom}</h2>

        {casino?.images?.length ?

          <div className="casinoPage__gallery">


            <div className='casinoPage__imagesSlider'>

              {casino.images.map((image, key) => {
                return <img src={image} alt="" onMouseOver={e => handleOnMouseOver(e)} onMouseOut={e => handleOnMouseOut(e)} key={key}/>

              })

              }


            </div>
            {imgSelected &&

              <div className='casinoPage__imageContainer'>

                <img src={imgSelected} alt="" />

              </div>

            }




          </div>

          : <></>
        }

        <div className='casinoPage_infoContainer'>

          <div>
            <h4>
              Direct
              <LocalFireDepartmentIcon />
            </h4>
          </div>

          <div>
            <h4>
              Etablissement
              <BusinessIcon />
            </h4>

            <ul>
              <li>Poker : {casino?.poker ? <ThumbUpIcon style={{ color: '#3DB87C' }} /> : <DoDisturbIcon style={{ color: '#EA8C78' }} />}</li>
              <li>Hôtel : {casino?.hotel ? <ThumbUpIcon style={{ color: '#3DB87C' }} /> : <DoDisturbIcon style={{ color: '#EA8C78' }} />}</li>
              <li>Parking : {casino?.parking ? <ThumbUpIcon style={{ color: '#3DB87C' }} /> : <DoDisturbIcon style={{ color: '#EA8C78' }} />}</li>
              <li>Restaurant : {casino?.restaurant ? <ThumbUpIcon style={{ color: '#3DB87C' }} /> : <DoDisturbIcon style={{ color: '#EA8C78' }} />}</li>
              <li>Paris Sportif : {casino?.paris ? <ThumbUpIcon style={{ color: '#3DB87C' }} /> : <DoDisturbIcon style={{ color: '#EA8C78' }} />}</li>
              {casino?.tables_nombre && <li>Nombre de tables : {casino?.tables_nombre} </li>}
              {casino?.machines_nombre && <li>Nombre de machines : {casino?.machines_nombre}</li>}
              <p>Horaires : </p>
              {casino?.horaires && <li>{casino?.horaires[0].jour} : {casino?.horaires[0].ouverture} - {casino?.horaires[0].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[1].jour} : {casino?.horaires[1].ouverture} - {casino?.horaires[1].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[2].jour} : {casino?.horaires[2].ouverture} - {casino?.horaires[2].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[3].jour} : {casino?.horaires[3].ouverture} - {casino?.horaires[3].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[4].jour} : {casino?.horaires[4].ouverture} - {casino?.horaires[4].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[5].jour} : {casino?.horaires[5].ouverture} - {casino?.horaires[5].fermeture}</li>}
              {casino?.horaires && <li>{casino?.horaires[6].jour} : {casino?.horaires[6].ouverture} - {casino?.horaires[6].fermeture}</li>}


            </ul>

          </div>


          <div>
            <h4>Jeux
              <CasinoIcon />
            </h4>

            <div className="gamesContainer">

              {casino?.jeux?.map((jeu, key) => {

                return <GameCard nom={jeu.nom} desc={jeu.desc} type={jeu.type} nombre={jeu.nombre} key={key}/>


              })}


            </div>

          </div>

          <div>
            <h4>Adresse
              <MapIcon />
            </h4>

            <ul>
              {casino?.adresse && <li>adresse : {casino?.adresse}</li>}
              {casino?.departement && <li>département : {casino?.departement}</li>}
              {casino?.ville && <li>ville : {casino?.ville}</li>}
              {casino?.region && <li>région : {casino?.region}</li>}


            </ul>

          </div>

          <div>
          <NoteCard somme={casino?.score?.somme} votes={casino?.score?.votes}/>
          </div>

        </div>

        <MessagesManager />

      </div>
    </div>
  )
}

export default CasinoPage