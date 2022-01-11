import React from "react";

//below we received the props as argument.
// Actually we received the whole CommentDetails component as props. Warning: it is not like in Vue!
const ApprovalCard = (props) => {
  return (
    <div className="ui card">
      {/*Below: this is how we can display the props/CommentDetail data. CommentDetail was given as a prop
      to the ApprovalCard.*/}
      <div className="content">{ props.children }</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalCard;
