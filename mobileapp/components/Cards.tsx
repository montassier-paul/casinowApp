import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONT, SIZES } from '../constants'
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../screens";
import axios from 'axios'
import {
  propsHomeMenuCard, propsUserInfoCard, propsUserFollowingsCard, propsServiceCard,
  propsCasinosCard, propsGamesCard, propsHoursCard, propsFollowCard, propsTournament, propsTournamentCard, propsEventCard, propsEvent, propsMachine, propsTable, propsTrend, propsMachineCard, propsTableCard
} from "./interface"

type authScreenProp = StackNavigationProp<RootStackParamList>;

export const TournamentCardById = ({ id }: { id: string }) => {

  const [tournamentData, setTournamentData] = useState<propsTournament>()

  async function getTournament() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/tournaments/tournament/' + id);
      return (response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getTournament().then(data => {
      if (isMounted) setTournamentData(data);    // add conditional check
    })
    return () => { isMounted = false }
  }, []);

  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel
    }}>
      <Text>{tournamentData?.title} : {tournamentData?.date.toString()} {tournamentData?.blind}</Text>
    </View>
  )
}

export const EventCardById = ({ id }: { id: string }) => {

  const [eventData, setEventData] = useState<propsEvent>()

  async function getEvent() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/evenements/evenement/' + id);
      return (response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getEvent().then(data => {
      if (isMounted) setEventData(data);    // add conditional check
    })
    return () => { isMounted = false }
  }, []);


  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel,
    }}>
      <Text>{eventData?.title} : {eventData?.date.toString()}</Text>
    </View>
  )

}

export const TrendCardById = ({ id }: { id: string }) => {

  const [trendData, setTrendData] = useState<propsTrend>()

  async function getTrend() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/trends/trend/' + id);
      return (response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getTrend().then(data => {
      if (isMounted) setTrendData(data);    // add conditional check
    })
    return () => { isMounted = false }
  }, []);


  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel
    }}>
      <Text>{trendData?.title} : {trendData?.date}</Text>
    </View>
  )

}

export const MachineCardById = ({ id }: { id: string }) => {

  const [machineData, setMachineData] = useState<propsMachine>()

  async function getMachine() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/machines/machine/' + id);
      return (response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getMachine().then(data => {
      if (isMounted) setMachineData(data);    // add conditional check
    })
    return () => { isMounted = false }
  }, []);


  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel,
      justifyContent: "center"
    }}>

      <Image
        source={require('../images/icons8-slot-64.png')}
        resizeMode="center"
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{machineData?.game} : {machineData?.jackpot}</Text>
    </View>
  )

}

export const TableCardById = ({ id }: { id: string }) => {

  const [tableData, setTableData] = useState<propsTable>()

  async function getTable() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/tables/table/' + id);
      return (response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getTable().then(data => {
      if (isMounted) setTableData(data);    // add conditional check
    })
    return () => { isMounted = false }
  }, []);


  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel,
      justifyContent: "center"
    }}>

      <Image
        source={require('../images/icons8-poker-53.png')}
        resizeMode="center"
        style={{ width: 20, height: 20, marginRight: 10 }}
      />


      {tableData?.open

        ? <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{tableData?.game} : Open </Text>
        : <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{tableData?.game} : Closed </Text>

      }

    </View>
  )


}


////////////////////////////////////////////////////////////////////////////////////////////

export const HomeMenuCard = ({ data }: propsHomeMenuCard) => {

  // Used by : HomeMain.tsx
  const navigation = useNavigation<authScreenProp>();

  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={() => navigation.navigate(data.navigationPage)}

      style={{
        backgroundColor: COLORS.LightPurple,
        borderRadius: 32,
        margin: 20,
        borderColor: COLORS.DarkPurple,
        borderWidth: 2,
      }}>
      <View
        style={{
          width: "100%",
          height: 200,
          justifyContent: "center",
        }}>
        <Image
          source={data.img}
          resizeMode="center"
          style={{ width: "100%", height: "100%", borderRadius: 30 }}
        />

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            right: data.right,
            bottom: data.bottom,
          }}>
          <Text
            style={{
              fontFamily: FONT.TitleBold,
              fontSize: SIZES.TilteSizeBig,
              letterSpacing: SIZES.TitleSpacing,
              color: data.color ? data.color : COLORS.White,
              textAlign: "center",
            }}>{data.title}</Text>
        </View>

      </View>

    </TouchableOpacity>
  )
}

