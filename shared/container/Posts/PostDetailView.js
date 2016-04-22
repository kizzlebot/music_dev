import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';







class PostDetailView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showAddPost: true,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="single-post post-detail">
            <h3 className="post-title">{this.props.post.title}</h3>
            <p className="author-name">By {this.props.post.name}</p>
            <p className="post-desc">{this.props.post.content}</p>
          </div>
        </div>
      </div>
    );
  }
}








PostDetailView.need = [(params) => {
  return Actions.post.getPostRequest.bind(null, params.slug)();
}];

PostDetailView.contextTypes = {
  router: React.PropTypes.object,
};

PostDetailView.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    post: (store.posts.post),
  };
}

export default connect(mapStateToProps)(PostDetailView);
