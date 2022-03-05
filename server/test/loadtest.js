import http from 'k6/http':
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter ('http_ reqs');
export const options = {
  vus: 100,
  duration: '15s'
  }

cost url = 'http://localhost:3000/api/test':

export default function() {
const res = http.get(url);
sleep(1);
check(res, {
'is status 200': r => r.status === 200,
'transaction time < 200ms' : r => r.timing.duration < 200,
'transaction time < 500ms' : r => r.timing.duration < 500,
'transaction time < 1000ms' : r => r.timing.duration < 1000,
'transaction time < 2000ms' : r => r.timing.duration < 2000,
});
}