export const UserFollowingsCard = ({ data, handleUnfollow }: propsUserFollowingsCard) => {

  // Used by : UserFollowings.tsx
  const handleOnPress = () => {

    handleUnfollow({ casinoId: data.casinoId, purpose: data.purpose })
  }

  return (

    <View style={{
      backgroundColor: COLORS.Camel,
      borderRadius: 5,
      borderWidth: 1,
      padding: 5,
      marginHorizontal: 5,
      marginTop: 10,
      flexDirection: "row"

    }}>

      <View style={{
        width: "80%",
        flexDirection: "row",
      }}>
        <View style={{ flexDirection: "column", width: "50%", paddingLeft: 5 }}>
          <Text style={{
            fontSize: SIZES.TextMiddle,
            fontFamily: FONT.Text2
          }}>{data.casinoName}</Text>

          <Text style={{
            fontSize: SIZES.TextSmall,
            fontFamily: FONT.Text2,
            fontStyle: "italic"
          }}>{data.casinoAdresse}</Text>
        </View>


        <Text style={{
          paddingLeft: 5,
          fontSize: SIZES.TextMiddle,
          width: "50%",
          fontFamily: FONT.Text2
        }}>{data.purpose}</Text>
      </View>

      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          width: "20%",
        }}>
        <Image
          source={require("../images/icons8-multiply-60.png")}
          resizeMode="contain"
          style={{ height: 20 }}
        />
      </TouchableOpacity>

    </View>
  );
}

export const UserInfoCard = ({ data, handleRemove }: propsUserInfoCard) => {

  // Used by : UserForm.tsx

  const handleOnPress = () => {
    handleRemove(data.context)
  }

  return (
    <View style={{
      backgroundColor: COLORS.Camel,
      borderWidth: 1,
      borderColor: COLORS.Black,
      borderRadius: 5,
      padding: 5,
      marginTop: 10,
      flexDirection: "row"

    }}>

      <View style={{
        width: "80%"
      }}>
        <Text style={{
          paddingLeft: 5,
          fontFamily: FONT.Text2
        }}>{data.input}</Text>
      </View>

      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          width: "20%",
        }}>
        <Image
          source={require("../images/icons8-multiply-60.png")}
          resizeMode="contain"
          style={{ height: 20 }}
        />
      </TouchableOpacity>

    </View>

  );
}

export const TournamentCard = ({ data }: propsTournamentCard) => {
  
  // used by TournamentView.tsx, CasinoScreen.tsx

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          paddingHorizontal: 5,
          width: '100%',
        }}>

        <View style={{
          width: "40%",
          height: 100,
          alignSelf: "center"
        }}>
          <Image
            source={require("../images/PokerCover.jpg")}
            resizeMode="contain"
            style={{
              height: "100%", width: "100%"
            }} />

        </View>
        <View style={{
          width: "60%",
          paddingLeft: 5,
          paddingTop: 5,
          alignSelf: "center"
        }}>
          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
            fontWeight: "bold"
          }}>{data.title}</Text>

          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle
          }}>{data.type === "regular" ? data.filterDate : new Date(data.date.toString()).toLocaleDateString()}</Text>

          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
            fontWeight: "bold"
          }}>{data.CasinoName}</Text>


          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle
          }}>{data.CasinoAdresse}</Text>

          {data.ending || data.opening &&
            <Text style={{
              fontFamily: FONT.Text1,
              fontSize: SIZES.TextMiddle
            }}>{data.opening} : {data.ending} </Text>
          }

          {data.blind &&

            <Text style={{
              fontFamily: FONT.Text1,
              fontSize: SIZES.TextMiddle
            }}>Blind : {data.blind} </Text>

          }


          {data.desc &&

            <Text>{data.desc}</Text>
          }





        </View>

      </View>
      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />
    </>
  )

}

export const MachineCard = ({ data }: propsMachineCard) => {
  // used by GamesMain.tsx, DirectMain.tsx, CasinoScreen.tsx

  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel,
      justifyContent: "center"
    }}>

      <Image
        source={require('../images/icons8-slot-64.png')}
        resizeMode="center"
        style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }}
      />
      <View style={{ flexDirection: "column", width: "80%" }}>
        <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{data.game} : {data.jackpot}</Text>
        <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextSmall }}>{data.CasinoName} , {data.CasinoAdresse}</Text>
      </View>
    </View>
  )

}

