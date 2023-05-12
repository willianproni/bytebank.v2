import { act, renderHook } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useListaTransacoes from './useListaTransacoes';
import useSaldo from './useSaldo';
import { buscaTransacoes } from '../services/transacoes';

jest.mock('../services/transacoes');
jest.mock('../services/saldo');

const mockTransacao = [
  {
    transacao: 'Depósito',
    valor: '150',
    data: '18/11/2022',
    mes: 'Novembro',
    id: 1,
  },
  {
    transacao: 'Depósito',
    valor: '100',
    data: '21/11/2022',
    mes: 'Novembro',
    id: 2,
  },
];

const mockBalance = {
  valor: 2000,
};

describe('Render Hooks', () => {
  it('Deve retornar uma lista de transações e uma função que atualiza', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao); //mock a api de Busca trancacoes

    const { result } = renderHook(() => useListaTransacoes()); // renderizando o hook
    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacao);
  });

  it('Renderiza o valor do saldo', async () => {
    buscaSaldo.mockImplementation(() => mockBalance.valor);

    const { result } = renderHook(() => useSaldo());

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockBalance.valor);
  });
});
