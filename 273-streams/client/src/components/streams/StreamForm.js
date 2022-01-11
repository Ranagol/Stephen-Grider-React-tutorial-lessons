//THIS WILL BE A REDUX FORM THAT WILL BE REUSED BETWEEN STREAMEDIT AND STREAMCREATE COMPONENTS
import React from "react";
import { Field, reduxForm } from "redux-form";//importing the redux stuff into this component

class StreamForm extends React.Component{

  //THIS IS USED FOR VALIDATION ERROR DISPLAYING, IF THERE IS A VALIDATION ERROR
  renderError(formProps) {//render in this case means display
    if (formProps.touched && formProps.error) {
      /*
      if there is a validation error (formProps.error) and the input field was touched(formProps.touched)...
      Now, formProps is provided by redux form, and it contains name, value, label, errors of an ... input field redux form in this case.
      Do not mix formProps with formValues. formValues is actually the data from the redux form, that was typed in by the user,
      who wanted to create this way a new stream. So the formValues is the end product of the whole redux form story, what is
      being sent to the receiver parent component.
      When to display the validation error message? There is a formProps.meta.touched boolean thingy.
      If we click into the input field, than click outside the input field, the input field will be
      touched, and the formProps.meta.touched will become true. This is when we want our validation
      to run, and to display validation error message, if there is one.
       */
      return (//...then display this
        <div className="ui error message">
          <div className="header">{formProps.error}</div>
        </div>
      );
    }
  }


  //THIS IS THE ACTUAL INPUT FIELD **TEMPLATE**, IT WILL BE INSERTED INTO <Field> LATER
  //In Devione, we put this into separate file, and we give it a name like SelectField or InputField...
  renderInputFieldTemplate = (formProps) => {//this function will be used as a component for the redux form input tag.
    /*
    So. This will be the input field template. To create a stream, we will need two input fields. One for title, one for description.
    These different input fields will need different labels, values.
    Now. It seems to me that all the formProps story starts here, where the renderInputFieldTemplate() takes the formProps as an argument.
    formProps is provided by redux form, and it contains name, value, label, errors of an ... input field redux form in this case.
    formProps and props are definitely not the same. Now, how does the formProps know about labels, names, values?
    Simple. Where we want to display our redux form input fields **TEMPLATES** , that place will be wrapped with a <Field>
    tag, that will provide name, component and label attributes for every input type.

    These two inputs will be used in the main render(), and they will use this renderInput template.
     */
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off"/>
        {/*below is happening the error display triggering. We call renderError() that is defined above*/}
        <div>{this.renderError(formProps.meta)}</div>
        {/* meta will contain our error messages? */}
      </div>
    );
  }

  /*
  How to handle an actual submit? In the props, there is a handleSubmit(). handleSubmit() is
  provided by redux form. Possibly handleSubmit() will provide the formValues argument for the
  this.onSubmit. Don't forget, formValues are actually containing the string that was typed in by
  the user.
  */
  onSubmit = formValues => {//formValues is actually the data from the redux form, that was typed in by the user, who wanted to create this way a new stream
    this.props.onSubmit(formValues);//this.props.onSubmit is sent either by the CreateStream or by the EditStream through props, and
    //it contains either a createStream or editStream action creator, that will do an axios post request.
  };

  //MAIN RENDER
  render() {
    //console.log('StreamCreate props from render()', this.props);
    return (
      //The first onSubmit is an event handler.
      //handleSubmit() is coming from props, handleSubmit() is provided by redux form. Possibly handleSubmit will provide magically the formValues argument for this.onSubmit.
      //this.onSubmit is defined in this components class, a couple of lines above
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        {/*label below: Redux form will send label, name from here to the formProps */}
        <Field
          {/*
          Now, how does the formProps know about labels, names, values?
          Simple. Where we want to display our redux form input fields **TEMPLATES** , that place will be wrapped with a <Field>
          tag, that will provide name, component and label attributes for every input type.
          */}
          name="title"
          component={this.renderInputFieldTemplate}
          label="Enter title"
        />
        <Field
          name="description"
          component={this.renderInputFieldTemplate}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}


/*
VALIDATION PART. Below is the redux form validation. It is OUTSIDE of the component class. The other part of the validation
code is inside of this class above. The reason: that part is about displaying, if there is a validation error. And because
of this, it has to be in the class {}. Here we just check if there is an error. And if there is, we return the error object
to redux form. This will activated the renderError() function, which will display the validation errors.
 */
const validate = (formValues) => {
  const errors = {};/*if we return this errors {} empty, that will mean for the redux form that
  everything is OK. Now, if we put a key value pair into the errors object, that will mean that
  there is an actual error.
  */
  if(!formValues.title) {//if there is no title...
    errors.title = 'You must enter a title';//...then display this. This errors message here will go to formProps.meta
  }
  if(!formValues.description) {//if there is no title...
    errors.description = 'You must enter a description';//...then display this.
  }

  return errors;//if the errors {} is empty, that means for redux form that there is no error.
}

//EXPORTING, CONNECTING WITH REDUX...
export default reduxForm({//the StreamForm is first wrapped into redux form, and than exported
  form: 'streamForm',//we put here the name of the component
  validate: validate,//dear redux form, please validate the input forms with the validate const, that is a couple of lines above
})(StreamForm);