export const TableCard = ({ data }: propsTableCard) => {
  // used by GamesMain.tsx, DirectMain.tsx, CasinoScreen.tsx

  return (
    <View style={{
      width: "80%",
      alignSelf: "center",
      flexDirection: "row",
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
      backgroundColor: COLORS.CamelDunkel,
      justifyContent: "center"
    }}>

      <Image
        source={require('../images/icons8-poker-53.png')}
        resizeMode="center"
        style={{ width: 20, height: 20, marginRight: 10, alignSelf: "center" }}
      />


      {data.open

        ?
        <View style={{ flexDirection: "column", width: "80%" }}>
          <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{data.game} : Open </Text>
          <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextSmall }}>{data.CasinoName} , {data.CasinoAdresse}</Text>
        </View>
        : <View style={{ flexDirection: "column", width: "80%" }}>
          <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{data.game} : Closed </Text>
          <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextSmall }}>{data.CasinoName} , {data.CasinoAdresse}</Text>
        </View>

      }

    </View>
  )

}

export const EventCard = ({ data }: propsEventCard) => {
  // used by : EventMain.tsx, CasinoScreen.tsx

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          paddingHorizontal: 5,
          width: '100%',
        }}>

        <View style={{
          width: "40%",
          height: 100,
          alignSelf: "center",
        }}>
          <Image
            source={require("../images/EventsCover.jpg")}
            resizeMode="contain"
            style={{
              height: "100%", width: "100%"
            }} />

        </View>
        <View style={{
          width: "60%",
          paddingLeft: 5,
          paddingTop: 5,
          alignSelf: "center"
        }}>
          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
            fontWeight: "bold"
          }}>{data.title}</Text>

          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle
          }}>{new Date(data.date.toString()).toLocaleDateString("fr")}</Text>

          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
            fontWeight: "bold"
          }}>{data.CasinoName}</Text>


          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle
          }}>{data.CasinoAdresse}</Text>

          {data.ending || data.opening &&
            <Text style={{
              fontFamily: FONT.Text1,
              fontSize: SIZES.TextMiddle
            }}>{data.opening} : {data.ending} </Text>
          }


          {data.desc &&

            <Text>{data.desc}</Text>
          }
        </View>

      </View>
      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />
    </>
  )

}

export const FollowCard = ({ data, handleFollow, handleUnfollow }: propsFollowCard) => {
  // CasinoScreen.tsx

  const [follow, setFollow] = useState(false)

  useEffect(() => {

    setFollow(false)

    data.userFollowings.map((following) => {
      if (following.casinoId === data.id && following.purpose === data.purpose) {
        setFollow(true)
      }
    })
  }, [data])

  const handleOnPress = () => {
    if (follow) {
      handleUnfollow({ casinoId: data.id, purpose: data.purpose })
    }
    else {
      handleFollow({ casinoId: data.id, casinoName: data.Name, casinoAdresse: data.adresse, purpose: data.purpose })
    }
    setFollow(prev => !prev)
  }

  return (

    <View style={{
      backgroundColor: COLORS.Camel,
      borderRadius: 5,
      borderWidth: 1,
      padding: 5,
      marginHorizontal: 5,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-around"

    }}>


      <Text style={{
        fontFamily: FONT.Text2,
        fontSize: SIZES.TextMiddle,
        width: '70%'
      }}>
        {data.text} :
      </Text>


      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          width: '30%',
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10
        }}>
        {follow
          ? <Text>Unfollow</Text>
          : <Text>Follow</Text>
        }
      </TouchableOpacity>

    </View>

  )
}

export const ServiceCard = ({ data }: propsServiceCard) => {
  // used by : CasinoScreen.tsx

  return (
    <View style={{
      flexDirection: "row",
      width: data.dimension ? data.dimension : 80,
      alignContent: "center",
      alignItems: "center",
    }}>
      <Text style={{
        fontFamily: FONT.Text1,
        fontSize: data.textsize ? data.textsize : SIZES.TextSmall,
      }}>{data.text}</Text>

      <View style={{
        width: '20%',
        height: data.dimension ? data.dimension / 8 : 10,
      }}>
        {data.img &&
          <Image
            source={data.img}
            resizeMode="contain"
            style={{
              height: "100%", width: "auto", borderRadius: 5,
            }} />
        }

        {data.bool === true &&
          <Image
            source={require("../images/icons8-check-mark-button-48.png")}
            resizeMode="contain"
            style={{
              height: "100%", width: "100%", borderRadius: 5,
            }} />
        }

        {data.bool === false &&
          <Image
            source={require("../images/icons8-ban-64.png")}
            resizeMode="contain"
            style={{
              height: "100%", width: "100%", borderRadius: 5
            }} />
        }

      </View>

    </View>
  )
}

