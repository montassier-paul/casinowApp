import './TournamentsManager.css'
import { useState } from "react"
import { propsTournamentManager } from '../interfaces/interfaces'


const TournamentsManager = (props: propsTournamentManager) => {

  const { data, functions } = props

  const [tournament, setTournament] = useState<{ title: string, date: string, type: "regular" | "exceptional" }>({ title: '', date: new Date().toISOString().split('T')[0], type: "regular" })
  const minDate = new Date().toISOString().split('T')[0]



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (tournament.title.length > 0) {
      functions.createTournament(tournament.title, tournament.type, tournament.date)
      setTournament({ title: '', date: new Date().toISOString().split('T')[0], type: "regular" })
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;


    setTournament(prev => ({
      ...prev,
      [name]: value
    })
    )


  }




  return (
    <main className="main-manager-tournaments">

      <div className="tournaments-manager-title">
        <h2>
          Manage casino's Tournaments
        </h2>
      </div>

      <div className="tournaments-manager">
      <div className="new-tournament-form">
        <form onSubmit={handleSubmit}>
          <div className="add-tournament">
            <label className="tournament-input">
              Title :
              <input type="text" name="title" value={tournament.title} onChange={handleChange}   className='input-field-tournament-manager'/>
            </label>

            <label className="tournament-input">Tournaments type:
              <select name="type" onChange={handleChange} className='tournament-dropdown'>
                <option value="regular">regular</option>
                <option value="exceptional">exceptional</option>
              </select>
            </label>

            {tournament.type === "regular"
              ? <label className="tournament-input">date :
                <select name="date" className='tournament-dropdown'>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesay</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </label>
              : <label className="tournament-input">
                date :
                <input type="date" value={tournament.date} name="date" onChange={handleChange} min={minDate} className='hours-field-tournament-manager' />
              </label>
            }

            <input type="submit" value="create tournament" className="new-tournament-button"  />
          </div>
        </form>


      </div>
      <div className="tournaments-gallerie">
        {data.tournaments?.map((tournament, key) => {
          return <div className="tournament-card" key={key}>
            <p>{tournament.title}</p>
            <p>{tournament.type}</p>
            <p>{new Date(tournament.date).toLocaleDateString()}</p>
            <button onClick={() => functions.deleteTournament(tournament._id)} className="delete-button-tournament-manager">
              delete tournament
            </button>
          </div>
        })
        }
      </div>
      </div>
    </main>
  )
}

export default TournamentsManager