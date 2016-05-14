import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './containers/App';
import { PostContainer, PostDetailView } from './containers/Posts';

import { LoginContainer, RegisterContainer, AuthCallbackContainer } from './containers/Auth';
import { SoundCloudContainer } from './containers/SoundCloud';
import {Content, ContentMiddle, CurrentTrack, Header} from './containers/Spotify';


// const routes = (
//   <Route path="/" component={App} >
//     <IndexRoute component={SoundCloudContainer}/>
//     <Route path="/post" component={PostContainer}/>
//     <Route path="/post/:slug" component={PostDetailView}/>
//     <Route path="/login" component={LoginContainer}/>
//     <Route path="/register" component={RegisterContainer}/>
//     <Route path='/auth/:service' component={AuthCallbackContainer} />
//   </Route>
// );



const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={ContentMiddle}/>
  </Route>
);
export default routes;
