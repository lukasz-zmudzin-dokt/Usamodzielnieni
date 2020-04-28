import {ImageSideButton} from 'medium-draft';

class ImgSideButton extends ImageSideButton {

    onChange = e => {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            const formData = new FormData();
            formData.append('image', file);
            //fetch gdzie zwracany jest url
            // this.props.setEditorState(addNewBlock(
            //     this.props.getEditorState(),
            //     Block.IMAGE, {
            //         src: data.url
            //     }
            // ))
        }
    }
}

export default ImgSideButton;