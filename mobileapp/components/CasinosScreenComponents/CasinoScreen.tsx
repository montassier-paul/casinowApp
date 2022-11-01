import { View, Text, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircleButton, DirectButton } from '../Button'
import { COLORS, FONT, SIZES, VALUES } from "../../constants"
import { ServiceCard, GamesCard, HoursCard, MachineCard, TableCard, FollowCard, TournamentCard, EventCard } from '../Cards'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { useSelector } from 'react-redux'
import socketIOClient from "socket.io-client";
import Carousel from "react-native-anchor-carousel"
import { fetchData } from '../../redux/api'
import { updateGames, updateTables } from '../../redux/gamesSlice'
import { propsEvent, propsGame, propsTournament, ContextTypes, propsUnfollowFollowingsUser, propsFollowFollowingsUser, propsCasinoScreen, propsCarouselItem } from '../interface'




const carouselRenderItem = ({ item, index, carouselRef }: propsCarouselItem) => {

  return (
    <TouchableOpacity
      delayPressIn={1000}
      onPress={() => {
        carouselRef.current.scrollToIndex(index);
        carouselRef.current.scrollToIndex(index)
      }}
    >

      <Image
        source={{ uri: item }}
        // source={item}
        resizeMode="contain"
        style={{
          height: "100%", width: "auto", borderRadius: 10
        }} />
    </TouchableOpacity>
  );
};


