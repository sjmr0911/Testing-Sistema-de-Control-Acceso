import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const login = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username: 'test-delegado',
    password: 'delegadopass'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  const token = JSON.parse(login.body).access;

  const res = http.get('https://test-api.k6.io/my/crocodiles/', {
    headers: { Authorization: `Bearer ${token}` }
  });

  check(res, {
    'Delegado accede correctamente': (r) => r.status === 200
  });
}
