import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAddCasinosSuccess, getCasinos, getCasinosFailure, getCasinosSuccess } from './casinosSlice'
import { getEvents, getAddEventsSuccess, getEventsSuccess, getEventsFailure } from './eventsSlice'
import { getAddGamesSuccess, getGames, getGamesFailure, getGamesSuccess } from './gamesSlice'
import { getSearch, getSearchCasinosSuccess, getSearchFailure, getSearchGamesSuccess } from './searchSlice'
import { getAddTournamentsSuccess, getTournaments, getTournamentsFailure, getTournamentsSuccess } from './tournamentsSlice'
import { propsData, ContextTypes } from '../components/interface'
import { addFollowings, endLoading, getUser, getUserFaillure, removeFollowings, resetSmsBool, resetTelNumber, updateUserInfo } from './userSlice'





export const fetchData = createAsyncThunk(
    'fetchData',
    async (payload: propsData, { dispatch }) => {


        switch (payload.context) {

            case ContextTypes.events:

                dispatch(getEvents())
                try {
                    const data = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/' + payload.url, { params: payload.params }).then((res: { data: { data: any } }) =>
                        res.data.data
                    )

                    if (payload.addData) {


                        dispatch(getAddEventsSuccess({ data: data, stillData: data.length === payload.step }))

                    }
                    else {
                        dispatch(getEventsSuccess({ data: data, stillData: data.length === payload.step }))
                    }

                } catch {

                    dispatch(getEventsFailure())
                }

                break

            case ContextTypes.researchBar:
                dispatch(getSearch())
                try {

                    const data = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/' + payload.url).then((res: { data: { data: any } }) =>
                        res.data.data
                    )

                    switch (payload.url?.split('/')[1]) {
                        case "casinos":
                            dispatch(getSearchCasinosSuccess(data))
                            break
                        case 'games':
                            dispatch(getSearchGamesSuccess(data))
                            break
                        default:
                            break
                    }


                } catch {

                    dispatch(getSearchFailure())
                }

                break

            case ContextTypes.tournaments:

                dispatch(getTournaments())
                try {
                    const data = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/' + payload.url, { params: payload.params }).then((res: { data: { data: any } }) =>
                        res.data.data
                    )

                    if (payload.addData) {


                        dispatch(getAddTournamentsSuccess({ data: data, stillData: data.length === payload.step }))

                    }
                    else {
                        dispatch(getTournamentsSuccess({ data: data, stillData: data.length === payload.step }))
                    }

                } catch {

                    dispatch(getTournamentsFailure())
                }

                break

            case ContextTypes.casinos:

                dispatch(getCasinos())
                try {
                    const data = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/' + payload.url, { params: payload.params }).then((res: { data: { data: any } }) =>
                        res.data.data
                    )

                    if (payload.addData) {


                        dispatch(getAddCasinosSuccess(data))

                    }
                    else {
                        dispatch(getCasinosSuccess(data))
                    }

                } catch {

                    dispatch(getCasinosFailure())
                }

                break

            case ContextTypes.games:
                dispatch(getGames())
                try {

                    const data = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/' + payload.url, { params: payload.params }).then((res: { data: { data: any } }) =>
                        res.data.data
                    )


                    if (payload.addData) {


                        dispatch(getAddGamesSuccess({ data: data, stillData: (data.length === payload.step), context: payload.url?.split("/")[0] }))

                    }
                    else {
                        dispatch(getGamesSuccess({ data: data, stillData: (data.length === payload.step), context: payload.url?.split("/")[0] }))
                    }


                } catch {

                    dispatch(getGamesFailure())
                }

                break

            case ContextTypes.user:

                dispatch(getUser())

                try {

                    switch (payload.userApiParams?.context) {

                        case "follow":

                            if (payload.userApiParams?.remote && payload.userApiParams.purpose === "jackpot") {

                                const remoteUser = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/user/" + payload.userApiParams?.numTel).then((res: { data: { data: any } }) =>
                                    res.data.data).catch((error) => null)

                                if (remoteUser) {

                                    const res = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/followings/" + payload.userApiParams?.numTel, { "following": payload.userApiParams.casinoId }).then((res: { data: { data: any } }) =>
                                        res.data.data).catch((error) => null)

                                    dispatch(addFollowings({ casinoId: payload.userApiParams?.casinoId, purpose: payload.userApiParams?.purpose, casinoAdresse : payload.userApiParams.casinoAdresse, casinoName : payload.userApiParams.casinoName }))

                                }

                            }

                            else {

                                dispatch(addFollowings({ casinoId: payload.userApiParams?.casinoId, purpose: payload.userApiParams?.purpose,  casinoAdresse : payload.userApiParams.casinoAdresse, casinoName : payload.userApiParams.casinoName}))

                            }

                            break

                        case "unfollow":

                            if (payload.userApiParams?.remote && payload.userApiParams.purpose === "jackpot") {

                                const remoteUser = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/user/" + payload.userApiParams?.numTel).then((res: { data: { data: any } }) =>
                                    res.data.data).catch((error) => null)

                                if (remoteUser) {

                                    const res = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/followings/" + payload.userApiParams?.numTel, { "following": payload.userApiParams.casinoId }).then((res: { data: { data: any } }) =>
                                        res.data.data).catch((error) => null)

                                    dispatch(removeFollowings({ casinoId: payload.userApiParams?.casinoId, purpose: payload.userApiParams?.purpose }))

                                }

                            }

                            else {

                                dispatch(removeFollowings({ casinoId: payload.userApiParams?.casinoId, purpose: payload.userApiParams?.purpose }))

                            }


                            break

                        case "delete":

                            if (payload.userApiParams?.remote) {

                                const remoteUser = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/user/" + payload.userApiParams.numTel).then((res: { data: { data: any } }) =>
                                    res.data.data).catch((error) => null)

                                if (remoteUser) {
                                    const res = await axios.delete("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/" + payload.userApiParams.numTel).then((res: { data: { msg: any } }) =>
                                        res.data.msg).catch((error) => null)
                                }

                            }

                            if (payload.userApiParams.body) {
                                dispatch(updateUserInfo(payload.userApiParams.body))
                            }

                            dispatch(resetTelNumber())
                            dispatch(resetSmsBool())
                            break

                        case "update":

                            if (payload.userApiParams?.remote) {

                                const remoteUser = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/user/" + payload.userApiParams.numTel).then((res: { data: { data: any } }) =>
                                    res.data.data).catch((error) => null)

                                if (remoteUser) {

                                    const res = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/" + payload.userApiParams.numTel, payload.userApiParams.body).then((res: { data: { data: any } }) =>
                                        res.data.data).catch((error) => null)

                                }
                                else {
                                    const res = await axios.post("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/", payload.userApiParams.body).then((res: { data: { data: any } }) =>
                                        res.data.data).catch((error) => null)


                                    payload.userApiParams.followings?.map(async (following) => {
                                        if (following.purpose === "jackpot") {
                                            const res = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/users/followings/" + payload.userApiParams?.numTel, { "following": following.casinoId }).then((res: { data: { msg: any } }) =>
                                                res.data.msg).catch((error) => null)
                                        }
                                    })

                                }

                                if (payload.userApiParams.body) {
                                    dispatch(updateUserInfo(payload.userApiParams.body))
                                }
                            }
                            else {
                                if (payload.userApiParams.body) {
                                    dispatch(updateUserInfo(payload.userApiParams.body))
                                }
                            }



                            break

                        default:
                            dispatch(endLoading())
                            break
                    }


                }
                catch {

                    dispatch(getUserFaillure())
                }


                break





            default:

                break

        }

    }

)