import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8001/api/v1/translate';

  const payload = JSON.stringify({
    word: "computer",
    paragraph: "the computer is very fast and powerful",
    srcLang: "english",
    targetLang: "arabic",
    isFavorite: false
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}