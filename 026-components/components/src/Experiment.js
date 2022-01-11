import React from "react";

//insert Experiment into App
//use props
//send a function through props
//use data from variables
const buttonText = 'Text for a button';

const Experiment = ( props ) => {
  return (
    <div>
      <div>This is my experiment.</div>
      <div>{ props.random }</div>
      <button>{ buttonText }</button>
    </div>
  );
}

export default Experiment;
