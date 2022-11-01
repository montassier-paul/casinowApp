export interface propsHeader{
    data? : {
        
    }

    functions? : {

    }

    
}


export interface propsSearchBar{
    data : {
        query : string | undefined; 
    }

    functions : {

        setQuery : (query : string) => void

    }
}


export interface propsCasinoCard {

    data : {
        name? : string; 
        adresse? : string; 
        newCasinoCard? : boolean; 
        casinoId? : string; 
    }

    functions : {

    }

}

export interface propsGame {
    nom : string, 
    type? : "machine"|"table"; 
    desc? : string; 
    nombre? : number

}


export interface propsGameCard {

    data :  propsGame
    

    functions : {
        handleDeleteGame : (Game : propsGame) => void, 
    }
}

export interface propsMessagesManagementComponent {

     data : {
        
        deletedMessages : string[]
    }

    functions : {

        handleDeleteMessages : (messageId : string) => void


    }

}

export interface propsButton_DUC  {
    data : {
        context: "delete" | 'update' | "create" | "new"| "add"|"cancel"|"save"
    }

    functions : {

        handleOnClick : () => void

    }

}


export interface propsImageCard  {
    data : {
       imageFile? : File, 
       imageUrl? :  string
    }

    functions : {

        handleRemoveImage : (imageToRemove : File | string) => void

    }

}


export interface propsMessageCard  {
    data : propsMessage

    functions : {

        handleDelete? : (Message : propsMessage) => void

    }

}

export interface propsMessage  {
    nom : string; 
    email : string; 
    message : string;
    date : Date; 
    _id : string; 
 }

export const init_horaires = [{jour : "Lundi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Mardi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Mercredi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Jeudi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Vendredi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Samedi", ouverture : "00:00", fermeture : "00:00"},
{jour : "Dimanche", ouverture : "00:00", fermeture : "00:00"},]

export interface propsCasino {

    nom: string,
    _id?: string, 
    adresse?: string,
    longitude? : number, 
    latitude? : number, 
    region?: string,
    ville?: string,
    departement?: string,
    groupe?: string,
    machines_nombre?:number,
    tables_nombre?:number,
    jeux?: {nom : string, type? : "machine"|"table", desc? : string, nombre? :number}[],
    // horaires?: {jour : string, ouverture : string, fermeture : string}[], 
    horaires: typeof init_horaires,
    images?: string[],
    poker?:boolean,
    paris?:boolean,
    hotel?:boolean,
    restaurant?:boolean,
    parking?:boolean,
    link? : string, 
    desc?: string,
    score? : {somme :number, votes :number }      

}


export interface propsHandleChange {
    name : string, 
    value : string | boolean, 
    context?:string, 
    day?: string
}

export interface propsInfoComponent {


    data : {
        casino : propsCasino, 
    }

    functions : {
        handleChange : (props : propsHandleChange) => void
    }
    
    
}


export interface propsGamesManagementComponent {


    data : {
        casino : propsCasino, 
    }

    functions : {
        handleChange : (newGame: propsGame) => void, 
        handleDeleteGame : (Game : propsGame) => void
    }
    
    
}


export interface propsCasinoImagesComponent {


    data : {
        newImages : File[] | [], 
        images? : string[]
    }

    functions : {

        handleAddImage : (newImage : File) => void, 
        handleRemoveImage : (imageToRemove : File | string ) => void 

    }
    
    
}


export interface propsModal {

    data : {

    }

    functions : {

        handleOnClick : () => void; 
        handleClose : (boolean : boolean) => void; 

    }
}


export interface propsWebsiteData {

    homePageBand? : {image : string, texte : string, position : 'left' | 'center' | 'right'}[], 
    conditions? : string,   
    learnGames? : {titre : string, contenu : string}[], 

}