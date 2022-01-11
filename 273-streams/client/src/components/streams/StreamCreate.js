import React from "react";
import { connect } from 'react-redux';
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

//On this component, we create streams, that will be sent to the api with an axios post request.

class StreamCreate extends React.Component{

  onSubmit = formValues => {//formValues is actually the data from the redux form, that was typed in by the user, who wanted to create this way a new stream
    this.props.createStream(formValues);
    /*
    This createStream action creator is in the redux. We received it with connect(). We must send this createStream
    to the StreamForm component, so StreamForm could send the data to the api. We are sending createStream through props.
     */
  }

  render() {
    return (
      <div>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream } )(StreamCreate);
