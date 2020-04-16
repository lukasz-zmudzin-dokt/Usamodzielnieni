import React from "react";
import BlogContent from "./BlogContent";
import {render} from "@testing-library/react";

describe('BlogContent', () => {
    let post;

    beforeAll(() => {
       post = {
           author: {
               firstName: "Jan",
               lastName: "Kowalski",
               email: "qwe@qwe.qwe"
           },
           content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.",
           tags: ["tag1", "tag2", "tag3"],
           creationDate: "2020-01-02qweqweqwe",
           comments: [{
               author: {
                   firstName: "Artysta",
                   lastName: "Malarz",
               },
               creationDate: "2020-01-01",
               content: "Witam w nowy rok!",
               id: 1
           }]
       }
    });

    it('should match snapshot', () => {
        const {container} = render(
            <BlogContent post={post} type={null}/>
        );

        expect(container).toMatchSnapshot();
    });

    it('should convert date type', () => {
        const secondPost = post;
        secondPost.creationDate = "2019-06-07";
        const {getByText} = render(
            <BlogContent post={secondPost} />
        );

        expect(getByText("07.06.2019", {exact: false})).toBeInTheDocument();
    });

    it('should return error alert', () => {
        const {getByText} = render(
            <BlogContent />
        );

        expect(getByText("Wystąpił błąd", {exact: false})).toBeInTheDocument();
    });

    it('should return empty tag list', () => {
       const thirdPost = post;
       thirdPost.tags = [];
       const {getByText, queryByText} = render(
           <BlogContent post={thirdPost} />
       );

       expect(getByText('Brak tagów', {exact: false})).toBeInTheDocument();
       expect(queryByText("tag1")).not.toBeInTheDocument();
    });
});