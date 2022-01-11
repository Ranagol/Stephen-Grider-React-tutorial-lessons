import React from "react";
import unsplash from "../api/unsplash";//we are using a pre-configured copy of axios here
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

/*
This app can retrieve pictures from www.unsplash.com. It has a searchbar, and the user can type in here what kind of
pictures he wants. Example: if he types in 'robots', he will get robot pictures. We use axios here, to get data (pictures)
from unsplash.
 */


class App extends React.Component {
  state = { images: []};
  onSearchSubmit = async (term) => {//this onSearchSubmit() will be sent to the child SearchBar through props, and it will be triggered there, when the user types in something
    //When the user types in an image keyword request, we will make an axios request...
    const response = await unsplash.get('https://api.unsplash.com/search/photos', {//note that we wrote unsplash.get here instead of axios.get
      params: { query: term },//term is the string that the user types in
    });
    //after we get the response, we put it into the state -> this will re-render everything
    this.setState({images: response.data.results });
    console.log(response.data.results);
  }

  //whenever we make an axios request, it returns an promise object. A promise object will give us a little notification
  //when this axios request is actually completed (and we received our wished data) at some point later. But to send a request, receive a response...
  //it takes time.

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px'}}>
        {/*This onSubmit below could be called anyway we want to. This is just a key in the props, that stores this function.*/}
        <SearchBar onSubmit = { this.onSearchSubmit } />{/*Here we are sending the onSearchSubmit through props to the child component*/}
        <ImageList images = { this.state.images }/>{/*  sending the images from the state to the ImageList child*/}
      </div>
    );
  };
}

export default App;
