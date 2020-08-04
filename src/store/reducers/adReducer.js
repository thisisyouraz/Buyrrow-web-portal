import { GET_ALL_ADS, GET_APPROVAL_LIST, AD_BY_ID, GET_CORDS, GET_SELLER, GET_BIDDER} from '../actions/types'

let initialState = {
  adList: null,
  approvalList: null,
  selectedAd: null,
  cords: null,
  seller: null,
  bidder: null
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ADS:
      return { ...state, adList: action.payload }
    case GET_APPROVAL_LIST:
      return { ...state, approvalList: action.payload }
    case AD_BY_ID:
      return { ...state, selectedAd: action.payload }
    case GET_CORDS:
      return { ...state, cords: action.payload }
    case GET_BIDDER:
      return { ...state, bidder: action.payload }
    case GET_SELLER:
      return { ...state, seller: action.payload }
		default:
			return state
	}
} 