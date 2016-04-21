import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import { PostContainer, PostDetailView } from './container/Posts';

import { LoginContainer, RegisterContainer, AuthCallbackContainer } from './container/Auth';
import { SoundCloudContainer } from './container/SoundCloud';


const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={SoundCloudContainer}/>
    <Route path="/post/:slug" component={PostDetailView}/>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/register" component={RegisterContainer}/>
    <Route path='/auth/:service' component={AuthCallbackContainer} />
  </Route>
);

export default routes;
