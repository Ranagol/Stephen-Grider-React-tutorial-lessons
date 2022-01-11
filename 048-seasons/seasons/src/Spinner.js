import React from "react";

const Spinner = (props) => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
        {/*If there is a message in the props, from the parent, then this message will be used here, below.
        But if there is no message, then the defaultProps message will be used.*/}
        { props.message }
      </div>
    </div>
  );
};

Spinner.defaultProps = {//here we set up a default value for the props. Default value will be used, if there is nothing else to use, so in the last case.
  message: "Loading..."
};

export default Spinner;
