
import { ImageSourcePropType } from 'react-native'
import { RefObject } from 'react';
import { RootStackParamList } from "../screens";
import Carousel from "react-native-anchor-carousel"

export interface propsCasinosCard {
    data: {
        _id: string,
        name: string,
        adresse: string,
        region?: string,
        departement?: string,
        ville?: string,
        machines?: number,
        tables?: number,
        restaurant?: boolean,
        parking?: boolean,
        betting?: boolean,
        poker?: boolean,
        hotel?: boolean,
        desc?: string,
        images: string[],
        hours: { day: string, opening: string, ending: string }[]
    },

    handleClickCard: (input?: string) => void,

}

export interface propsServiceCard {
    data: {
        img?: ImageSourcePropType,
        text: string,
        bool?: boolean,
        textsize?: number,
        dimension?: number
    }
}

export interface propsHoursCard {
    data: { hours: { day: string, opening: string, ending: string }[] }
}

export interface propsGamesCard {
    data: {
        games: { game: string, numbers: number }[]
    }
}

export interface propsMachine {

    casinoId: string,
    jackpot: number,
    _id: string,
    game: string,
    CasinoName?: string,
    CasinoAdresse?: string,

}

export interface propsTable {
    casinoId: string,
    open: boolean,
    game: string,
    _id: string,
    CasinoName?: string,
    CasinoAdresse?: string,

}

export interface propsTrend {

    desc?: string,
    img?: string,
    date?: string,
    title: string,
    casinoId: string,


}

export interface propsCasinoRequestAutocompleteSearchBar {
    names: string[],
    adresses: string[],
    regions: string[],
    groupes: string[],
    departements: string[],
    villes: string[]

}

export interface propsGameRequestAutocompleteSearchBar {
    games: string[],
    tables: string[],


}



// interface used by components

export interface propsSearch {
    // used by : Search.tsx, 
    data: {
        text?: string,
        context?: string
        suggestionData?: string[]
    }
    handleSearch: (value: string, context?: string) => void,
}

export interface propsPicker {
    // used by : Picker.tsx,

    data: {
        date: string
        dates: string[]
    }

    setDate: (value: string) => void

}

export interface propsHomeMenuCard {
    // used by : Card.tsx,
    data: {
        img: ImageSourcePropType,
        title: string,
        right?: number,
        bottom?: number,
        color?: string,
        navigationPage: keyof RootStackParamList
    }
}

export interface propsUserFollowingsCard {
    // used by : Card.tsx,
    data: {
        casinoId?: string;
        casinoName?: string;
        casinoAdresse?: string;
        purpose?: "jackpot"|"events"|"tournaments";
    }
    handleUnfollow: ({ casinoId, purpose }: { casinoId?: string, purpose?: "jackpot"|"events"|"tournaments" }) => void
}

export interface propsFollowFollowingsUser {
    //used by : CasinoScreen.tsx
    casinoId: string,
    casinoName: string,
    casinoAdresse: string,
    purpose: "jackpot"|"events"|"tournaments"
  
}

export interface propsUnfollowFollowingsUser {
    //used by : UserFollowings.tsx, CasinoScreen.tsx
    casinoId?: string,
    purpose?: "jackpot" | "events" | "tournaments"

}

export interface propsUserInfoCard {
    // used by : Card.tsx,
    data: { input: string, context: string }
    handleRemove: (input: string) => void,

}

export interface propsDirectButton {
    // used by : Button.tsx,
    data: {
        input: string
    }

    handlePress: () => void
}

export interface propsCircleButton {
    // used by : Button.tsx,
    data: {
        img: ImageSourcePropType
    }

    handlePress: () => void
}

export interface propsTournamentView {
    // used by : TournamentView.tsx
    data: {
      tournamentStyle: "regular" | "exceptional"
    }
  
    handleQuitClick: () => void
}

export interface propsCasino {
    // used by : tournamentView.tsx, GamesMain.tsx, EventMain.tsx, CasinosMain
    _id: string,
    name: string,
    adresse: string,
    region?: string,
    departement?: string,
    ville?: string,
    machines?: number,
    tables?: number,
    restaurant?: boolean,
    parking?: boolean,
    betting?: boolean,
    poker?: boolean,
    hotel?: boolean,
    desc?: string,
    images: string[],
    tournamentsId: string[],
    tablesId: string[],
    trendsId: string[],
    eventsId: string[],
    machinesId: string[],
    hours: { day: string, opening: string, ending: string }[],
    games: { game: string, numbers: number }[],
    timestamps?: Date
}

export interface propsTournament {
    // used by : tournamentView.tsx, CasinoScreen.tsx
    desc?: string,
    title: string,
    _id: string,
    img?: string,
    type: string,
    blind?: number,
    filterDate: string,
    casinoId: string,
    date: Date,
    opening?: string,
    ending?: string,
    CasinoName?: string,
    CasinoAdresse?: string,

}

export interface propsTournamentCard {
    // used by : Card.tsx,
    data: {
        desc?: string,
        title: string,
        _id: string,
        img?: string,
        type: string,
        blind?: number,
        filterDate: string
        casinoId: string,
        date: Date,
        opening?: string,
        ending?: string,
        CasinoName?: string,
        CasinoAdresse?: string,
    }
}

