import User from '../models/user';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';





export function getUser(req, res) {
  // TODO: Need to implement
  res.json({name:'james'});
}
export function postUser(req, res) {
  // TODO: Need to implement
  res.json({name:'james'});
}


// export function createUser(req, res) {
//   if (!req.body.user.email || !req.body.user.password || !req.body.post.content) {
//     return res.status(403).end();
//   }

//   const newPost = new Post(req.body.post);

//   // Let's sanitize inputs
//   newPost.title = sanitizeHtml(newPost.title);
//   newPost.name = sanitizeHtml(newPost.name);
//   newPost.content = sanitizeHtml(newPost.content);

//   newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
//   newPost.cuid = cuid();

//   newPost.save((err, saved) => {
//     return (err) ? res.status(500).send(err) : res.json({ post: saved })
//   });
// }




// export function getPost(req, res) {
//   const newSlug = req.query.slug.split('-');
//   const newCuid = newSlug[newSlug.length - 1];
//   Post.findOne({ cuid: newCuid }).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json({ post });
//   });
// }




// export function deletePost(req, res) {
//   const postId = req.body.postId;
//   Post.findById(postId).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     post.remove(() => {
//       res.status(200).end();
//     });
//   });
// }
