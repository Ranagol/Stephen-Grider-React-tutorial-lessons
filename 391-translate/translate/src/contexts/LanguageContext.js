import React from "react";

const Context = React.createContext('english');

class LanguageStore extends React.Component {
  state = { language: 'english' };

  changeLanguage = language => {
    this.setState({language});//key is language, value is language, so we just put language here
  }

  render() {
    return (
      // here, below we are creating a new object from the state and the changeLanguage function
      <Context.Provider value={{...this.state, changeLanguage}}>

      </Context.Provider>



    );
  }
}
