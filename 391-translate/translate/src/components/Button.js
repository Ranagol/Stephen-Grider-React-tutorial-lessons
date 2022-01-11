import React from "react";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class Button extends React.Component {
//The Field will get data from context with this.context, the Button will get data from context with Consumer
  renderButtonText(languageValue) {
    return languageValue === 'english' ? 'Submit' : 'Voorleggen';
  }

  renderButton(colorValue) {
    return (
      <button className={`ui button ${colorValue}`}>
        <LanguageContext.Consumer>
          { (languageValue) => this.renderButtonText(languageValue) }
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    /*
    About the order of the Consumer tags(which Consumer should go outside?): the ColorContext is outside of the button,
    because it has to manipulate the button className. The LanguageContext is inside the
    button, where the static button text ought to be - since it is manipulating this text.
    */
    return (
      <ColorContext.Consumer>
        {colorValue => this.renderButton(colorValue)}
      </ColorContext.Consumer>
    );
    {/*
    value here is = to value in the context. When we use <...Consumer>, there will be
    always an arrow function in between the opening and the closing tag, that will take the value from context, and do something with it.
    Right now, we are using a simple helper function renderButtonText() to decide what text should be
    on the button.

    Why use </...Consumer> when we can use the other, 'this.context' aproach?
    this.context is used when we are accessing a single context object.
    </...Consumer> is used when we have multiple context objects.
    */}
  }
}

export default Button;

