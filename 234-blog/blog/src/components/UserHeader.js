import React from "react";
import { connect } from 'react-redux';//connect is needed to connect this component with redux
import { fetchUser } from "../actions";

class UserHeader extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);//the userId was received from PostList thorugh props...
  }

  render() {
    const { user } = this.props;//this is equal to const user = this.props.user

    if (!user) {//for the very first time, there will be no user. So.
      return null;//we want to do nothing, an exit from render. That's why we use return null.
    }

    return <div className="header">{user.name}</div>
  }
}

const mapStateToProps = (state, ownProps) => {//ownProps is a simple copy of the real props, and like this, our mapStateToProps  has acces to a copy of the props.
  //below we find the specific user that we want to display, with the find() JS built in method
  return { user: state.users.find(user => user.id === ownProps.userId)};//so from 100 users we selected one user here with .find
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);