export interface propsGame {
    // used by GamesMain, DirectMain.tsx, CasinoScreen.tsx
    casinoId: string,
    jackpot?: number,
    _id: string,
    game: string,
    open?: boolean,
    CasinoName?: string,
    CasinoAdresse?: string,


}

export interface propsEvent {
    // used by : EventMain.tsx, CasinoScreen.tsx
    desc?: string,
    title: string,
    month: string,
    _id: string,
    img?: string,
    casinoId: string,
    date: Date,
    opening?: string,
    ending?: string,
    CasinoName?: string,
    CasinoAdresse?: string,
}

export interface propsEventCard {
    // used by : Card.tsx
    data: {
        desc?: string,
        title: string,
        month: string,
        _id: string,
        img?: string,
        casinoId: string,
        date: Date,
        opening?: string,
        ending?: string,
        CasinoName?: string,
        CasinoAdresse?: string,
    }

}

export interface propsMachineCard {
    // used by : Cards.tsx
    data: {
        casinoId: string,
        jackpot: number,
        _id: string,
        game: string,
        CasinoName?: string,
        CasinoAdresse?: string,
    }

}

export interface propsTableCard {
    // used by : Cards.tsx
    data: {
        casinoId: string,
        open: boolean,
        game: string,
        _id: string,
        CasinoName?: string,
        CasinoAdresse?: string,
    }


}

export interface propsCasinoScreen {
    // used by : casinoScreen.tsx

    data?: {
      _id: string,
      name: string,
      adresse: string,
      region?: string,
      departement?: string,
      ville?: string,
      machines?: number,
      tables?: number,
      restaurant?: boolean,
      parking?: boolean,
      betting?: boolean,
      poker?: boolean,
      hotel?: boolean,
      desc?: string,
      images: string[],
      tournamentsId: string[],
      tablesId: string[],
      trendsId: string[],
      eventsId: string[],
      machinesId: string[],
      hours: { day: string, opening: string, ending: string }[],
      games: { game: string, numbers: number }[],
      timestamps?: Date
    }
  
    handleQuit: () => void,
  
  
  
}

export interface propsFollowCard {
    //used by : Card.tsx
    data: {
        id: string,
        Name: string,
        adresse: string,
        purpose: "jackpot" | "events" | "tournaments",
        text: string,
        userFollowings: {
            casinoId?: string,
            casinoName?: string,
            casinoAdresse?: string,
            purpose?: "jackpot" | "events" | "tournaments"
        }[]


    },

    handleFollow: ({ casinoId, casinoName, casinoAdresse, purpose }: {
        casinoId: string, casinoName: string,
        casinoAdresse: string, purpose: "jackpot" | "events" | "tournaments"
    }) => void
    handleUnfollow: ({ casinoId, purpose }: { casinoId: string, purpose: "jackpot" | "events" | "tournaments"}) => void
}

export interface propsCarouselItem {
    // used by CasinoScreen.tsx
    item: string, index: number, carouselRef: RefObject<typeof Carousel> 
}



// states interface used by redux

export interface touramentsState {
    isLoading: boolean,
    hasErrors: boolean,
    tournamentsData: propsTournament[],
    // check if still data on the server => used in scrolling 
    tournamentsStillData: boolean,

}

export interface SearchState {
    isLoading: boolean,
    hasErrors: boolean,
    CasinosSearchData: propsCasinoRequestAutocompleteSearchBar,
    GamesSearchData: propsGameRequestAutocompleteSearchBar,
    test: string

}

export interface gamesState {
    isLoading: boolean,
    hasErrors: boolean,
    gamesData: propsGame[],
    // manage if still data on server => user by scrolling
    machinesStillData: boolean,
    tablesStillData: boolean,
    machinesLength: number,
    tablesLength: number,


}

export interface eventsState {
    isLoading: boolean,
    hasErrors: boolean,
    eventsData: propsEvent[],
    // check if still data on the server => used in scrolling 
    eventsStillData: boolean,
}

export interface casinosState {
    isLoading: boolean,
    hasErrors: boolean,
    casinosData: propsCasino[],

}

export interface userState {
    isLoading: boolean,
    hasErrors: boolean,
    firstName: string,
    familyName: string,
    numTel: string,
    smsBool: boolean,


    followings: {
        casinoId?: string,
        casinoName?: string,
        casinoAdresse?: string,
        purpose?: "jackpot" | "events" | "tournaments"
    }[]

}


// API interface

export enum ContextTypes {
    events = 'events',
    tournaments = 'tournaments',
    researchBar = "researchBar",
    casinos = "casinos",
    games = "games",
    user = "user"
}

export interface propsParams {
    // request params
    casinoData?: number,
    limit?: number,
    offset?: number,
    q_game?: string,
    q_casinoId?: string[],
    q_month?: string,
    q_type?: string,
    q_filterDate?: string

}

export interface propsUserApi {

    remote? : boolean, 
    context : "follow" | 'unfollow' | "delete" | 'update' 
    casinoId? : string, 
    purpose? : "jackpot" | "events" | "tournaments", 
    numTel? : string, 
    followings? : userState["followings"]
    body? : { firstName: string,
            familyName: string,
            numTel: string,
    }
    casinoName?:string, 
    casinoAdresse?:string

}

export interface propsData {
    // to manage api
    url?: string,
    params?: propsParams,
    addData?: boolean,
    context: ContextTypes,
    step?: number, 
    userApiParams? : propsUserApi
}
