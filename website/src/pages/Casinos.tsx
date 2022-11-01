import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CasinoCard from '../components/CasinoCard'
import { SearchBar } from '../components/utils'
import './Casinos.css'
import { useAppSelector, useAppDispatch} from '../store'
import { propsCasino } from '../interface'
import {updateQueryCasino, updateQueryGame } from "../context/UserSlice"

function Casinos() {

  const casinos = useAppSelector(state => state.casinos.casinos)
  const {queryCasino, queryGame} = useAppSelector(state => state.user)
  const apiStatus = useAppSelector(state => state.casinos.status)
  const dispatch = useAppDispatch()
  const index__date = new Date().getDay() === 0 ? 6 : new Date().getDay()  - 1


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const CheckGames = (casino : propsCasino, queryGame : string) =>  {

    const availableGame = casino.jeux?.filter((jeu) =>  {
      return jeu.nom.toLocaleLowerCase().includes(queryGame.toLocaleLowerCase())}).length


     return   availableGame? availableGame > 0 : false &&
      casino.poker? "poker".includes(queryGame.toLocaleLowerCase()) : false

  }

  const CheckCasino = (casino : propsCasino, queryCasino : string) => {

    return casino.adresse?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.departement?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) ||
      casino.groupe?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.region?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase())|| 
      casino.ville?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.nom.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase())
    
  }

  const filter = (queryCasino : string | undefined, queryGame : string | undefined) => {

    if(queryCasino && queryGame){

    return casinos?.filter((casino) => {

      return CheckCasino(casino, queryCasino) && CheckGames(casino, queryGame)

    })
    
  }

  else if (queryCasino) {

    return casinos?.filter((casino) => {

      return CheckCasino(casino, queryCasino) 

    })

  }

  else if (queryGame){

    return casinos?.filter((casino) => {

      return CheckGames(casino, queryGame)

    })

  }

  else {
     return casinos
  }

  }

  const filteredCasinos = useMemo(() => filter(queryCasino, queryGame), [queryCasino, queryGame, apiStatus]);

  const handleQueryGameOnChange = (newQuery : string) => {

    dispatch(updateQueryGame(newQuery))
  }

  const handleQueryCasinoOnChange = (newQuery : string) => {

    dispatch(updateQueryCasino(newQuery))
  }



  return (
    <div className='casinos'>

      <div className='casinos__searchBar'>
        <SearchBar data={{ placeholder: "Search for a place, casino ..." , query : queryCasino}}  functions={{onChange : handleQueryCasinoOnChange}} />
        <SearchBar data={{ placeholder: "Search for a  game ...", query : queryGame }} functions={{onChange: handleQueryGameOnChange}} />
      </div>
      <div className='casinos__list'>


        {filteredCasinos?.map((casino, key) => {


          return <CasinoCard data={{ 
          context: "big", 
          img: casino.images?.length ? casino.images[0]  : 'https://images.pexels.com/photos/2837909/pexels-photo-2837909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          name : casino.nom, 
          adresse : casino.adresse, 
          casinoId : casino._id, 
          ouverture :casino.horaires? casino.horaires[index__date].ouverture : undefined, 
          fermeture: casino.horaires? casino.horaires[index__date].fermeture : undefined}} 
          functions={{ }} key={key}/>  
        })
        }
      </div>

    </div>
  )
}

export default Casinos


// .casinos__list{
//   width: 100%;
//   /* padding: 10px; */
//   padding-top: 30px;
//   padding-bottom: 30px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
// }