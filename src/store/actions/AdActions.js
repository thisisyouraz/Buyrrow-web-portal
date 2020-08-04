import { GET_ALL_ADS, GET_APPROVAL_LIST, AD_BY_ID, GET_CORDS, GET_SELLER, GET_BIDDER } from './types';
import { database as db } from '../../config/fbConfig'
import { default as _ } from 'lodash'

export const getAllAds = () => dispatch => {
  db.ref('/Data of posted ads').on("value", (snapshot) => {
    dispatch({
      type: GET_ALL_ADS,
      payload: _.values(snapshot.val())
    })
  })
}

export const getApprovalList = () => dispatch => {
  db.ref('/Admin approve ads').on("value", (snapshot) => {
    dispatch({
      type: GET_APPROVAL_LIST,
      payload: _.values(snapshot.val())
    })
  })
} 

export const getById = (id) => dispatch => {
  db.ref(`/Data of posted ads/${id}`).once("value", (snapshot) => {
    console.log(snapshot.val())
    dispatch({
      type: AD_BY_ID,
      payload: snapshot.val()
    })
  })
}

export const clearSelectedAd = () => dispatch => {
  dispatch({
    type: AD_BY_ID,
    payload: null
  })
  dispatch({
    type: GET_CORDS,
    payload: null
  })
  dispatch({
    type: GET_BIDDER,
    payload: null
  })
  dispatch({
    type: GET_SELLER,
    payload: null
  })
}

export const deleteAd = (id) => dispatch => {
  db.ref(`/Data of posted ads/${id}`).remove((res) => {
    console.log(res)
  })
}

export const approve = (id) => dispatch => {
  db.ref(`/Admin approve ads/${id}`).once("value", (snapshot) => {
    db.ref('/Data of posted ads/').child((snapshot.val()).parentID).set(snapshot.val()).then(() => {
      db.ref(`/Admin approve ads/${id}`).remove()
    })
  })
}

export const rejectAd = (id) => dispatch => {
  db.ref(`/Admin approve ads/${id}`).remove((res) => {
    console.log(res)
  })
}

export const getCurrentCords = (id) => dispatch => {
  db.ref(`/Current Location/${id}`).once("value", (snapshot) => {
    dispatch({
      type: GET_CORDS,
      payload: snapshot.val()
    })
  })
}

export const getUserInfo = (id, type) => dispatch => {
  db.ref(`/users/${id}`).once('value', (snapshot) => {
    dispatch({
      type: (type === "seller") ? GET_SELLER : GET_BIDDER,
      payload: snapshot.val()
    })
  })
}