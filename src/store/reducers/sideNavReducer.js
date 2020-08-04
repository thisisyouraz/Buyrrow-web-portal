import { SIDE_NAV } from '../actions/types';

let initialState = {
  open: false
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SIDE_NAV:
			return { ...state, open: action.payload }
		default:
			return state
	}
}