import React from "react";
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from "./CommentDetail";//this is how we can import a component
import ApprovalCard from "./ApprovalCard";
import Experiment from "./Experiment";

/**
 * App will be the parent. ApprovalCard is the child. CommentDetail is the grandchild.
 *
 */

const App = () => {
  return (
    <div className="ui container comments">
      <Experiment random="This is sent by props" />
      <ApprovalCard>
        ApprovalCard can work also as a simple html tag, it doesn't have to receive props...
      </ApprovalCard>

      {/*Below: this is how we use the CommentDetail component.
      Also, this is how to use props.
      Under avatar there is an example how can we proceed faker data through props.*/}
      <ApprovalCard>
        {/*The CommentDetail is now given to ApprovalCard as a prop*/}
        <CommentDetail author="Sam" date="today" text="Awesome blog" avatar={ faker.image.avatar() }/>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Alex" date="yesterday" text="Great!" avatar={ faker.image.avatar() }/>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Jane" date="tomorrow" text="Who am I?" avatar={ faker.image.avatar() }/>
      </ApprovalCard>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
