import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedComents,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);

    return () => {};
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedComentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  let comments;

  if (status === "pending")
    comments = (
      <div className={"centered"}>
        <LoadingSpinner />
      </div>
    );

  if (
    status === "completed" &&
    loadedComents &&
    loadedComents.length > 0
  )
    comments = <CommentsList comments={loadedComents} />;

  if (
    status === "completed" &&
    (!loadedComents || loadedComents.length === 0)
  )
    comments = (
      <p className={"centered"}>no comments were added yet</p>
    );

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedComentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
