

export interface propsHeaderComponent {
    data : {
        casinoName : String, 
        casinoAdresse : String, 
    }

    functions? : {

    }
}

export interface propsCasinoInfo {
    
    name: string,
    adresse: string,
    region: string,
    groupe: string,
    departement: string,
    ville: string,
    machines: number,
    tables: number,
    restaurant: boolean,
    betting: boolean,
    poker: boolean,
    hotel: boolean,
    parking: boolean,
    desc: string[],
    images: string[],
    tournamentsId: string[],
    tablesId: string[],
    trendsId: string[],
    eventsId: string[],
    machinesId: string[],
    hours: { day: string, opening: string, ending: string }[],
    games: string[],

  }

export interface propsMachine {
    jackpot : number, 
    game : string, _id  : string
}

export interface propsTable {
    open : boolean, 
    game : string, 
    _id  : string
}

export interface propsEvent {
    desc? : string, 
    title : string, 
    img? : string,
     _id : string,
      date : string, 
      opening? : string,
       ending? : string
}
export interface propsTournament {
    desc? : string,
    title : string, 
    img? : string,
    _id : string, 
    type : 'regular'|"exceptional", 
    blind? : number, 
    date :  string, 
    opening? : string, 
    ending? : string 
}

export interface propsCasinoManager {

    data : {

        casinoInfo : propsCasinoInfo,  

    }
    
    functions : {

        handleCasinoChange : (event: React.FormEvent<HTMLInputElement>) => void, 
        updateCasinoInfo : () => void,

    }   
    
}

export interface propsImagesManager{
    data : {
        casinoInfo : propsCasinoInfo
    }

    functions : {

        uploadImage : (file : File) => void, 

        deleteImage : (url : string) => void, 

    }
}


export interface propsMachinesManager{

    data : {
        machines : propsMachine[],
    }

    functions : {
        
        createMachine : (jackpot : number, game : string) => void, 

        deleteMachine :  (machineId : string) => void, 

    }

}

export interface propsTableManager{
    data : {
        tables : propsTable[]
    }

    functions : {

        deleteTable : (tableId : string) => void,
        createTable : (open :  boolean, game : string) => void
        updateTable : (tableId : string, open? :  boolean, game? : string) => void


    }
}   

export interface propsTableCardComponent  {

    data : {
      open : boolean, 
      game : string,
       _id  : string
    }
  
    functions : {
  
      updateTable : (tableId: string, open?: boolean , game?: string ) => void
  
      deleteTable : (_id : string) => void
  
    }
  
  }


export interface propsEventManager{
    data : {
        events : propsEvent[]
    }

    functions : {

        deleteEvent : (EventId : string) => void,
        createEvent : (date :  string, title : string) => void

    }
}


export interface propsTournamentManager {
    
    data : {
        tournaments : propsTournament[]
    }

    functions : {
        deleteTournament : (TournamentId : string) => void,
        createTournament : (title:  string, type: "regular"|"exceptional", date : string) => void
    }
}
