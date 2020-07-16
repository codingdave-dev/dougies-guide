import {createReducer} from "../../../common/util/reducerUtil";

import {
    FETCH_ALL_ADMINS,
    FETCH_ALL_USERS,
    FETCH_APPROVED_USERS,
    FETCH_UNAPPROVED_USERS,
    FETCH_ALL_LISTINGS,
    FETCH_APPROVED_LISTINGS,
    FETCH_UNAPPROVED_LISTINGS, FETCH_BOARD_MEMBERS, FETCH_ALL_ADMINS_USERS, FETCH_BOARD_ROLES, FETCH_USER_PROFILE
} from "../../constants/adminConstants/adminConstants";

const initialState = {
    allAdminsAndUsers: [],
    allAdmins: [],
    allUsers: [],
    approvedUsers: [],
    unapprovedUsers: [],
    allListings: [],
    approvedListings: [],
    unapprovedListings: [],
    boardMembers: [],
    boardRoles: [],
    userProfile: []
}

//USER REDUCERS
const fetchAllAdminsAndUsers = (state, payload) => {
    return {
        ...state,
        allAdminsAndUsers: payload.allAdminsAndUsers
    }
}

const fetchAllAdmins = (state, payload) => {
    return {
        ...state,
        allAdmins: payload.allAdmins,
    }
}

const fetchAllUsers = (state, payload) => {
    return {
        ...state,
        allUsers: payload.allUsers,
    }
}

const fetchApprovedUsers = (state, payload) => {
    return {
        ...state,
        approvedUsers: payload.approvedUsers,
    }
}

const fetchUnapprovedUsers = (state, payload) => {
    return {
        ...state,
        unapprovedUsers: payload.unapprovedUsers,
    }
}

// LISTING REDUCERS
const fetchAllListings = (state, payload) => {
    return {
        ...state,
        allListings: payload.allListings
    }
}

const fetchApprovedListings = (state, payload) => {
    return {
        ...state,
        approvedListings: payload.approvedListings
    }
}

const fetchUnapprovedListings = (state, payload) => {
    return {
        ...state,
        unapprovedListings: payload.unapprovedListings
    }
}

// BOARD REDUCERS
const fetchBoardMembers = (state, payload) => {
    return {
        ...state,
        boardMembers: payload.boardMembers
    }
}

// BOARD ROLES
const fetchBoardRoles = (state, payload) => {
    return {
        ...state,
        boardRoles: payload.boardRoles
    }
}

// USER PROFILE
const fetchUserProfile = (state, payload) => {
    return {
        ...state,
        userProfile: payload.userProfile
    }
}

export default createReducer(initialState, {
    [FETCH_ALL_ADMINS_USERS]: fetchAllAdminsAndUsers,
    [FETCH_ALL_ADMINS]: fetchAllAdmins,
    [FETCH_ALL_USERS]: fetchAllUsers,
    [FETCH_APPROVED_USERS]: fetchApprovedUsers,
    [FETCH_UNAPPROVED_USERS]: fetchUnapprovedUsers,
    [FETCH_ALL_LISTINGS]: fetchAllListings,
    [FETCH_APPROVED_LISTINGS]: fetchApprovedListings,
    [FETCH_UNAPPROVED_LISTINGS]: fetchUnapprovedListings,
    [FETCH_BOARD_MEMBERS]: fetchBoardMembers,
    [FETCH_BOARD_ROLES]: fetchBoardRoles,
    [FETCH_USER_PROFILE]: fetchUserProfile,
})