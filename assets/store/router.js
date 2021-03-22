const HOME = 'router/HOME';

const MESSENGER = 'router/MESSENGER';

const SETTINGS = 'router/SETTINGS';

const NEW = 'router/NEW';

const LOGIN = 'router/LOGIN';

const SIGNUP = 'router/SIGNUP';

export const GoHome = () => ({ type: HOME });

export const GoMessenger = () => ({ type: MESSENGER });

export const GoSettings = () => ({ type: SETTINGS });

export const GoNew = () => ({ type: NEW });

export const GoLogin = () => ({ type: LOGIN });

export const GoSignup = () => ({ type: SIGNUP });

export default function reducer (state = { page: 'home' }, { type }) {
  switch (type) {
    case HOME:
      return { page: 'home' };
    case MESSENGER:
      return { page: 'messenger' };
    case SETTINGS:
      return { page: 'settings' };
    case NEW:
      return { page: 'new' };
    case LOGIN:
      return { page: 'login' };
    case SIGNUP:
      return { page: 'signup' };
    default:
      return state;
  }
}
