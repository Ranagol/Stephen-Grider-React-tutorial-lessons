import React, { useState } from "react";

const Accordion = ( { items }) => {//the { items } is = to props.items. We do destructuring here.
  const [activeIndex, setActiveIndex] = useState(null);//this will create a new piece of state. Here we are creating a two new constants with array destructuring.

  const onTitleClick = (index) => {
    console.log('Title clicked', index);
    setActiveIndex(index);//the setActiveIndex will be used to set the activeIndex.
  }

  const renderedItems = items.map( (item, index) => {//this is how we can get the index number of our item.
    // The original items array has three item objectst. These will be indexed az 0,1,2...
    const active = index === activeIndex ? 'active' : '';//this decides if we should use the active className.
    // If the item index is === activeIndex, then 'active' goes into the className.

    return (
        <React.Fragment key={ item.title }>
          {/*React.Fragment is just used here as a main wrapper div. Because of the map() it must have a key, which will be the index.
          Below we use onClick={ () => onTitleClick(index). Since we use here an arrow function ()=>
          In these divs below, the active attribute is expanding or hiding the answer. No active = no answer.
          The active classname should be applied only on the div that is clicked.*/}
          <div
            className={`title ${active}`}
            onClick={ () => onTitleClick(index) }
          >
            {/*TITLE = QUESTION*/}
            <i className="dropdown icon"></i>
            {item.title}
          </div>
          <div className={`content ${active}`}>
            {/*CONTENT = ANSWER*/}
            <p>{ item.content }</p>
          </div>
        </React.Fragment>
    );
  });

  return <div className="ui styled accordion ">
    { renderedItems }
  </div>

};

export default Accordion;


