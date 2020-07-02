import firebase from '../../../config/firebase'

import {FETCH_BOARD_MEMBERS} from "../../constants/boardMemberConstants/boardMemberConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../asyncActions/asyncActions";

export const getBoardMembers = () => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        // FIRESTORE QUERY
        const boardMemberQuery = firestore.collection('the_board')

        try {
            dispatch(asyncActionStart())
            let query = await boardMemberQuery.get()

            let boardMembers = []

            for (let i = 0; i < query.docs.length; i++) {
                let member = {
                    ...query.docs[i].data(),
                    id: query.docs[i].id
                }
                boardMembers.push(member)
            }

            dispatch({
                type: FETCH_BOARD_MEMBERS,
                payload: {boardMembers}
            })
            dispatch(asyncActionFinish())


        } catch (error) {
            dispatch(asyncActionError())
            console.log(error)
        }

    }
}