import {createReducer} from "../../../common/util/reducerUtil";

import {FETCH_BOARD_MEMBERS} from "../../constants/boardMemberConstants/boardMemberConstants";

const initialState = {
    boardMembers: []
}

const fetchBoardMembers = (state, payload) => {
    return {
        ...state,
        boardMembers: payload.boardMembers,
    }
}

export default createReducer(initialState, {
    [FETCH_BOARD_MEMBERS]: fetchBoardMembers,
})

