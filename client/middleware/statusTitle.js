import {
  MESSAGE_EVENT
} from '../../common/constants/SocketEvents';

const title = document.title;

var counter = 0;
var focus = true;

window.onfocus = () => { focus = true; counter = 0; updateTitle();};
window.onblur = () => { focus = false; };

const updateTitle = (n) => { 
  var prefix = '';

  if (n) prefix = n + '! ';

  document.title = prefix + title;
};

export default function(store) {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case MESSAGE_EVENT:
        !focus && updateTitle(++counter);
        break;
    }

    return result;
  };
}