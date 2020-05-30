import React, { useState } from "react";
import { DeletionModal } from "components";
import {
  Alert,
  Badge,
  Button,
  ButtonToolbar,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import { deletePost } from "Views/BlogPost/functions/apiCalls";
import { Redirect } from "react-router-dom";
import { staffTypes } from "constants/staffTypes";
import proxy from "config/api";
import { userTypes } from "constants/userTypes";

const getDateString = (dateString) => {
  return (
    dateString.substring(8, 10) +
    "." +
    dateString.substring(5, 7) +
    "." +
    dateString.substring(0, 4)
  );
};

const renderTags = (tagList) => {
  if (tagList.length === 0) {
    return "Brak tagów.";
  } else
    return tagList.map((tag) => {
      return (
        <Badge variant="info" key={tag} className="mx-1">
          {tag}
        </Badge>
      );
    });
};

const handleDeletion = async (
  wantsDelete,
  id,
  token,
  errorFlag,
  successFlag,
  setDel
) => {
  wantsDelete(false);
  try {
    await deletePost(id, token);
    successFlag(true);
    setDel(true);
  } catch (e) {
    console.log(e);
    errorFlag(true);
  }
};

const renderButtons = (user, author, editionFlag, flag, setShowModal) => {
  if (
    user &&
    user.token &&
    ((user.type === userTypes.STAFF &&
      user.data.group_type.includes(staffTypes.BLOG_CREATOR)) ||
      user.data.email === author.email) &&
    !flag
  ) {
    return (
      <ButtonToolbar className="btn_toolbar text-center">
        <Button
          key="edit"
          variant="info"
          className="button-edit mx-3"
          onClick={(e) => editionFlag(true)}
        >
          Edytuj post
        </Button>
        <Button
          id="delete"
          key="delete"
          variant="danger"
          className="button-delete mx-3"
          onClick={(e) => handleOnClick(e, setShowModal)}
        >
          Usuń post
        </Button>
      </ButtonToolbar>
    );
  }
};

const renderRedirect = (flag, id) => {
  const path = `/blog/newPost/${id}`;
  if (flag) return <Redirect data-testId="blog-redirect" to={path} />;
};

const handleOnClick = (e, setShow) => {
  if (e.target.id === "delete") setShow(true);
};

const BlogContent = ({ post, user, setDel }) => {
  const [delError, setDelError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wantsEdition, setWantsEdition] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wantsDelete, setWantsDelete] = useState(false);

  if (post === undefined)
    return (
      <Card.Body>
        <Alert variant="danger" className="d-lg-block">
          Wystąpił błąd podczas ładowania zawartości bloga.
        </Alert>
      </Card.Body>
    );
  if (wantsDelete)
    handleDeletion(
      setWantsDelete,
      post.id,
      user.token,
      setDelError,
      setSuccess,
      setDel
    );

  const { username } = post.author;
  return (
    <Card>
      {post.header !== null && post.header !== "" ? (
        <Card.Img
          variant="top"
          src={`${proxy.plain}${post.header}`}
          alt="Nagłówek posta"
        />
      ) : (
        <Card.Header />
      )}
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={setWantsDelete}
        question={"Czy na pewno chcesz usunąć ten post?"}
      />
      <Card.Body className="post_content mx-4">
        {delError ? (
          <Alert variant="danger">Wystąpił błąd podczas usuwania posta.</Alert>
        ) : success ? (
          <Alert variant="info">Ten post został usunięty.</Alert>
        ) : null}
        <Card.Title as="h1" className="post_title">
          <Row>
            {post.title === "" ? "Tytuł posta" : post.title}
            {renderButtons(
              user,
              post.author,
              setWantsEdition,
              success,
              setShowModal
            )}
          </Row>
        </Card.Title>
        <Card.Subtitle as="h6" className="text-muted mb-4 mt-2">
          Kategoria: {post.category}
        </Card.Subtitle>
        <div className="blog_content_text text-justify">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <p className="post_taglist mt-5">
          <em>tagi: {renderTags(post.tags)}</em>
        </p>
      </Card.Body>
      <Card.Footer className="blogpost_summary">
        <Row>
          <Col className="mx-3">
            <Row className="">{`Autor: ${username}`}</Row>
            <Row>{`Opublikowano: ${getDateString(post.creationDate)}`}</Row>
          </Col>
          <div className="post_comment_counter">
            <Row className="text-right mx-3">
              Liczba komentarzy: {post.comments.length}
            </Row>
          </div>
        </Row>
        {renderRedirect(wantsEdition, post.id)}
      </Card.Footer>
    </Card>
  );
};

export default BlogContent;
