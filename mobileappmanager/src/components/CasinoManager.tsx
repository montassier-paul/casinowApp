import "./CasinoManager.css"
import { propsCasinoManager } from "../interfaces/interfaces"
import MediaQuery from 'react-responsive'

const CasinoManager = (props: propsCasinoManager) => {

  const { data, functions } = props


 

  return (
    <main className="main-casino-manager">

      <div className="casino-title">
        <h2>
          Manage casino info : {data.casinoInfo.name}
        </h2>
      </div>

      <MediaQuery minWidth={850}>
      <div className="casino-form">   
      <div>
        <label className="casino-input">
          Name :
          <input type="text" name="name" value={data.casinoInfo.name} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Adresse :
          <input type="text" name="adresse" value={data.casinoInfo.adresse} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Departement :
          <input type="text" name="departement" value={data.casinoInfo.departement} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Ville :
          <input type="text" name="ville" value={data.casinoInfo.ville} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Region :
          <input type="text" name="region" value={data.casinoInfo.region} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Groupe :
          <input type="text" name="groupe" value={data.casinoInfo.groupe} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Description :
          <input type="text" name="desc" value={data.casinoInfo.desc} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Restaurant :
          <input type="checkbox" checked={data.casinoInfo.restaurant} name="restaurant" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Paris Sportif :
          <input type="checkbox" checked={data.casinoInfo.betting} name="betting" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Hôtel :
          <input type="checkbox" checked={data.casinoInfo.hotel} name="hotel" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Parking :
          <input type="checkbox" checked={data.casinoInfo.parking} name="parking" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Poker :
          <input type="checkbox" checked={data.casinoInfo.poker} name="poker" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>



      </div>
      <div>
        <label className="casino-input-hours">
          Monday :
          from
          <input type="time" name="Monday-opening" value={data.casinoInfo.hours[0].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Monday-ending" value={data.casinoInfo.hours[0].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Tuesday : 
          from 
          <input type="time" name="Tuesday-opening" value={data.casinoInfo.hours[1].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Tuesday-ending" value={data.casinoInfo.hours[1].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Wednesday : 
          from
          <input type="time" name="Wednesday-opening" value={data.casinoInfo.hours[2].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Wednesday-ending" value={data.casinoInfo.hours[2].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

         
        <label className="casino-input-hours">
        Thursday : 
          from
          <input type="time" name="Thursday-opening" value={data.casinoInfo.hours[3].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Thursday-ending" value={data.casinoInfo.hours[3].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

         
        <label className="casino-input-hours">
        Friday :
          from
          <input type="time" name="Friday-opening" value={data.casinoInfo.hours[4].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager" />
          to
          <input type="time" name="Friday-ending" value={data.casinoInfo.hours[4].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Saturday :
          from
          <input type="time" name="Saturday-opening" value={data.casinoInfo.hours[5].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Saturday-ending" value={data.casinoInfo.hours[5].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Sunday :
          from
          <input type="time" name="Sunday-opening" value={data.casinoInfo.hours[6].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to 
          <input type="time" name="Sunday-ending" value={data.casinoInfo.hours[6].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        </div>

        <div>
        <button onClick={functions.updateCasinoInfo} className="update-button-casino-manager">
          Update Casino info
        </button>
        </div>
      </div>
      </MediaQuery>


      <MediaQuery maxWidth={850}>
      <div className="casino-form-small-screen">   
      <div>
        <label className="casino-input">
          Name :
          <input type="text" name="name" value={data.casinoInfo.name} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Adresse :
          <input type="text" name="adresse" value={data.casinoInfo.adresse} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Departement :
          <input type="text" name="departement" value={data.casinoInfo.departement} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Ville :
          <input type="text" name="ville" value={data.casinoInfo.ville} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Region :
          <input type="text" name="region" value={data.casinoInfo.region} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Groupe :
          <input type="text" name="groupe" value={data.casinoInfo.groupe} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Description :
          <input type="text" name="desc" value={data.casinoInfo.desc} onChange={functions.handleCasinoChange} className='input-field-casino-manager' />
        </label>

        <label className="casino-input">
          Restaurant :
          <input type="checkbox" checked={data.casinoInfo.restaurant} name="restaurant" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Paris Sportif :
          <input type="checkbox" checked={data.casinoInfo.betting} name="betting" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Hôtel :
          <input type="checkbox" checked={data.casinoInfo.hotel} name="hotel" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Parking :
          <input type="checkbox" checked={data.casinoInfo.parking} name="parking" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>

        <label className="casino-input">
          Poker :
          <input type="checkbox" checked={data.casinoInfo.poker} name="poker" onChange={functions.handleCasinoChange} className='checkbox-field-casino-manager' />
        </label>



      </div>
      <div>
        <label className="casino-input-hours">
          Monday :
          from
          <input type="time" name="Monday-opening" value={data.casinoInfo.hours[0].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Monday-ending" value={data.casinoInfo.hours[0].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Tuesday : 
          from 
          <input type="time" name="Tuesday-opening" value={data.casinoInfo.hours[1].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Tuesday-ending" value={data.casinoInfo.hours[1].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Wednesday : 
          from
          <input type="time" name="Wednesday-opening" value={data.casinoInfo.hours[2].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Wednesday-ending" value={data.casinoInfo.hours[2].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

         
        <label className="casino-input-hours">
        Thursday : 
          from
          <input type="time" name="Thursday-opening" value={data.casinoInfo.hours[3].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Thursday-ending" value={data.casinoInfo.hours[3].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

         
        <label className="casino-input-hours">
        Friday :
          from
          <input type="time" name="Friday-opening" value={data.casinoInfo.hours[4].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager" />
          to
          <input type="time" name="Friday-ending" value={data.casinoInfo.hours[4].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Saturday :
          from
          <input type="time" name="Saturday-opening" value={data.casinoInfo.hours[5].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to
          <input type="time" name="Saturday-ending" value={data.casinoInfo.hours[5].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        <label className="casino-input-hours">
        Sunday :
          from
          <input type="time" name="Sunday-opening" value={data.casinoInfo.hours[6].opening} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
          to 
          <input type="time" name="Sunday-ending" value={data.casinoInfo.hours[6].ending} onChange={functions.handleCasinoChange} className="hours-field-casino-manager"/>
        </label>

        
        </div>

        <div>
        <button onClick={functions.updateCasinoInfo} className="update-button-casino-manager">
          Update Casino info
        </button>
        </div>
      </div>
      </MediaQuery>
    </main>
  )
}

export default CasinoManager