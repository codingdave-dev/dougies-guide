import {createReducer} from "../../../common/util/reducerUtil";

import {
    FETCH_ALL_ADMINS,
    FETCH_ALL_USERS,
    FETCH_APPROVED_USERS,
    FETCH_UNAPPROVED_USERS
} from "../../constants/adminConstants/adminConstants";

const initialState = {
    allAdmins: [],
    allUsers: [],
    approvedUsers: [],
    unapprovedUsers: []
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



export default createReducer(initialState, {
    [FETCH_ALL_ADMINS]: fetchAllAdmins,
    [FETCH_ALL_USERS]: fetchAllUsers,
    [FETCH_APPROVED_USERS]: fetchApprovedUsers,
    [FETCH_UNAPPROVED_USERS]: fetchUnapprovedUsers
})