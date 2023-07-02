import http from './httpService';
import { apiUrl } from '../apiUrl';

const apiEndpoint = apiUrl + '/user';

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