export const CasinoCard = ({ data, handleClickCard }: propsCasinosCard) => {
  // used by : CasinosMains.tsx

  const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  var date = dates[new Date().getDay() - 1];
  var opening = ""
  var ending = ""

  data.hours.map((day) => {
    if (day.day === date) {
      opening = day.opening,
        ending = day.ending
    }
  })


  const handleClick = () => {
    handleClickCard(data._id)
  }


  return (
    <View>
      <TouchableOpacity
        onPress={handleClick}
        delayPressIn={50}
        style={{
          flexDirection: "row",
          height: 125,
          paddingVertical: 5,
          paddingHorizontal: 5,
          width: '100%',
        }}>

        <View style={{
          width: "30%",
          height: 100,
          alignSelf: "center"
        }}>
          {data.images.length !== 0
            ? <Image
              source={{ uri: data.images[0] }}
              resizeMode="contain"
              style={{
                height: "100%", width: "auto", borderRadius: 20
              }} />

            : <Image
              source={require("../images/Casino.jpg")}
              resizeMode="contain"
              style={{
                height: "100%", width: "auto", borderRadius: 20
              }} />
          }

        </View>
        <View style={{
          width: "70%",
          paddingLeft: 5,
          paddingTop: 5,
          alignSelf: "center"
        }}>
          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
            fontWeight: "bold"
          }}>{data.name}</Text>

          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle
          }}>{data.adresse}</Text>

          {opening.length !== 0 && ending.length !== 0 &&
            <Text style={{
              fontFamily: FONT.Text1,
              fontSize: SIZES.TextMiddle
            }}>{opening} : {ending}</Text>
          }

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%"
          }}>

            {data.machines !== undefined &&
              <ServiceCard data={{ text: String(data.machines) + "0" + " machines" }} />}

            {data.tables !== undefined &&
              <ServiceCard data={{ text: String(data.tables) + " tables" }} />}

            {data.poker !== undefined &&
              <ServiceCard data={{ text: "Poker", bool: data.poker }} />}

            {data.betting !== undefined &&
              <ServiceCard data={{ text: "Paris Sportif", bool: data.betting }} />}

            {data.hotel !== undefined &&
              <ServiceCard data={{ text: "Hôtel", bool: data.hotel }} />}

            {data.restaurant !== undefined &&
              <ServiceCard data={{ text: "Restaurant", bool: data.restaurant }} />}

            {data.parking !== undefined &&
              <ServiceCard data={{ text: "Parking", bool: data.parking }} />}

            <Text style={{
              fontWeight: "bold"
            }}>...</Text>

          </View>

        </View>

      </TouchableOpacity>
      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />
    </View>
  )
}

export const GamesCard = ({ data }: propsGamesCard) => {
  // used by : CasinoScreen.tsx

  return (
    <View style={{
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap"
    }}>


      {data.games.map((game, key) => {
        return <View style={{
          backgroundColor: COLORS.CamelDunkel,
          borderRadius: 5,
          margin: 5,
          paddingVertical: 2,
          paddingHorizontal: 5
        }} key={key}>


          <Text style={{
            fontFamily: FONT.Text1,
            fontSize: SIZES.TextMiddle,
          }}>{game.game} : {game.numbers}</Text>


        </View>
      })

      }
    </View>
  )
}

export const HoursCard = ({ data }: propsHoursCard) => {
  // used by : CasinoScreen.tsx

  return (
    <View style={{
      marginVertical: 10,
      paddingHorizontal: 10,
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap"
    }}>

      {data.hours.map((hour, key) => {
        return <Text style={{
          fontFamily: FONT.Text1,
          fontSize: SIZES.TextMiddle,
          textAlign: "justify",
          margin: 5
        }} key={key}>{hour.day} : {hour.opening} - {hour.ending}</Text>
      })}

    </View>
  )

}