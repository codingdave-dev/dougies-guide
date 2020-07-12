import firebase from "../../../config/firebase";
import {
    asyncActionError,
    asyncActionFinish,
    asyncActionStart,
} from "../asyncActions/asyncActions";
import {FETCH_BOARD_MEMBERS, FETCH_BOARD_ROLES} from "../../constants/adminConstants/adminConstants";

export const fetchBoardMembers = () => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const boardQuery = firestore.collection('the_board')

        try {
            dispatch(asyncActionStart());
            let query = await boardQuery.get();

            let boardMembers = [];

            for (let i = 0; i < query.docs.length; i++) {
                let member = {
                    ...query.docs[i].data(),
                    id: query.docs[i].id,
                };
                boardMembers.push(member);
            }

            dispatch({ type: FETCH_BOARD_MEMBERS, payload: { boardMembers } });
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
            console.log(error);
        }

    }
}

export const fetchBoardRoles = () => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const rolesQuery = firestore.collection('board_roles')

        try {
            dispatch(asyncActionStart());
            let query = await rolesQuery.get();

            let boardRoles = [];

            for (let i = 0; i < query.docs.length; i++) {
                let role = {
                    ...query.docs[i].data(),
                    id: query.docs[i].id,
                };
                boardRoles.push(role);
            }

            dispatch({ type: FETCH_BOARD_ROLES, payload: { boardRoles } });
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
            console.log(error);
        }

    }
}

export const createBoardMember = (uid, fullName, photoURL, title, description) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        try {
            dispatch(asyncActionStart())
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()

            await firestore.collection('the_board').add({uid, createdAt, fullName, photoURL, title, description})

            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError())
            console.log(error)
        }

    }
}

export const createBoardMemberRole = (values) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        try {
            dispatch(asyncActionStart())

            await firestore.collection('board_roles').add(values)

            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError())
            console.log(error)
        }

    }
}