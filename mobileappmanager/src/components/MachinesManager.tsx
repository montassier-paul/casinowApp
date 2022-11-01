import "./MachinesManager.css"
import { useState } from "react"
import { propsMachinesManager } from "../interfaces/interfaces";


const MachinesManager = (props : propsMachinesManager) => {

  const { data, functions } = props;

  const [machine, setMachine] = useState<{ game: string, jackpot: number }>({ game: '', jackpot: 0 })




  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (machine.game.length > 0) {
      functions.createMachine(machine.jackpot, machine.game)
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setMachine(prev => ({
      ...prev,
      [name]: value
    })
    )
  }




  return (
    <main className="main-machines-manager">

      <div className="machines-manager-title">
        <h2>
          Manage casino's machines
        </h2>
      </div>

      <div className="machines-manager">
        <div className="new-machine-form">

          <form onSubmit={handleSubmit}>
            <div className="add-machine">
              <label className="machine-input">
                Game :
                <input type="text" name="game" value={machine.game} onChange={handleChange} className='input-field-machine-manager' />
              </label>
              <label className="machine-input">
                Jackpot initial :
                <input type="number" name="jackpot" value={machine.jackpot} onChange={handleChange} className='input-field-machine-manager' />
              </label>
              <input type="submit" value="create machine"  className="new-machine-button"/>
            </div>
          </form>


        </div>
        <div className="machines-gallerie">
          {data.machines?.map((machine, key) => {
            return <div className="machine-card" key={key}>
              <p>{machine.game}</p>
              <p>{machine.jackpot} €</p>
              <button onClick={() => functions.deleteMachine(machine._id)} className="delete-button-machine-manager">
                delete machine
              </button>
            </div>
          })
          }
        </div>
      </div>
    </main>
  )
}

export default MachinesManager


