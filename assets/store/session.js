import AsyncStorage from '@react-native-async-storage/async-storage';
import csrfetch from './csrf.js';

const USER = 'session/USER';

const LOAD = 'session/LOAD';

const UNLOAD = 'session/UNLOAD';

export const SetSession = (user = null) => ({ type: USER, user });

export const LoadSession = () => ({ type: LOAD });

export const UnloadSession = () => ({ type: UNLOAD });

export const RestoreUser = () => async dispatch => {
  const { data: { user } } = await csrfetch(`/api/session?mobileToken=${await AsyncStorage.getItem('JWT')}`);
  dispatch(SetSession(user));
};

export const LogIn = (identification, password) => async dispatch => {
  const { data: { user, token } } = await csrfetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ identification, password })
  });
  await AsyncStorage.setItem('JWT', token);
  dispatch(SetSession(user));
};

export const SignUp = newUser => async dispatch => {
  const { firstName, email, password } = newUser;
  const { data: { user, token } } = await csrfetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      email,
      password
    })
  });
  await AsyncStorage.setItem('JWT', token);
  dispatch(SetSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(SetSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case USER:
      return { ...state, user };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    default:
      return state;
  }
}
