import * as local from './LocalActions';
import * as request from './RequestActions';

const actions = {
  ...local,
  ...request
};

export default actions