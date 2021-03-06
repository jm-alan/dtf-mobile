import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function csrfetch (url, options = {}) {
  const mobileToken = await AsyncStorage.getItem('JWT');
  url = `https://downtofriend.herokuapp.com${url}&mobileToken=${mobileToken}`;
  options.method = options.method ?? 'GET';
  options.headers = options.headers ?? {};

  if (options.method.toUpperCase() !== 'GET') {
    // do not set content type if attempting photo upload
    if (options.headers['Content-Type'] === 'multipart/form-data') {
      delete options.headers['Content-Type'];
    } else {
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    options.headers['XSRF-Token'] = await AsyncStorage.getItem('XSRF-Token');
  }
  // eslint-disable-next-line
  const res = await fetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    res.data = await res.json();
  }

  if (res.status >= 400) throw res;

  return res;
}

export async function getCSRFtoken () {
  // eslint-disable-next-line
  const resp = await fetch('https://downtofriend.herokuapp.com/api/csrf/restore');
  const { token } = await resp.json();
  await AsyncStorage.setItem('XSRF-Token', token);
}
