import {addNewBlock, Block, ImageSideButton} from 'medium-draft';
import {uploadPhoto} from "../functions/apiCalls";
import proxy from "config/api";

class ImgSideButton extends ImageSideButton {

    id = this.props.id;
    token = this.props.token;

    onChange = async (e) => {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            const formData = new FormData();
            formData.append('image', file);
            let res;
            try {
                res = await uploadPhoto(this.id, file, this.token, "attachment");
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

}

export default ImgSideButton;