import React from "react";

class ImageCard extends React.Component {

  //We create refs in the constructor, assign then to instance variables, then pass to a particular JSX element as props.

  constructor(props) {
    super(props);//this is mandatory for every constructor.
    this.state = { spans: 0 }
    this.imageRef = React.createRef();//here we are creating a ref

  }

  componentDidMount() {//as soon as the component is mounted...
    this.imageRef.current.addEventListener('load', this.setSpans);//we use here a plain vanilla JS event listener, that listens to loading. When loading happens, the event listener will emit a 'load' event. Only after this can we get the actual height of the image.
    // So, the 'load' event will activate the setSpans() function.
  }

  setSpans = () => {
    console.log(this.imageRef.current.clientHeight);
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10 );
    this.setState({ spans: spans})
  }


  render() {
    const { description, urls } = this.props.image;//create two const. const description = this.props.image.description
    //... and const urls = this.props.image.description. So from now on, we can simply use description and urls variables
    return (
      <div style={{ gridRowEnd: `span ${ this.state.spans }`}}>
        <img
          ref = { this.imageRef }//we created a ref in the constructor. Now we are passing this ref as a property to the img element
          alt={ description }
          src={ urls.regular }
        />
      </div>
    );
  }


}

export default ImageCard;
