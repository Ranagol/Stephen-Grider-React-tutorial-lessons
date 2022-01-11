import React from "react";
import LanguageContext from "../contexts/LanguageContext";

//Do not mix this simple Field class with Field from redux form!!!!!! This here is just a simple class named Field!
//The Field will get data from context with this.context, the Button will get data from context with Consumer
class Field extends React.Component {
  static contextType = LanguageContext;//1 STEP how to get data from context
  /* with this we connect this Button component to the LanguageContext.
  This property always has to be called contextType.
  This LanguageContext is now a property of this Button class. With this, now we have access to this.context.
  Aka we can use this.context. Or otherwise, we get data from context. */

  render() {
    const text = this.context === 'english' ? 'Name' : 'Naame';//2 STEP how to get data from context

    return (
      <div className="ui field">
        <label>{text}</label>
        <input type="text"/>
      </div>
    );
  }
}

export default Field;
