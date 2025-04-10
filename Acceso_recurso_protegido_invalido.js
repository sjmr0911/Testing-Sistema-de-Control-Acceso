import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const resourceUrl = 'https://test-api.k6.io/my/crocodiles/';
  const invalidToken = 'invalidtoken123';

  const params = {
    headers: {
      'Authorization': `Bearer ${invalidToken}`
    }
  };

  const res = http.get(resourceUrl, params);

  check(res, {
    'Acceso denegado al recurso (status 403)': (r) => r.status === 403,
  });
}
