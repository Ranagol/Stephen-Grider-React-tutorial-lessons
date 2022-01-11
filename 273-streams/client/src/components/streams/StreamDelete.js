import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component{
  componentDidMount() {
    const { id } = this.props.match.params;//getting the id of the stream that should be deleted
    this.props.fetchStream(id);//on load fetch the stream meant to be deleted
  }

  /*
  Modal needs to be reusable for different scenarios. Therefore, we don't use hardcoded modal header, modal actions
and modal content, delete or cancel buttons or built in onClick functions. Instead, we send all this through props, from the parent component
(who is actually initiating the modal).
The only challenging thing here is to pass the buttons, as jsx. The buttons will be defined as jsx, stored in a variable in
the parent component, and also sent through props.
   */
  renderModalActions(){//in the modal action there are two options delete and cancel. Here we send the Delete and the Cancel button as jsx.
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id) } className="ui button negative">Delete</button>
{/* this.props.deleteStream(id) --- this will activate deleteStream immediatelly when the component is rendered. Here we don't want this.
() => this.props.deleteStream(id) --- this will activate deleteStream on click when a click happens on the delete button. We want this. */}
        <Link to="/" className="ui button">Cancel</Link>
        {/* With the cancel button we want the user just to be navigated to the / page. So, here we simple just use a Link tag with to=...*/}
      </React.Fragment>
    );
  }

  /*
We want to display the stream title in the modal. But, in the beginning, at the first
rendering we actually may not have any stream details. So there will be nothing to display
So the plan is: if there is a stream detail, we will display something like
"Are you sure you want to delete this stream with the title *streamTitle*?
But if there are not stream details, then we will display only a static text,
like: "Are you sure you want to delete this stream?" All this will be handled with
the renderModalContent().
   */
  renderModalConfirmation() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete this stream with title: ${this.props.stream.title} ?`
  }

  render() {
    return (
      <div>
        <div>StreamDelete component</div>
        <Modal
          title="Delete stream"
          content={this.renderModalConfirmation()}
          actions={this.renderModalActions()}
          navigateTheUser={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    stream: state.streams[id],//all stream objects are under keys that are = to their ids.
    //this why we can do what we did here with the stream: state.streams[id]. We say here
    //give me the stream under this key.
  }
}

export default connect(mapStateToProps, { fetchStream, deleteStream }) (StreamDelete);
