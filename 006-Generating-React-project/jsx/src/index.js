//import the React and ReactDOM libraries. Difference between import and require: for ES2015 we use import. For Common JS modules we use require.
import React from 'react';
import ReactDOM from 'react-dom';

//Create a react component
const App = function(){
  //We can put variables into jsx, like here, below:
  const buttonText = { text: 'Click me' };
  const labelText = 'Enter name:';
  //These variables could be strings, integers, key-values from json objects, arrays...
  //This is how we can pass a function into the jsx
  function getTime(){
    return (new Date().toLocaleDateString());
  }

  return (
    //this below is jsx. It looks like html, but it is not html. Babel can transform this jsx to JavaScript.
    <div>
      {/*In jsx we use className instead of class.*/}
      <label className="label" htmlFor="name">
        {labelText}
      </label>
      <input id="name" type="text" />
      {/*This below is a template for inline styling in jsx.*/}
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        {/*here the { } is not a JS object. Here the {} means that we will use a constant variable. We can call functions here too.*/}
        {buttonText.text}
      </button>
      <h4>{ getTime() }</h4>
    </div>
  );
}


//Take the react component and show it on the screen
ReactDOM.render(
  <App/>,
  document.querySelector('#root')//this connect to the #root div in our index.html
);
