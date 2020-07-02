import {createReducer} from "../../../common/util/reducerUtil";
import {DIALOG_OPEN, DIALOG_CLOSE} from "../../constants/dialogConstants/dialogConstants";

const initialState = null

const openDialog = (state, payload) => {
    const {dialogType, dialogProps} = payload

    return {dialogType, dialogProps}
}

const closeDialog = (state) => {
    return null
}

export default createReducer(initialState, {
    [DIALOG_OPEN]: openDialog,
    [DIALOG_CLOSE]: closeDialog
})

