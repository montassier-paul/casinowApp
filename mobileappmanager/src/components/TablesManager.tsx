import "./TablesManager.css"
import { useState } from "react"
import { propsTableCardComponent, propsTableManager } from "../interfaces/interfaces"




const TableComponent = (props: propsTableCardComponent) => {

  const { data, functions } = props

  const [update, setUpdate] = useState(false)
  const [table, setTable] = useState<{ game: string, open: boolean }>({ game: data.game, open: data.open })

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    if (name === "game") {

      setTable(prev => ({
        ...prev,
        [name]: value
      })
      )

    }
    if (name === "open") {

      setTable(prev => ({
        ...prev,
        [name]: !prev[name]
      })
      )
    }


  }

  const handleSubmit = () => {
    setUpdate(prev => !prev)
    functions.updateTable(data._id, table.open, table.game)
  }



  return (
    <>
      {update
        ? <div className="table-card">
            <form onSubmit={handleSubmit}>
            <label className="table-input">
              Game :
              <input type="text" name="game" value={table.game} onChange={handleChange} className='input-field-table-manager' />
            </label>
            <label className="table-input">
              Open :
              <input type="checkbox" checked={table.open} name="open" onChange={handleChange} className='input-field-table-manager' />
            </label>
            <input type="submit" value="update" className="table-manager-button" />
            </form>
          </div>


        : <div className="table-card">
          <p>{table.game}</p>
          {table.open
            ? <p>Table is open</p>
            : <p>Table is close</p>
          }
          <button onClick={() => functions.deleteTable(data._id)} className="table-manager-delete-button">
            delete table
          </button>

          <button onClick={() => setUpdate(prev => !prev)} className="table-manager-delete-button">
            update table
          </button>
        </div>

      }
    </>
  )
}

const TablesManager = (props: propsTableManager) => {



  const { data, functions } = props

  const [table, setTable] = useState<{ game: string, open: boolean }>({ game: '', open: false })



  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (table.game.length > 0) {
      functions.createTable(table.open, table.game)
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    if (name === "game") {

      setTable(prev => ({
        ...prev,
        [name]: value
      })
      )

    }
    if (name === "open") {

      setTable(prev => ({
        ...prev,
        [name]: !prev[name]
      })
      )
    }


  }



  return (
    <main className="main-table-manager">

      <div className="tables-manager-title">
        <h2>
          Manage casino's tables
        </h2>
      </div>

      <div className="tables-manager">
        <div className="new-table-form">
          <form onSubmit={handleSubmit}>
            <div className="add-table">
              <label className="table-input">
                Game :
                <input type="text" name="game" value={table.game} onChange={handleChange} className='input-field-table-manager' />
              </label>
              <label className="table-input">
                Open:
                <input type="checkbox" checked={table.open} name="open" onChange={handleChange} />
              </label>
              <input type="submit" value="create table" className="table-manager-button" />
            </div>
          </form>


        </div>
        <div className="tables-gallerie">
          {data.tables?.map((table, key) => {
            return <TableComponent key={key} data={{ open: table.open, game: table.game, _id: table._id }} functions={{ updateTable: functions.updateTable, deleteTable: functions.deleteTable }} />

          })
          }
        </div>
      </div>
    </main>
  )
}

export default TablesManager