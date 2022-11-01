import "./SearchBar.css"
import { propsSearchBar } from '../interfaces'

function SearchBar(props : propsSearchBar) {

  const handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    props.functions.setQuery(event.target.value)
  }


  return (

      <div className='searchBar'>

        <input type={'text'} placeholder="Chercher un casino, une ville, un groupe ..."  onChange={handleOnChange} value={props.data.query? props.data.query : ''}/>

      </div>
  )
}

export default SearchBar
