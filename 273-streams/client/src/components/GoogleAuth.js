import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {

  /*
  Original gapi commands relevant to us (they can be used through console, if the gapi is set up):
  gapi.auth2.getAuthInstance().isSignedIn.get()//this will return true if the user is signed in
  gapi.auth2.getAuthInstance().signOut()//will sign out
  gapi.auth2.getAuthInstance().signIn()//will sign in
  gapi.auth2.getAuthInstance().currentUser.get()//will get the current user
  gapi.auth2.getAuthInstance().currentUser.get().getId()//will get the Google id of the user
  We will use these commands in our app. But we will assign the auth instance to a simple auth const.
   */

  componentDidMount() {
    //gapi is the google api. When running first time, gapi needs time to get data from google.
    // When he finishes this, then it will call a callback function.
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '222542744829-8hjvpia3ipfk0j508nld1tmgfo2egaf9.apps.googleusercontent.com',
        scope: 'email'//scope is the part of the users profile, that we want to get access to. We need only the email here, this time.
      })
        //BELOW WE SET OUR STATE
        .then(() => {//window.gapi.client.init is reurning a promise, and that is why we can use .then here
          //console.log('gapi library is ready to work!');
          this.auth = window.gapi.auth2.getAuthInstance();//here we getting access to our auth object. We assign the instance object to the auth const. We will use this auth later.
          this.onAuthChange(this.auth.isSignedIn.get());//we inherited from gapi this function, which we are using to check if the user is signed in
          this.auth.isSignedIn.listen(this.onAuthChange);//listen is an event listener, that comes with this package.
      });
    });
  }

  onAuthChange = (isSignedIn) => {//isSignedIn will be true of false
    //console.log('onAuthChange activated and the value of isSignedIn is', isSignedIn);
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());//signIn() is an action creator. this.auth.currentUser.get().getId() will get the users Google id.
      //console.log('Sign in action creator activated');
    } else {
      this.props.signOut();
      //console.log('Sign out action creator activated');
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(){
    //console.log('this.props.isSignedIn from renderAuthButton()', this.props.isSignedIn);
    if(this.props.isSignedIn === null) {
      //console.log('It seems like the this.props.isSignedIn === null which is not good')
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps state from GoogleAuth', state);
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
