const title = document.title;

var counter = 0;
var looseFocus = false;
var favicon = 'favicon';

window.onfocus = () => {
  looseFocus = false;
  counter = 0;
  updateTitle();
  updateFavicon();
};

window.onblur = () => {
  looseFocus = true;
};

const updateTitle = (n) => { 
  var prefix = '';

  if (n) {
    prefix = n + '! ';
  }

  document.title = prefix + title;
};

const setFavicon = (name) => {
  const current = document.getElementById('favicon');

  var link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.type = 'image/x-icon';
  link.href = `/static/${name}.ico`;
  link.id = 'favicon';

  current && current.remove();
  document.head.appendChild(link);

  favicon = name;
};

const updateFavicon = (name = 'favicon') => {
  if (name != favicon) {
    setFavicon(name);
  }
};

export function tick() {
  if (looseFocus) {
    updateTitle(++counter);
    updateFavicon('alarm');
  }
}