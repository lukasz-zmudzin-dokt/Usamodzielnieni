import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentItem from './CommentItem';

describe('CommentItem', () => {
    let props;
    
    beforeEach(() => {
        props = {
            comment: {
                id: '123',
                author: {
                    email: 'mail@mail.pl',
                    firstName: 'Jan',
                    lastName: 'Kowalski'
                },
                creationDate: new Date(2020, 10, 4),
                content: 'Treść komentarza'
            },
            onEditClick: jest.fn(),
            onDeleteClick: jest.fn(),
            user: {
                type: 'Standard',
                data: {
                    email: 'mail@mail.pl',
                    group_type: undefined
                }
            }
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <CommentItem {...props} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render comment without buttons when standard user is not the author of the comment', () => {
        props.comment.author.email = 'abc@123.com';

        const { queryByText } = render(
            <CommentItem {...props} />
        );

        expect(queryByText('Edytuj')).not.toBeInTheDocument();
        expect(queryByText('Usuń')).not.toBeInTheDocument();
    });

    it('should render comment with buttons when blog moderator is not the author of the comment', () => {
        props.comment.author.email = 'abc@123.com';
        props.user.type = 'Staff';
        props.user.data.group_type = 'staff_blog_moderator';

        const { getByText } = render(
            <CommentItem {...props} />
        );

        expect(getByText('Usuń')).toBeInTheDocument();
    });

    it('should call onDeleteClick when delete button is clicked', () => {
        props.comment.author.email = 'abc@123.com';
        props.user.type = 'Staff';
        props.user.data.group_type = 'staff_blog_moderator';

        const { getByText } = render(
            <CommentItem {...props} />
        );
        fireEvent.click(getByText('Usuń'));

        expect(props.onDeleteClick).toHaveBeenCalledTimes(1);
        expect(props.onEditClick).toHaveBeenCalledTimes(0);
    });
});