import {Button} from "react-bootstrap";

export const customizeToolbar = () => {
    const blockButtons = [
        {
            label: 'H2',
            style: 'header-two',
            icon: 'header',
            description: 'Nagłówek 2'
        }, {
            label: 'H3',
            style: 'header-three',
            icon: 'header',
            description: 'Nagłówek 3'
        }, {
            label: '\" \"',
            style: 'blockquote',
            icon: 'quote-right',
            description: 'Cytat'
        }, {
            label: ' • ',
            style: 'unordered-list-item',
            icon: 'list-ul',
            description: 'Wypunktowanie'
        }, {
            label: ' ✓ ',
            style: 'todo',
            icon: 'todo',
            description: 'To-do'
        }
    ];

    const inlineButtons = [
        {
            label: 'B',
            style: 'BOLD',
            icon: 'bold',
            description: 'Pogrubienie'
        }, {
            label: 'I',
            style: 'ITALIC',
            icon: 'italic',
            description: 'Kursywa'
        }, {
            label: 'U',
            style: 'UNDERLINE',
            icon: 'underline',
            description: 'Podkreślenie'
        }, {
            label: ' # ',
            style: 'hyperlink',
            icon: 'link',
            description: 'Link'
        }
    ];

    return {
        block: blockButtons,
        inline: inlineButtons
    }
};