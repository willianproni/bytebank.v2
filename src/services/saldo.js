import api from './api';

export async function buscaSaldo() {
  try {
    const resp = await api.get('/saldo');
    return resp.data.valor;
  } catch (err) {
    return 1000;
  }
}

export async function atualizaSaldo(novoSaldo) {
  try {
    const resp = await api.put('/saldo', { valor: novoSaldo });
    return resp.status;
  } catch {
    return 'Erro na requisição';
  }
}
