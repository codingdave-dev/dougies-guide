import {DIALOG_OPEN, DIALOG_CLOSE} from "../../constants/dialogConstants/dialogConstants";

export const openDialog = (dialogType, dialogProps) => {
    return {
        type: DIALOG_OPEN,
        payload: {
            dialogType,
            dialogProps
        }
    }
}

export const closeDialog = () => {
    return {
        type: DIALOG_CLOSE
    }
}