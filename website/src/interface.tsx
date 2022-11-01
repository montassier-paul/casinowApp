

export interface propsButton {
    data : {
        text? : string

    }

    functions : {

        handleOnClick? : () => void

    }
}

export interface propsSearchBar {
    
    data : {
        placeholder? : string, 
        query? : string
    }

    functions : {

        onChange? : (newQuery : string) => void
    }
}


export interface propsCasinoCard {

    data : {

        context : "big" | 'small', 
        casinoId? : string, 
        name?:string, 
        adresse?:string, 
        longitude? : number, 
        latitude?: number, 
        img? : string, 
        ouverture?: string, 
        fermeture? : string

    }

    functions : {

        handleMoveTo? : (latitude : number, longitude : number) => void, 

    }
}

export interface propsCasino {

    nom: string,
    _id: string, 
    adresse?: string,
    region?: string,
    ville?: string,
    departement?: string,
    groupe?: string,
    machines_nombre?:number,
    tables_nombre?:number,
    latitude? : number, 
    longitude? : number, 
    jeux?: {nom : string, type? : "machine"|"table", desc? : string, nombre? :number}[],
    horaires?: {jour : string, ouverture : string, fermeture : string}[], 
    images?: string[],
    poker?:boolean,
    paris?:boolean,
    hotel?:boolean,
    restaurant?:boolean,
    parking?:boolean,
    desc?: string,
    score? : {somme :number, votes :number }      

}


export interface propsStateCasinos {

    status : "idle" |'pending' | "complete" | "failed", 
    casinos : propsCasino[] | null

}


export interface propsStateUser {
    queryCasino : string, 
    queryGame : string

    
}

export interface propsGameCard {
    nom : string,
    type? : "machine"|"table", 
    desc? : string, 
    nombre? :number
}

export interface propsMessage {

    nom : string; 
    email? : string; 
    message? : string;
    date? : Date; 
    _id : string; 

}
export interface propsStateMessages {

    status :  'pending' | "complete" | "failed",
    messages : propsMessage[] | null 
}

export interface propsNoteCard {
    somme? : number, 
    votes? : number
}

export interface propsLearn {
    
    titre : string, 
    text? : string, 
    video? : string
    image? : string
}

export interface propsWebsiteData {

    homePageBand? : {image : string, texte : string, position : 'left' | 'center' | 'right'}[], 
    conditions? : string,   
    learnGames? : {titre : string, contenu : string}[], 

}

export interface propsStateWebsiteData{

    websiteData : propsWebsiteData | null 
    status : "idle" |'pending' | "complete" | "failed", 

}
