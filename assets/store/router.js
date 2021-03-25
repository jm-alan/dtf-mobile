const HOME = 'router/HOME';

const MESSENGER = 'router/MESSENGER';

const SETTINGS = 'router/SETTINGS';

const NEW = 'router/NEW';

const LOGIN = 'router/LOGIN';

const SIGNUP = 'router/SIGNUP';

const BACK = 'router/BACK';

const SUBPAGE = 'router/SUBPAGE';

export const GoHome = () => ({ type: HOME });

export const GoMessenger = () => ({ type: MESSENGER });

export const GoSettings = () => ({ type: SETTINGS });

export const GoNew = () => ({ type: NEW });

export const GoLogin = () => ({ type: LOGIN });

export const GoSignup = () => ({ type: SIGNUP });

export const GoBack = () => ({ type: BACK });

export default function reducer (
  state = { page: 'home', subpage: 0 },
  { type }
) {
  switch (type) {
    case HOME: return { ...state, page: 'home' };
    case MESSENGER: return { ...state, page: 'messenger' };
    case SETTINGS: return { ...state, page: 'settings' };
    case NEW: return { ...state, page: 'new' };
    case LOGIN: return { ...state, page: 'login' };
    case SIGNUP: return { ...state, page: 'signup' };
    case BACK: return state.subpage
      ? {
          page: state.page,
          subpage: Math.max(state.subpage - 1, 0)
        }
      : { page: 'home', subpage: 0 };
    case SUBPAGE:
      return { ...state, subpage: state.subpage + 1 };
    default:
      return state;
  }
}

