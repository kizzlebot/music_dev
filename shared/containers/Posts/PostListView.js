import React, { PropTypes } from 'react';
import PostListItem from '../../components/Posts/PostListItem';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

function PostListView(props) {
  return (
    <div className="listView">
      {
        props.posts.map((post, i) => (
          <PostListItem post={post} key={i}
            onClick={function handleClick() {
              props.dispatch(Actions.post.addSelectedPost(post));
            }}
            onDelete={function handleDelete() {
              if (confirm('Do you want to delete this post')) { // eslint-disable-line
                props.dispatch(Actions.post.deletePostRequest(post));
              }
            }}
          />
        ))
      }
    </div>
  );
}

PostListView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    posts: (store.posts.posts),
  };
}


export default connect(mapStateToProps)(PostListView);
