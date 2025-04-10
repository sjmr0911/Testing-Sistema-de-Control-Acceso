import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'https://test-api.k6.io/user/register/';
  const payload = JSON.stringify({
    username: `user${Math.floor(Math.random()*10000)}`,
    first_name: 'Nuevo',
    last_name: 'Usuario',
    email: `test${Math.random()*1000}@mail.com`,
    password: 'securePass123!'
  });

  const res = http.post(url, payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'Usuario registrado correctamente': (r) => r.status === 201
  });
}
