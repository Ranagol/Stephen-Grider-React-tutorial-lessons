import React from "react";
import { connect } from 'react-redux'
import { fetchStream} from "../../actions";

class StreamShow extends React.Component{
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  render() {
    //Always do this trick. If there is no stream in the props (which will happened when the component is mounted)
    //then just return this Loading..., untill the stream arrives from the api.
    if(!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream

    return(
      <div>
        <h1>StreamShow component</h1>
        <h2>Title: {title}</h2>
        <h5>Description: {description}</h5>

      </div>

    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    stream: state.streams[id],
  }

}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
