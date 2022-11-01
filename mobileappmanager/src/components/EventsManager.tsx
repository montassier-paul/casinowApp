import "./EventsManager.css"
import { useState } from "react"
import { propsEventManager } from "../interfaces/interfaces"


const EventsManager = (props: propsEventManager) => {

  const { data, functions } = props
  const [event, setEvent] = useState<{ title: string, date: string }>({ title: '', date: new Date().toISOString().split('T')[0] })

  const minDate = new Date().toISOString().split('T')[0]



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (event.title.length > 0) {
      functions.createEvent(event.date, event.title)
      setEvent({ title: '', date: new Date().toISOString().split('T')[0] })
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setEvent(prev => ({
      ...prev,
      [name]: value
    })
    )

  }




  return (
    <main className="main-manager-events">

      <div className="events-manager-title">
        <h2>
          Manage casino's Events
        </h2>
      </div>

      <div className="events-manager">
        <div className="new-event-form">
          <form onSubmit={handleSubmit}>
            <div className="add-event">
              <label className="event-input">
                Title :
                <input type="text" name="title" value={event.title} onChange={handleChange} className='input-field-event-manager' />
              </label>
              <label className="event-input">
                date :
                <input type="date" value={event.date} name="date" onChange={handleChange} min={minDate} className='hours-field-event-manager' />
              </label>
              <input type="submit" value="create event" className="new-event-button" />
            </div>
          </form>


        </div>
        <div className="events-gallerie">
          {data.events?.map((event, key) => {
            return <div className="event-card" key={key}>
              <p>{event.title}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <button onClick={() => functions.deleteEvent(event._id)} className="delete-button-event-manager">
                delete event
              </button>
            </div>
          })
          }
        </div>
      </div>
    </main>
  )
}

export default EventsManager