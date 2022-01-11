import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";//this will display the season things
import Spinner from "./Spinner";//this will show the Loading... component

class App extends React.Component {//this is a class based component. The SeasonDisplay is a function component.

  state = { lat: null, errorMessage: '', };//we are setting up the state here: latitude and errorMessage.

  componentDidMount() {//when the component is mounted, the geolocation search will kick in automatically
    //this part is doing the geolocation. The getCurrentPosition() needs time to find the position. By default the
    //geolocation works with two callback functions as argument, one for success, one for failure.
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),// This will be called in case of success. We get the position as argument from the getCurrentPosition(). setState() was inherited from React
      error => this.setState( { errorMessage: error.message })//This will be called in case of failure. The error argument is from getCurrentPosition()
    );
  }

  renderContent(){//this is just a helper function for render(). The issue: we want a red border for all 3 if cases.
    //But, we don't want code triplication. No-no! Solution: we put a red border into the render(), and inside that div
    //we return the renderContent(), that contains the 3 if cases. We must not have multiple if cases in the render!
    if( this.state.errorMessage && !this.state.lat) {//there is an error message, and no latitude
      return <div>Error: { this.state.errorMessage }</div>
    }

    if( !this.state.errorMessage && this.state.lat) {//there is no error message but there is a latitude
      return <SeasonDisplay lat={this.state.lat}/>//using props to send the latitude info to the child SeasonDisplay
    }

    return <div><Spinner message = "Please accept location request."/></div>//we will show this while we are waiting for the allow/block from the user
  }

  render() {//this is a mandatory function always
    return (
      //below is the div with the red border. This red border we want to see always. We must not have multiple if cases in the render!
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  };
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
