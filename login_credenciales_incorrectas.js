import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'https://test-api.k6.io/auth/token/login/';
  const payload = JSON.stringify({
    username: 'test-user',
    password: 'wrongpassword'
  });

  const params = {
    headers: { 'Content-Type': 'application/json' }
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Inicio de sesión fallido (status 401)': (r) => r.status === 401,
  });
}
