import { useContext, useMemo, useState} from 'react'
import ApiContext from '../context/ApiContext'
import { propsCasino } from '../interfaces'
import CasinoCard from './CasinoCard'
import "./CasinosManagementComponent.css"
import SearchBar from './SearchBar'

function CasinosManagementComponent() {

  const {casinos} = useContext(ApiContext)
  const [query, setQuery] = useState<string | undefined>()

  const filter = (query : string | undefined) => {

    if(query){

    return casinos.filter((casino) => {
      return casino.adresse?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || casino.departement?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      casino.groupe?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || casino.region?.toLocaleLowerCase().includes(query.toLocaleLowerCase())|| 
      casino.ville?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || casino.nom.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })

  }

  else {
     return casinos
  }

  }

  const filteredCasinos = useMemo(() => filter(query), [query, casinos]);

  return (
    <div className='casinosManagementComponent'>
        <h2>Manage the casinos</h2>
        <div className='casinosManagementComponent_searchbar'>
            <SearchBar data={{query : query}} functions={{setQuery : setQuery}}/>
        </div>
        <div className='casinosManagementComponent_casinosList'>
            <CasinoCard data={{newCasinoCard : true}} functions={{}}/>
            {filteredCasinos.map((casino, key) => {

              return  <CasinoCard data={{name : casino.nom, adresse : casino.adresse, casinoId:casino._id}} functions={{}} key={key}/>
            })

            }

        </div> 
    </div> 
  ) 
} 
 
export default CasinosManagementComponent 