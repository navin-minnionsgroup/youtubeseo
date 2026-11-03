import axios from 'axios';

export async function createPayuOrder(payload) {
  const response = await axios.post('/payu/initiate', payload);
  return response.data;
}

export function redirectToPayu(payuUrl, params) {
  const payuForm = document.createElement('form');
  payuForm.action = payuUrl;
  payuForm.method = 'POST';

  Object.keys(params).forEach((key) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    payuForm.appendChild(input);
  });

  document.body.appendChild(payuForm);
  payuForm.submit();
}