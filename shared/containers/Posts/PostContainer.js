import React, { PropTypes, Component } from 'react';
import PostListView from './PostListView';
import PostCreateView from '../../components/Posts/PostCreateView';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
  }



  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.dispatch(Actions.post.fetchPosts());
    }
  }


  add(name, title, content) {
    this.props.dispatch(Actions.post.addPostRequest({ name, title, content }));
    this.setState({
      showAddPost: false,
    });
  }

  handleClick(e) {
    this.setState({
      showAddPost: !this.state.showAddPost,
    });

    e.preventDefault();
  }




  render() {
    return (
      <div>
        <div className="container">
          <PostCreateView addPost={this.add} showAddPost={this.state.showAddPost}/>
          <PostListView posts={this.props.posts}/>
        </div>
      </div>
    );
  }
}




PostContainer.need = [() => Actions.post.fetchPosts()];

PostContainer.contextTypes = {
  router: React.PropTypes.object,
};

PostContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    posts: store.posts.posts,
  };
}


export default connect(mapStateToProps)(PostContainer);