const CasinoView = ({ data }: { data: propsCasinoScreen["data"] }) => {

  const [text, setText] = useState("")
  const [readMore, setReadMore] = useState(false);
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const { width } = Dimensions.get('window');
  const events = useAppSelector((state: RootState) => state.events)
  const tournaments = useAppSelector((state: RootState) => state.tournaments)
  const carouselRef = React.useRef(null);


  const handleFollow = async ({ casinoId, purpose, casinoName, casinoAdresse }: propsFollowFollowingsUser) => {

    await dispatch(fetchData({
      context: ContextTypes.user,
      userApiParams: {
        context: "follow", remote: user.smsBool,
        numTel: user.numTel, casinoId: casinoId, purpose: purpose, casinoAdresse : casinoAdresse,
        casinoName : casinoName
      }
    }
    ))
  }
  const handleUnfollow = async ({ casinoId, purpose }: propsUnfollowFollowingsUser) => {


    await dispatch(fetchData({
      context: ContextTypes.user,
      userApiParams: {
        context: "unfollow", remote: user.smsBool,
        numTel: user.numTel, casinoId: casinoId, purpose: purpose
      }
    }
    ))

  }
  useEffect(() => {
    data?.desc && setText(data?.desc.slice(0, 100))
  }, [data])


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        flex: 1,
      }}>


      {data?.name && <Text style={{
        width: "100%",
        fontFamily: FONT.Title,
        fontSize: SIZES.TilteSizeBig,
        letterSpacing: SIZES.TitleSpacing,
        textAlign: "center",
        color: COLORS.DarkPurple,
        marginVertical: 10

      }}>{data.name}</Text>}

      {data?.images.length !== 0
        ? <Carousel
          ref={carouselRef}
          data={data?.images}
          renderItem={({ item, index }: { item: string, index: number }) => carouselRenderItem({ item, index, carouselRef })}
          style={{
            flexGrow: 0, paddingHorizontal: 15,
            height: 400
          }}
          itemWidth={width * 0.8}
          containerWidth={width}
          separatorWidth={0}
        />

        :
        <View style={{ height: 400, width: width, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={(require("../../images/Casino.jpg"))}
            resizeMode="contain"
            style={{
              height: "100%", width: width * 0.8, borderRadius: 10
            }} />
        </View>


      }

      {data?.adresse && <Text style={{
        width: "100%",
        fontFamily: FONT.Text1,
        fontSize: SIZES.TextMiddle,
        color: COLORS.Black,
        paddingHorizontal: 15,
        marginVertical: 10

      }}>Adresse : {data.adresse}</Text>}

      {data?.desc &&
        <Text style={{
          width: "100%",
          marginVertical: 10,
          fontFamily: FONT.Text1,
          textAlign: "justify",
          paddingVertical: 10,

        }}>

          <Text style={{ fontFamily: FONT.Text1 }}>{text}</Text>
          {data.desc.length > 100 &&
            <>
              <Text style={{ fontFamily: FONT.Text1 }}>{!readMore && "..."}</Text>
              <Text
                style={{ fontWeight: "bold", fontFamily: FONT.Text1 }}
                onPress={() => {
                  if (!readMore) {
                    setText(String(data.desc));
                    setReadMore(true);
                  } else {
                    setText(String(data.desc).slice(0, 100));
                    setReadMore(false);
                  }
                }}
              >
                {readMore ? " Show Less" : " Read More"}
              </Text>
            </>
          }
        </Text>

      }

      {data?.hours && <HoursCard data={{ hours: data.hours }} />}


      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />

      {data &&
        <View style={{
          width: "100%",
          marginVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontFamily: FONT.Title,
            fontSize: SIZES.TextMiddle,
            marginBottom: 5,
            width: "100%",
            textAlign: "center"
          }}>Jeux et services proposés par l'établissement : </Text>

          {data.machines !== undefined &&
            <ServiceCard data={{
              text: String(data.machines) + " machines", textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.tables !== undefined &&
            <ServiceCard data={{
              text: String(data.tables) + " tables", textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.poker !== undefined &&
            <ServiceCard data={{
              text: "Poker", bool: data.poker, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.betting !== undefined &&
            <ServiceCard data={{
              text: "Paris Sportif", bool: data.betting, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.hotel !== undefined &&
            <ServiceCard data={{
              text: "Hôtel", bool: data.hotel, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.restaurant !== undefined &&
            <ServiceCard data={{
              text: "Restaurant", bool: data.restaurant, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.parking !== undefined &&
            <ServiceCard data={{
              text: "Parking", bool: data.parking, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.games && <GamesCard data={{ games: data.games }} />}


        </View>
      }

      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />


      <View style={{
        width: "100%",
      }}>

        <Text style={{
          fontFamily: FONT.Text2,
          alignSelf: "center"
        }}>Actualité du club</Text>

        {tournaments.tournamentsData.map((tournament: propsTournament, key: number) => {
          return <TournamentCard data={tournament} key={key} />
        })}

        {events.eventsData.map((event: propsEvent, key: number) => {
          return <EventCard data={event} key={key} />
        })}

      </View>

      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />

      <View style={{
        width: "100%",
      }}>
        <Text style={{
          fontFamily: FONT.Text2,
          alignSelf: "center"
        }}>Suivre : </Text>



        {data?._id &&
          <View>
            <Text style={{
              fontFamily: FONT.Text2,
              alignSelf: "center"
            }}>Suivre cette établissemet : </Text>
            <FollowCard
              data={{
                id: data._id, Name: data.name, adresse: data.adresse, purpose: 'events',
                text: "Evenements", userFollowings: user.followings
              }}
              handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
            <FollowCard
              data={{
                id: data._id, Name: data.name, adresse: data.adresse, purpose: 'tournaments',
                text: "Tournois de poker", userFollowings: user.followings
              }}
              handleFollow={handleFollow} handleUnfollow={handleUnfollow} />

            <FollowCard
              data={{
                id: data._id, Name: data.name, adresse: data.adresse, purpose: 'jackpot',
                text: "Jeux", userFollowings: user.followings
              }}
              handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
          </View>
        }
      </View>
      <View style={{ height: 250 }} />
    </ScrollView>
  );
}


const DirectView = ({ step, dataId }: { step: number, dataId?: string }) => {

  const games = useAppSelector((state: RootState) => state.games)
  const dispatch = useAppDispatch()

  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;

    if (Math.ceil(mHeight + Y) >= cSize - 20 && !games.isLoading) {


      if (games.machinesStillData) {


        await dispatch(fetchData({
          url: "machines/full/",
          params: { casinoData: 1, limit: step, offset: games.machinesLength, q_casinoId: dataId ? [dataId] : undefined },
          context: ContextTypes.games,
          addData: true,
          step: step
        }))

      }

      if (games.tablesStillData) {

        await dispatch(fetchData({
          url: "tables/full/",
          params: { casinoData: 1, limit: step, offset: games.tablesLength, q_casinoId: dataId ? [dataId] : undefined },
          context: ContextTypes.games,
          addData: true,
          step: step
        }))

      }




    }

  }


  return (
    <ScrollView
      onScroll={(event) => handleScroll(event)}
      style={{
        width: "100%",
        flex: 1,
        padding: 10,
      }}>
      <Text
        style={{
          fontFamily: FONT.TitleBold,
          fontSize: SIZES.TilteSizeBig,
          width: "100%",
          textAlign: "center"
        }}
      >LIVE</Text>

      {games.gamesData.map((gameData: propsGame, key: number) => {

        if (gameData.jackpot) {
          return <MachineCard data={{
            jackpot: gameData.jackpot, casinoId: gameData.casinoId, _id: gameData._id,
            game: gameData.game, CasinoName: gameData.CasinoName, CasinoAdresse: gameData.CasinoAdresse
          }} key={key} />
        }
        if (gameData.open !== undefined) {

          return <TableCard data={{
            open: gameData.open, casinoId: gameData.casinoId, game: gameData.game,
            _id: gameData._id, CasinoName: gameData.CasinoName, CasinoAdresse: gameData.CasinoAdresse
          }} key={key} />

        }

      })
      }

      {!games.machinesStillData && !games.tablesStillData &&
        <View style={{ height: 50, alignItems: "center" }}>
          <Text style={{ fontFamily: FONT.Text1 }}>No more Games</Text>
        </View>}

      <View style={{ height: 150 }} />


    </ScrollView>

  )
}

const CasinoScreen = ({ data, handleQuit }: propsCasinoScreen) => {

  const step = VALUES.STEPLARGE;

  const [direct, setDirect] = useState(false)
  const [inputText, setInputText] = useState("DIRECT")
  const dispatch = useAppDispatch()


  useEffect(() => {

    const init = async () => {


      await dispatch(fetchData({
        url: "evenements/full/",
        params: { casinoData: 1, limit: step, q_casinoId: data?._id ? [data._id] : undefined },
        addData: false,
        context: ContextTypes.events,
        step: step,
      }))

      await dispatch(fetchData({
        url: "tournaments/full/",
        params: { casinoData: 1, limit: step, q_casinoId: data?._id ? [data._id] : undefined },
        addData: false,
        context: ContextTypes.tournaments,
        step: step,
      }))


      await dispatch(fetchData({
        url: "machines/full/",
        params: { casinoData: 1, limit: step, q_casinoId: data?._id ? [data._id] : undefined },
        context: ContextTypes.games,
        addData: false,
        step: step,
      }))

      await dispatch(fetchData({
        url: "tables/full/",
        params: { casinoData: 1, limit: step, q_casinoId: data?._id ? [data._id] : undefined },
        context: ContextTypes.games,
        addData: true,
        step: step,
      }))

    }

    init()


    const socket = socketIOClient(VALUES.ENDPOINT);
    socket.on("machine update", data => {

      dispatch(updateGames({ id: data.id, jackpot: data.jackpot }))

    }
    );


    socket.on("table update", data => {

      dispatch(updateTables({ id: data.id, open: data.open }))
    })


    return () => {
      socket.off()
    }


  }, [data]);


  const handleQuitClick = () => {
    handleQuit()

  }

  const handleDirectClick = () => {
    if (!direct) {
      setInputText("INFO")
    }
    else {
      setInputText("DIRECT")
    }
    setDirect(prev => !prev)
  }


  return (
    <View style={{
      flex: 1
    }}>

      {direct
        ? <DirectView step={step} dataId={data?._id} />
        : <CasinoView data={data} />

      }

      <CircleButton handlePress={handleQuitClick} data={{ img: require("../../images/goBack.png") }} />
      <DirectButton handlePress={handleDirectClick} data={{ input: inputText }} />
    </View>
  )
}

export default CasinoScreen