
/**
 * Arguments:
 *  scriptPaths     - Array of strings.  Each string is url to a js script
 *  cssTags         - Array of objects where each object contains attributes of <link> tag. (ie {href:'http://google.com/style.css', type:'text/stylesheet'})
 *  scriptElements  - Array of strings. Each string is a valid html script tag.
 *  html            - String. HTML that goes inside <body>
 *  options         - Object.  {name:'aname'}
 */
function generateHTMLPage(scriptPaths = [], cssTags = [], scriptElements = [], html = '', options = {}){

  var scriptTags = scriptPaths.reduce((prev, curr) => {
    return prev.concat(`<script src="${curr}"></script>`)
  }, '');

  var cssElements = cssTags.reduce((prev, curr) => {
    return prev.concat(`<link rel="${curr.rel || 'stylesheet'}" href="${curr.href}" type="${curr.type || 'text/css'}" />`);
  }, '');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${(options.name) ? options.name : 'TLDR App'}</title>
        ${cssElements}
      </head>
      <body class='application'>
        <div id="root">${html}</div>
        ${scriptElements}
        ${scriptTags}
        <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-77683814-2', 'auto'); ga('send', 'pageview');</script>
      </body>
    </html>
  `;
}




// Render Initial HTML
const renderFullPage = (html, initialState, opts) => {
  const cssPath = (process.env.NODE_ENV === 'production') ? '/css/app.min.css' : '/css/app.css';
  const options = (opts) ? opts : {name: 'Music dev'};

  var scriptPaths = ['/dist/bundle.js'];
  var cssTags = [

    { href: 'https://fonts.googleapis.com/css?family=Lato:400,300,700,700italic,300italic|Pacifico', rel: 'stylesheet', type: 'text/css' },
    { href: 'https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900', rel:'stylesheet', type:'text/css'},
    // { href: 'https://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png', rel: 'shortcut icon', type: 'image/png' },
    { href: 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.3.0/nouislider.min.css', rel:'stylesheet', type:'text/css'},

    { href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css', rel: 'stylesheet', type:'text/css'},
    { href: cssPath, rel: 'stylesheet'}
  ];
  var scriptElements = [`<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`];

  return generateHTMLPage(scriptPaths, cssTags, scriptElements, html, options);
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};


//
// const renderWindowClose = () => {
//   const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
//   const options = {name:'Soundcloud Callback'};
//
//   var scriptPaths = ['/dist/bundle.js'];
//   var cssTags = [
//     { href: cssPath, rel: 'stylesheet'},
//     { href: 'https://fonts.googleapis.com/css?family=Lato:400,300,700,700italic,300italic|Pacifico', rel: 'stylesheet', type: 'text/css' },
//     { href: 'http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png', rel: 'shortcut icon', type: 'image/png' }
//   ];
//   var scriptElements = [
//     `<script>window.__INITIAL_STATE__ = ${JSON.stringify({})};</script>`,
//     `<script>console.log(window.location.hash);</script>`
//   ];
//
//
//   var html = generateHTMLPage(scriptPaths, cssTags, scriptElements, '', options);
//   console.log(html);
//   return html ;
//   // return `
// }

export default renderFullPage;
export { renderError } ;
