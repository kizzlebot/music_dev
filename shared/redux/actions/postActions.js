import ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';


/**
 * Actions are payloads of information that send data from your application to your store.
 * They are the only source of information for the store. You send them to the store using
 *   store.dispatch().
 */






export function addPost(post) {
  return {
    type: ActionTypes.post.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id,
  };
}

export function changeSelectedPost(slug) {
  return {
    type: ActionTypes.post.CHANGE_SELECTED_POST,
    slug,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/posts/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  return {
    type: ActionTypes.post.ADD_SELECTED_POST,
    post,
  };
}

export function getPostRequest(post) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/posts/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
  };
}

export function deletePost(post) {
  return {
    type: ActionTypes.post.DELETE_POST,
    post,
  };
}

export function addPosts(posts) {
  return {
    type: ActionTypes.post.ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/posts/getPosts`).
      then((response) => response.json()).
      then((response) => dispatch(addPosts(response.posts)));
  };
}

export function deletePostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/posts/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deletePost(post)));
  };
}
