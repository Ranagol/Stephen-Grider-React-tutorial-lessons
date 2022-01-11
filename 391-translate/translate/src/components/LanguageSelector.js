import React from "react";

class LanguageSelector extends React.Component {
  render() {
    return (
      <div>
        Select a language:
        <i
          onClick={() => this.props.changeLanguage('english')}
          className="flag us"
        ></i>{/*by clicking on this flag, the user can select the relevant language to display*/}
        <i
          onClick={() => this.props.changeLanguage('dutch')}
          className="flag nl"
        ></i>{/*by clicking on this flag, the user can select the relevant language to display*/}
      </div>
    );
  }
}

export default LanguageSelector;
