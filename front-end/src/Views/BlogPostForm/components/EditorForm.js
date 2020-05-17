import {addNewBlock, Block, Editor, ImageSideButton} from "medium-draft";
import React from "react";
import {uploadPhoto} from "../functions/apiCalls";
import proxy from "config/api";

const EditorForm = ({onChange, customRef, state, id, token }) => {

    const ImgSideButton = () => class extends ImageSideButton {
        onChange = async (e) => {
            const file = e.target.files[0];
            if (file.type.indexOf('image/') === 0) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                    const res = await uploadPhoto(id, file, token, "attachment");
                    this.props.setEditorState(addNewBlock(
                        this.props.getEditorState(),
                        Block.IMAGE, {
                            src: proxy.plain + res.attachment_url
                        }
                    ))
                } catch(e) {
                    console.log(e);
                }
            }
            this.props.close();
        }
    };

    const customizeToolbar = () => {
        const blockButtons = [
            {
                label: '" "', style: "blockquote", icon: "quote-right", description: "Cytat",
            },
            {
                label: " • ", style: "unordered-list-item", icon: "list-ul", description: "Wypunktowanie",
            },
            {
                label: "123", style: "ordered-list-item", icon: "list-ol", description: "Numerowanie",
            },
            {
                label: " ✓ ", style: "todo", icon: "todo", description: "To-do",
            },
        ];

        const inlineButtons = [
            {
                label: "B", style: "BOLD", icon: "bold", description: "Pogrubienie",
            },
            {
                label: "I", style: "ITALIC", icon: "italic", description: "Kursywa",
            },
            {
                label: "U", style: "UNDERLINE", icon: "underline", description: "Podkreślenie",
            },
            {
                label: " # ", style: "hyperlink", icon: "link", description: "Link",
            },
        ];

        const sideButtons = [
            {
                title: "Dodaj zdjęcie",
                component: ImgSideButton.call()
            }
        ];

        return {
            block: blockButtons,
            inline: inlineButtons,
            side: sideButtons
        }
    };

    const config = customizeToolbar();

    return (
        <div className="my-4">
            <Editor
                placeholder="Napisz swoją historię..."
                ref={customRef}
                editorState={state}
                onChange={onChange}
                inlineButtons={config.inline}
                blockButtons={config.block}
                sideButtons={config.side}
            />
        </div>
    )
};

export default EditorForm;