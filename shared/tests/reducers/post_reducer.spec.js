import expect from 'expect';
import deepFreeze from 'deep-freeze';

import combination from '../../redux/reducers';
import ActionTypes from '../../redux/constants';



var auth = { token: null, username: null, isAuthenticated: false, isAuthenticating: false, statusText: null };

describe('reducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { post: { posts: [], post: null }, auth: auth };
    const common = {name: 'prank', title: 'first post', content: 'Hello world!', _id: null, cuid: null, slug: 'first-post'};
    const action = Object.assign({}, { type: ActionTypes.post.ADD_POST  }, common);

    const stateAfter = {
      posts: { posts: [common], post: null },
      auth: auth
    };

    deepFreeze(stateAfter);
    deepFreeze(stateBefore);
    deepFreeze(action);



    var out = combination(stateBefore, action);
    console.log();
    expect(stateBefore).toEqual(stateBefore);
  });

  it('action ADD_SELECTED_POST is working', () => {
    const stateBefore = { posts: { posts: [{ name: 'prank', title: 'first post', content: 'Hello world!', _id: null, slug: 'first-post', }], selectedPost: null }, auth: auth };

    const stateAfter = {
      posts: {
        posts: [{
          name: 'prank',
          title: 'first post',
          content: 'Hello world!',
          _id: null,
          slug: 'first-post',
        }],
        post: {
          name: 'prank',
          title: 'second post',
          content: 'Hello world!',
          _id: null,
          slug: 'second-post',
        }
      },
      auth: auth
    };

    const action = {
      type: ActionTypes.post.ADD_SELECTED_POST,
      post: {
        name: 'prank',
        title: 'second post',
        content: 'Hello world!',
        _id: null,
        slug: 'second-post',
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    var rtn = combination(stateBefore, action);

    expect(stateBefore).toEqual(stateBefore);
  });
});
