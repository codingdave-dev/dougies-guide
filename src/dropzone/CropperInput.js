import React, {createRef} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

import Cropper from 'react-cropper'

const cropper = createRef();

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const CropperInput = ({imagePreview, setImage}) => {
    const classes = useStyles();
    const theme = useTheme();

    const cropImage = () => {
        if (typeof cropper.current.getCroppedCanvas() === "undefined") {
            return;
        }

        cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
        }, "image/jpeg");
    };

    return (
        <Grid item md sm xs>
            <Cropper
                ref={cropper}
                src={imagePreview}
                style={{ height: 300, width: 300}}
                background={false}
                preview={".img-preview"}
                aspectRatio={1}
                viewMode={1}
                drageMode={"move"}
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={cropImage}
            />
        </Grid>
    );
};

export default CropperInput;