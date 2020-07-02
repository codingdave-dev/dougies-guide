import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import PublishIcon from '@material-ui/icons/Publish';
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dropzone: {
        border: '1px dashed',
        borderColor: theme.palette.primary.main,
        borderRadius: '5px',
        padding: '1em',
        textAlign: 'center'
    },
    icon: {
        fontSize: '4em',
        color: theme.palette.primary.main
    }
}));

const DropzoneInput = ({ setFiles, showCropper }) => {
    const classes = useStyles()
    const onDrop = useCallback(
        acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            );
            showCropper()

        },
        [setFiles, showCropper]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: "image/*"
    });

    return (
        <div
            {...getRootProps()}
            // className={"dropzone " + (isDragActive && "dropzone--isActive")}
            className={classes.dropzone}
        >
            <input {...getInputProps()} />
            <PublishIcon className={classes.icon} />
            <Typography variant={'h5'}>Drop Image Here</Typography>
        </div>
    );
};

export default DropzoneInput;
