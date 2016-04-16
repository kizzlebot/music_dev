import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import { PostContainer, PostDetailView } from './container/Posts';
import { LoginContainer } from './container/Auth';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={PostContainer} />
    <Route path="/post/:slug" component={PostDetailView}/>
    <Route path="/login" component={LoginContainer}/>
  </Route>
);

export default routes;
