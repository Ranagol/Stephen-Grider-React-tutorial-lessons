import React from "react";
import Field from './Field';
import Button from './Button'

//UserCreate component does nothing. But it has the two components, who will be receiving data from context.
const UserCreate = () => {
  return (
    <div className="ui form">
      <Field />
      <Button />
    </div>
  );
}

export default UserCreate;

