import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const loginUrl = 'https://test-api.k6.io/auth/token/login/';
  const resourceUrl = 'https://test-api.k6.io/my/crocodiles/';

  const loginPayload = JSON.stringify({
    username: 'test-user',
    password: 'supersecurepassword'
  });

  const params = {
    headers: { 'Content-Type': 'application/json' }
  };

  const loginRes = http.post(loginUrl, loginPayload, params);
  const authToken = JSON.parse(loginRes.body).access;

  const resourceParams = {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  };

  const res = http.get(resourceUrl, resourceParams);

  check(res, {
    'Acceso autorizado al recurso (status 200)': (r) => r.status === 200,
  });
}
