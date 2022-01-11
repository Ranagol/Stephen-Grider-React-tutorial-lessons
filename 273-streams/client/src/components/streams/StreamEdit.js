import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from "../../actions";//wiring an action creator STEP 1: import
import StreamForm from "./StreamForm";
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {//we want get the stream for editing when this component is rendered
    const id = this.props.match.params.id;//...but for this we need the id of the stream. We can get the id from the url (looks like: http://localhost:3000/streams/edit/7)
    this.props.fetchStream(id);//wiring an action creator STEP 3: use it.
  }
  /*
  StreamEdit component is using a reusable redux from component StreamForm for editing. StreamForm is also used by
  StreamCreate, for creating streams. Now, this StreamForm component is actually wrapped by ReduxForm.
  Reminder: StreamForm exporting looks like this:

  export default reduxForm({//the StreamForm is first wrapped into redux form, and than exported
    form: 'streamForm',//we put here the name of the component
    validate: validate,//dear redux form, please validate the input forms with the validate const, that is a couple of lines above
  })(StreamForm);

  So, whatever we send through props from StreamEdit to StreamForm, that first have to go through ReduxForm. And then,
  ReduxForm passes the data to StreamForm.
  There are some special props can be send to the ReduxForm directly. One of them is initialValues. Whenever we open an EditStream
  component, we expect the editable stream to be already displayed. Aka, the forms must have initial values. And this is
  what the initialValues prop is doing: setting some initial values in the redux form.

   */

  onSubmit = (formValues) => {
    //console.log('onSubmit() from StreamEdit', formValues);
    const id = this.props.match.params.id;
    this.props.editStream(id, formValues);//editStream() was placed into props by connect(). We are sending our edited
    //data to the api here.
  }

  render() {
    //console.log('Props from StreamEdit', this.props);
    if(!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Stream editing</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, 'title', 'description')}//we are sending only the selected stream object properties with _.pick as an initial values to Fields
/*
  In the StreamForm we have two <Field/> One is named title, the other one is named description. The first things these
  Fields will do is to search for initialValues in their components props. If there is a title and a description in the initialValues
  then Field will use them as initial values. And this is cool. We can put into the initialValues the whole stream object,
  Field will find the title and the description by itself.
  But, we have a new problem now. Since we are sending the whole stream object (that beside title and description also
  contains stream id, userId) to the Fields, that also means that we will send title, description, id, userId in the formValues to the
  backend, as edited modified properties. Remember, we wanted to edit only the title and the description. Some backend
  will make problem, like this: 'Yo, you can't edit the id of the stream, or change the owner of the stream just like
  that!'.
  Solution: we need to send only selected properties of the stream object as initial value. We can do this manually
  like typing only the desired properties of the stream object into the initial values. But what if there are many
  desired properties? Then, we could use lodash _.pick.
 */
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    stream: state.streams[props.match.params.id],//all stream objects are under keys that are = to their ids.
    //this why we can do what we did here with the stream: state.streams[props.match.params.id]. We say here
    //give me the stream under this key.
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);//wiring an action creatorSTEP 1: connect with redux state
