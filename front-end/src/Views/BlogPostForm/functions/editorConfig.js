import ImgSideButton from "Views/BlogPostForm/components/ImgSideButton";

export const customizeToolbar = () => {
    const blockButtons = [
        {
            label: '" "',
            style: 'blockquote',
            icon: 'quote-right',
            description: 'Cytat'
        }, {
            label: ' • ',
            style: 'unordered-list-item',
            icon: 'list-ul',
            description: 'Wypunktowanie'
        }, {
            label: '123',
            style: 'ordered-list-item',
            icon: 'list-ol',
            description: "Numerowanie"
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

    const sideButtons = [
        {
            title: "Dodaj zdjęcie",
            component: ImgSideButton
        }
    ];

    return {
        block: blockButtons,
        inline: inlineButtons,
        side: sideButtons
    }
};