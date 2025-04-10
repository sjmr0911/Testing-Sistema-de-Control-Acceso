import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const login = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username: 'test-user',
    password: 'supersecurepassword'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  const token = JSON.parse(login.body).access;

  const res1 = http.get('https://test-api.k6.io/my/crocodiles/', {
    headers: { Authorization: `Bearer ${token}` }
  });

  sleep(2); // Simulando sesión corta
  const res2 = http.get('https://test-api.k6.io/my/crocodiles/', {
    headers: { Authorization: `Bearer ${token}` }
  });

  check(res1, { 'Primera llamada válida': (r) => r.status === 200 });
  check(res2, { 'Segunda llamada aún válida': (r) => r.status === 200 });
}
