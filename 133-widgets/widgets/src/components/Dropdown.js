import React, { useState, useEffect, useRef } from 'react';//1 step for any hook: import it
//Quick note: this component is a child component. It receives what to display, what is the selected color from the parent App component, through props. Because we want this component to be reusable.
/*
useRef topic.
The main issue is that although our Dropdown menu can be opened and closed if we click on the Dropdown, but if it is open, it won't close, if we click on somewhere else. The Dropdown component can't hear the event listeners that are not in the Dropdown component (example, event listeners that are in the App.) But we want to do exactly this.

Event bubbling topic
When a user clicks on a html tag, that has onClick event listener, than the browser creates an event object, and gives this event object to React, and React puts this event object into the event listener. But, this event object is not stopped here. After all this happened, the event object bubbles up to the next parent html element, and the next one... Up untill the body element. So, a click on any element will eventually but most certainly bubble up to the body. The Dropdown component can set up a manual event listener (without React) on the body element.
Now, currently we have 3 event listeners in our app.

What is the order of the event listener reaction to a click in the Dropdown?
1-manual event listener
2-onClick={() => setSelectedColor(option)} - this sets the color on click
3-onClick={() => setOpen(!open) } - opens/closes Dropdown options
If a click happens the event listener triggering order will be the next: 1,2,3. Why?
On every click, the 1 will be called first, because it has addEventListener. addEventListener always activates first. The second will be the 'youngest' child... And so on.

How to figure out what element was clicked?
console.log(event.target);//this is the answer.

How to figure out if the clicked element is belonging to the Dropdpwn or not?
We will use useRef hook. We will put this useRef into the top level Dropdown element, and with this we will be able to see if the clicked element is belonging to Dropdown or not.

*/

const Dropdown = (props) => {
    const { options, selectedColor, setSelectedColor } = props;
    const [ open, setOpen ] = useState(false);//open here should mean if the Dropdown optins are visible. Open = visible = true.

    const ref = useRef();//2 step for useRef. this will create a ref? object. We will assing it to the oldest parent element of the Dropdown component.

    useEffect(() => {//we want this useEffect run only once, during rendering. Its job will be to put an event listener to the body html tag, that will be able to receive a bubbled up event object that happened NOT in the Dropdown component.

        document.body.addEventListener('click', (event) => {//1-manual event listener
            console.log('1-Manual click listener in the body was activated with the bubble up effect.');
            console.log(event.target);//this is an awsome trick to see what html element was clikecd with the mouse. So event.target is used for this.

            if (ref.current.contains(event.target)) {//this line checks if the clicked element is inside of our Dropdown component, and if so... The contains() is a DOM element method, that allows us to check if one DOM element contains another DOM element.

                return;//...then just do nothing, return, and with this prevent the setOpen(false); line to happen at all, aka prevent closing the Dropdown options.
            }
            setOpen(false);//this will just close our Dropdown options
        });
    }, []);

    //console.log('Props checking',setSelectedColor);
    const renderedOptions = options.map((option) => {

        if(option.value === selectedColor.value){
            return null;//we don't want to see the already selected color as a possible selecting option, so...
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => {

                    //console.log('2-item - color setting click');
                    setSelectedColor(option)
                }}
            >
                {option.label}
            </div>
        );
    });

    console.log(ref.current);//4 step. Here we just simply console.log the ref. After the first rendering, with this line here we can get the reference to the oldest Dropdown element, that has the ref={ref}

    return (
        // 3 step for the useRef. ref={ref} here we assigned the ref object to the oldest parent element in Dropdown
        <div
            ref={ref}
            className="ui form"
        >
            <div className="field">
                <label className="label">
                    Select a color:
                </label>

                {/* setOpen(!open) means: set the value of open whatever is the opposite of the open is right now. If it is true, it should become false, and vice versa. Basically, with this onClick we can open and close our Dropdown option display. */}
                <div
                    onClick={() => {
                        //console.log('3-opening/closing click');
                        setOpen(!open)
                    }}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">
                        Currently selected: {selectedColor.label}
                    </div>
                    <div
                        className={`menu ${open ? 'visible transition' : ''}`}
                    >
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;