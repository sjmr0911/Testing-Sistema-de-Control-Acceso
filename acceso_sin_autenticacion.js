import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://test-api.k6.io/my/crocodiles/');

  check(res, {
    'Acceso denegado sin token (403)': (r) => r.status === 403
  });
}
