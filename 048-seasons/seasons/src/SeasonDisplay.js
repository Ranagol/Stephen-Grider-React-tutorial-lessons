import './SeasonDisplay.css';//this is how we can import a css file.Webpack will add this css file to index.html
import React from "react";

/*
This app will be able to determine the location of the user, and based on this location it will be able to determine
if it is summer or winter at his place. If it is summer, the app will show a sun icon with orange background, and if
it is winter, the app will show a snowflake icon with bluish background.
 */

const seasonConfig = {//this is a function component
  summer: {
    text: 'Lets hit the beach!',
    iconName: 'sun'
  },
  winter: {
    text: 'Burr, it is chilly.',
    iconName: 'snowflake'// snowflake and sun are classnames in the ui boostrap copy
  }
};

//On the north hemisphere, months from April till September are counted as summer. This is for simplicity just.
const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {//months 3 - 8 are counted here as summer for simplicity
    return lat > 0 ? 'summer' : 'winter';//latitude for north pole goes from 0 till +90, for south pole goes from 0 till -90
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
}

//this below is the actual React component. Above this are helper functions, config stuff...
const SeasonDisplay = (props) => {//receiving the props as argument from the parent
  const season = getSeason(props.lat, new Date().getMonth());//this will be either summer or winter. getMonth() will produce an integer, but getSeason will create a summer or winter from the integer.
  const { text, iconName } = seasonConfig[season];//{ text, iconName } is destructuring. We are saying here: just take the text and the iconName from the seasonConfig. season is either summer or winter.
  console.log(season);
  console.log(props.lat);
  return (
    <div className={`season-display ${season}`}>
      {/*below, this is how we can print out a variable into a className. Expected example: className = snowflake icon*/}
      <i className={`icon-left massive ${iconName} icon`}/>
      {/*below, this is how we can print out a variable into the DOM*/}
      <h1>{ text }</h1>
      <i className={`icon-right massive ${iconName} icon`}/>
    </div>
  );
}

export default SeasonDisplay;
