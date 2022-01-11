import React from "react";
import './ImageList.css';
import ImageCard from "./ImageCard";//this is the grandchild component
//ImageList is the child
//App.js is the parent

const ImageList = (props ) => {//we receive the images through props, from the App.js parent
  const images = props.images.map((image) => {//we create a NEW array, image by image, with the .map()
    return <ImageCard key = { image.id } image = { image }/>;//and for every image we call the ImageCard grandchild component
  });
  return <div className="image-list">{ images }</div>;
};

export default ImageList;

