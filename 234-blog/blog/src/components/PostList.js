import React from "react";
import { connect } from 'react-redux';//connect is needed to connect this component with redux
import { fetchPostsAndUsers } from "../actions";//this is an action creator
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Props from PostList:', this.props);
    console.log('Posts from PostList:', this.props.posts);
  }

  // 2. the render() simply calls { this.renderList() }
  renderList() {
    // 3. (aka the first return). Using .map here. Saying: for every post...

    return this.props.posts.map(post => {
      //4. (aka the second return). We return the JSX here with displaying { post.details }
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user"></i>
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });

  }

  // 1. the render() - the main actor in displaying
  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

//1. Here we set up what we want to receive from the state to the props, and under what key
const mapStateToProps = state => {//here we are using the complete state from the redux as an argumet
  return { posts: state.posts };//here we are making a posts key in the props = with state.posts
}

//2. But the connect() is the one, who executes what we want in the mapStateToProps
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);//{ fetchPosts } is an action. With this use of the connect, the fetchUser action will be available in this components props.
