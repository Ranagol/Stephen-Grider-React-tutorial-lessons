import React from "react";
import UserCreate from "./UserCreate";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";
import LanguageSelector from "./LanguageSelector";

class App extends React.Component {
  /*
  This app is a very simple app, meant to simulate a creation of a very simple user, who only has name. The app wil have 4 components:
  1. App.js; 2. UserCreate.js; 3. Input field for name; 4. Submit button.
  The user should be able to change the app language from english to dutch, and back. The goal is, to use Context, and
  we want the App.js component to communicate with Field and Button, without involving  UserCreate, but directly. When the
  language changes from english to dutch, we want to see 'naame' instead of name on the input field, and 'blabla'
  instead of Submit on the button. All this will be handled with the LanguageContext.
  OK, there is another task for this app. The button text color should alter between blue and red.
  The color changing will be handled with ColorContext. We will have to change the className of the
  button from primary (which is blue color) to red (which is ... red color :) ).
   */
  state = {//this is a simple component level state
    language: 'english',
    color: 'red',
  };

  changeLanguage = language => {
    this.setState({ language: language})
  };

  changeColor = color => {
    this.setState({color: color})
  }

  render() {
    return (
      <div className="ui container">
        {/*LANGUAGE SELECTION*/}
        <LanguageSelector changeLanguage={this.changeLanguage} />
        <hr/>
        {/* The UserCreate component actually has nothing to do with context. We are passing
         info to the UserCreate component because this component contains the Button and the
         Field component, which are actually waiting for the data from the context. */}
        {/* Below we are passing the App state data to the Provider and the Provider
        is updating the context object. The Button and the Field components will now
        get this updated context object. There could be more than one LanguageContext.Provider
        elements here. In this case, these LanguageContext.Provider will have separated
        stream of data - could use different input values.
        LanguageContext.Provider will create a new UserCreate component,
        TWICE. Every Provider is creating a separated pipe of information. */}
        {/* Also, below we have a case when the UserCreate is receiving context data from
         two different contexts: color and language. This is the reason why is the UserCreate
         component wrapped into two Context.Provider tags. The order of the wrapping does not
         matter. */}
         <div>
           {/*COLOR SELECTION*/}
           Select a color:
           <div onClick={() => this.changeColor('green')}>Make it green</div>{/*by clicking on this flag, the user can select the relevant color to display*/}
           <div onClick={() => this.changeColor('red')}>Make it red</div>{/*by clicking on this flag, the user can select the relevant color to display*/}
         </div>
        <hr/>

        {/*sending the color data to the consumer*/}
        <ColorContext.Provider value={this.state.color}>{/*sending the color data to the consumer*/}
          <LanguageContext.Provider value={this.state.language}>{/*sending the language data to the consumer*/}
            <UserCreate />{/*the Field and the Button consumers are in this UserCreate component*/}
          </LanguageContext.Provider>
        </ColorContext.Provider>
      </div>
    );
  }
}

export default App;
