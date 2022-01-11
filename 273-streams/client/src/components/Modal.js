import React from "react";
import ReactDOM from 'react-dom';//ReactDOM is only imported in the base component... and here in a modal component.
import history from "../history";

/*
What is a modal? The modal is when the user is prompted form an action confirmation, while all the background is dimmed,
and the user is asked for example: are you sure you want to delete this? Yes/no/cancel.
The modal issue: the modal is a pop up window. Example, when deleting, the modal pops up, and asks if we are sure, are
we really want to delete? YES NO. This is a modal.
Problem with modals: If the StreamDelete component displays a modal directly, there will be a problem. Because the
StreamDelete component sits on bunch of other components, and has inherited a bunch od CSS code from these other
components. Thing can go sideways.
Solution: StreamDelete should call a modal, and this modal should not be attached to StreamDelete (who already has
inherited a lot of CSS), but to the main base <body> tag of the app, that most surely didn't inherit CSS from anybody.
Modal will become a direct child of the body. To achieve this, we use portals.
Here we are building a reusable modal component, that could be used by multiple components.
Modal needs to be reusable for different scenarios. Therefore, we don't use hardcoded modal header, modal actions
and modal content, delete or cancel buttons or built in onClick functions. Instead, we send all this through props, from the parent component
(who is actually initiating the modal).
The only challenging thing here is to pass the buttons, as jsx. The buttons will be defined as jsx, stored in a variable in
the parent component, and also sent through props.
 */

const Modal = props => {
  return ReactDOM.createPortal(//this creates the portal. Receives 2 arguments. Notice the , between the two arguments.
    //1. the actual jsx that is the modal
    <div
      onClick={props.navigateTheUser}
      className="ui dimmer modals visible active"
    >{/*
    this div creates the dim modal background. If the user clicks on this div (which is basically the dim background),
    we want the user to be pushed back to '/' page, where all streams are listed. But we have a problem.
    Right now, wherever we click (modal window, Delete
    or Cancel button, the use will be pushed to page '/'. But we wanted the user to be pushed to '/' only if he click on
    th dim div background. The reason for this is event propagation. Description for event propagation:
    https://www.freecodecamp.org/news/a-simplified-explanation-of-event-propagation-in-javascript-f9de7961a06e/
    If we click on some child html element that doesn't have an event handler, this event click will bubble up to a parent
    html element, that has the right event handler.
    In order to stop this event propagation, we use onClick={(event) => event.stopPropagation() in the immediate child
    element above (see the code below this). This will stop the event bubbling up.
    */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="ui standard modal visible active"
      >
        <i
          onClick={()=> history.push('/')}
          className="close icon"
        ></i>
        {/*the code line above it the x button cancel option. On click on the X, go to /. */}
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    //2. which html element we want to attach our modal. This will be a <div id="modal"></div> in main index.html
    document.querySelector('#modal')
  );
};

export default Modal;
