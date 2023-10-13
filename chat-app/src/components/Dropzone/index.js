import React, { useState, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        previewChip: {
            minWidth: 160,
            maxWidth: 210,
        },
    })
);

const MyDropzoneComponent = ({ initialFiles, onFilesDropped, onFileDeleted }) => {
    const classes = useStyles();
    const [dropzoneKey, setDropzoneKey] = useState(Date.now());  // Initial key

    useEffect(() => {
        // Whenever initialFiles changes, reset the DropzoneArea by changing its key
        setDropzoneKey(Date.now());
    }, [initialFiles]);

    console.log("Initial files", initialFiles);

    return (
        <div>
            <DropzoneArea
                key={dropzoneKey}  // Set the key here
                showPreviews={true}
                clearOnUnmount={true}
                showPreviewsInDropzone={false}
                useChipsForPreview
                initialFiles={initialFiles || []}
                previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                previewChipProps={{ classes: { root: classes.previewChip } }}
                previewText="Selected files"
                onDrop={(droppedFiles) => { onFilesDropped(droppedFiles) }}
                onAdd={(newFiles) => { console.log("akash", "Added", newFiles) }}
                onDelete={(deletedFileObject) => { onFileDeleted(deletedFileObject) }}
            />
        </div>
    );
}


export default MyDropzoneComponent;
