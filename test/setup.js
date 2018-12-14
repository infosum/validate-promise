console.log('set up mocha ......');

const { JSDOM } = require('jsdom');
// Have to set a url to avoid security
// errors with browserHistory.push('/');
const jsdom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  pretendToBeVisual: true,
  url: 'https://localhost',
});
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

window.isProd = true;
global.window = window;
global.document = window.document;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

copyProps(window, global);
