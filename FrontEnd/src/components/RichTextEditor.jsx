import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from "draft-js";
import '../assets/sass/Draft.scss';
import '../../node_modules/draft-js/dist/Draft.css';
import { TextField } from "@mui/material";

const RichTextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onChange = (newEditorState) => setEditorState(newEditorState);

    

    return (
        <div>
            <Editor
                editorState={editorState}
                onChange={onChange}
            />
            {/* <TextField
                id="Description-field"
                label="Incluya la descripción del problema"
                multiline
                minRows={25}
                sx={{ width: "100%", mb: 2 }}
            /> */}
        </div>
    )
}

export default RichTextEditor