import React from "react";

//This is how we receive props info from the parent component.
const CommentDetail = (props) => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img src={ props.avatar } alt="avatar"/>
      </a>
      <div className="content">
        <a href="/" className="author">
          {/*Below: this is how we use the data from the props*/}
          { props.author }
        </a>
        <div className="metadata">
          <span className="date">{ props.date }</span>
        </div>
        <div className="text">{ props.text }</div>
      </div>
    </div>
  );
}

//this is how we can export a component, in order to later import it somewhere
export default CommentDetail;
