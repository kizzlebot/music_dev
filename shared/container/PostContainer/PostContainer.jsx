import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

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
      this.props.dispatch(Actions.fetchPosts());
    }
  }


  add(name, title, content) {
    this.props.dispatch(Actions.addPostRequest({ name, title, content }));
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
        <Header onClick={this.handleClick} />
        <div className="container">
          <PostCreateView addPost={this.add} showAddPost={this.state.showAddPost}/>
          <PostListView posts={this.props.posts}/>
        </div>
        <Footer />
      </div>
    );
  }
}

PostContainer.need = [() => Actions.fetchPosts()];

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
    posts: store.posts,
  };
}


export default connect(mapStateToProps)(PostContainer);
