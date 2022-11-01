import { useState, useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./Map.css";
import { Button, SearchBar } from "../components/utils";
import CasinoCard from "../components/CasinoCard";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { updateQueryCasino, updateQueryGame } from "../context/UserSlice";


export default function App() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dispatch = useAppDispatch()
  const apiStatus = useAppSelector(state => state.casinos.status)



  const [map, setMap] = useState(null)
  const navigate = useNavigate()
  const { queryCasino, queryGame } = useAppSelector(state => state.user)
  const casinos = useAppSelector(state => state.casinos.casinos)



  const handleMyPositionOnClick = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((location) => {
        // map.setView([location.coords.latitude, location.coords.longitude], 10)
        map.flyTo([location.coords.latitude, location.coords.longitude], 10)
      })


    } else {
      alert("Geolocalisation is not available on your browser!");
    }

  }

  const handleResetPosition = () => {

    map.setView([46, 2], 5);

  }

  const CheckGames = (casino , queryGame ) =>  {

    const availableGame = casino.jeux?.filter((jeu) =>  {
      return jeu.nom.toLocaleLowerCase().includes(queryGame.toLocaleLowerCase())}).length


     return   availableGame? availableGame > 0 : false &&
      casino.poker? "poker".includes(queryGame.toLocaleLowerCase()) : false

  }

  const CheckCasino = (casino, queryCasino) => {

    return casino.adresse?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.departement?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) ||
      casino.groupe?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.region?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) ||
      casino.ville?.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase()) || casino.nom.toLocaleLowerCase().includes(queryCasino.toLocaleLowerCase())

  }

  const filter = (queryCasino, queryGame) => {


    if (queryCasino && queryGame) {

      return casinos?.filter((casino) => {

        return CheckCasino(casino, queryCasino) && CheckGames(casino, queryGame) && casino.latitude && casino.longitude

      })

    }

    else if (queryCasino) {

      return casinos?.filter((casino) => {

        return CheckCasino(casino, queryCasino)  && casino.latitude && casino.longitude

      })

    }

    else if (queryGame) {

      return casinos?.filter((casino) => {

        return CheckGames(casino, queryGame)  && casino.latitude && casino.longitude

      })

    }

    else {

      return casinos?.filter((casino) => {

        return casino.latitude && casino.longitude

      })
      
    }

  }

  const filteredCasinos = useMemo(() => filter(queryCasino, queryGame), [queryCasino, queryGame, apiStatus]);

  const handleCasinoCardOnClick = (latitude, longitude) => {
    // map.setView([latitude, longitude], 10);
    map.flyTo([latitude, longitude], 10)


  }

  const handleQueryGameOnChange = (newQuery) => {

    dispatch(updateQueryGame(newQuery))
  }

  const handleQueryCasinoOnChange = (newQuery) => {

    dispatch(updateQueryCasino(newQuery))
  }

  const index__date = new Date().getDay() === 0 ? 6 : new Date().getDay()  - 1


  return (
    <div className="map">

      <div className="map__left">

        <div className="map__leftSearchCasinosContainer">

          <div className="map-leftSearchContainer">
            <SearchBar data={{ placeholder: "Search for a place, casino ...", query: queryCasino }} functions={{ onChange: handleQueryCasinoOnChange }} />
            <SearchBar data={{ placeholder: "Search for a  game ...", query: queryGame }} functions={{ onChange: handleQueryGameOnChange }} />
          </div>

          <div className="map-leftCasinosContainer">

            {filteredCasinos?.map((casino, key) => {

              return <CasinoCard data={{
                context: "small",
                name: casino.nom,
                adresse: casino.adresse,
                ouverture: casino.horaires ? casino.horaires[index__date].ouverture : undefined,
                fermeture: casino.horaires ? casino.horaires[index__date].fermeture : undefined,
                latitude: casino.latitude, longitude: casino.longitude
              }}
                functions={{ handleMoveTo: handleCasinoCardOnClick }} key={key} />
            })
            }

            {/* <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} />
            <CasinoCard data={{ context: "small", name: 'test', adresse: "12 rue quelque part", latitude: 47.346110, longitude: 4.798780 }} functions={{ handleMoveTo: handleCasinoCardOnClick }} /> */}


          </div>




        </div>



      </div>

      <div className="map__right">

        <div className="map__rightButtons">

          <Button data={{ text: "Ma position" }} functions={{ handleOnClick: handleMyPositionOnClick }} />
          <Button data={{ text: "Reset" }} functions={{ handleOnClick: handleResetPosition }} />

        </div>


        <MapContainer ref={setMap} className="map__mapContainer" center={[46, 2]} zoom={5}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {filteredCasinos?.map((casino, key) => {


            return <Marker position={[ casino.latitude, casino.longitude]} key={key}>
              <Popup>
                <h4>{casino.nom}</h4>
                <p>{casino.horaires ? casino.horaires[index__date].ouverture : undefined} : {casino.horaires ? casino.horaires[index__date].fermeture : undefined}</p>
                <div className="map__popUp" onClick={(e) => navigate(`../casinos/${casino._id}`)}>
                  More ...
                </div>
              </Popup>
            </Marker>

          })}
        </MapContainer>


      </div>
    </div>
  );
}