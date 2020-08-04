import { SIDE_NAV } from './types'; 


export const update = (state) => dispatch => {
  dispatch({
    type: SIDE_NAV,
    payload: !state
  })
}