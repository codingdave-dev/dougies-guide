import {createReducer} from "../../../common/util/reducerUtil";

import {FETCH_ALL_LISTING, FETCH_ALL_APPROVED_LISTING, FETCH_LISTING} from "../../constants/listingConstants/listingConstants";

const initialState = {
    allListings: [],
    allApprovedListings: [],
    listing: []
}

const fetchAllListings = (state, payload) => {
    return {
        ...state,
        allListings: payload.allListings,
    }
}

const fetchAllApprovedListings = (state, payload) => {
    return {
        ...state,
        allApprovedListings: payload.allApprovedListings,
    }
}

const fetchListing = (state, payload) => {
    return {
        ...state,
        listing: payload.listing
    }
}


export default createReducer(initialState, {
    [FETCH_ALL_LISTING]: fetchAllListings,
    [FETCH_ALL_APPROVED_LISTING]: fetchAllApprovedListings,
    [FETCH_LISTING]: fetchListing
})