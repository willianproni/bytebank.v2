import api from './api';
import { atualizaSaldo, buscaSaldo } from './saldo';
import { buscaTransacoes, salvaTransacao } from './transacoes';

jest.mock('./api');

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
  {
    transacao: 'Depósito',
    valor: '102',
    data: '22/11/2022',
    mes: 'Novembro',
    id: 3,
  },
];

const mockSaldo = {
  valor: 2000,
};

const mockPostTransaction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockPostTransactionError = () => {
  return new Promise((reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockAtualizaSaldo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    });
  }, 500);
};

const mockAtualizaSaldoError = () => {
  return new Promise((reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockBuscarSaldo = (valor) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: valor,
      });
    });
  }, 500);
};

const mockBuscarSaldoError = () => {
  new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 500);
  });
};

const mockRequisicao = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockTransacao,
      });
    }, 200);
  });
};

const mockRequisicaoErro = (retorno) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Test service', () => {
  it('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao());

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro(mockTransacao));

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('Deve retornar o saldo em conta', async () => {
    api.get.mockImplementation(() => mockBuscarSaldo(mockSaldo));

    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  it('Renderizar error busca saldo conta', async () => {
    api.get.mockImplementation(() => mockBuscarSaldoError(mockSaldo));

    const saldo = await buscaSaldo();
    expect(saldo).toEqual(1000);
  });

  it('Renderiza um requisição na API de post da transação', async () => {
    api.post.mockImplementation(() => mockPostTransaction());

    const status = await salvaTransacao(mockTransacao[0]);

    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
    expect(status).toBe(201);
  });

  it('Deve renderizar caso a API de post da transação der erro ', async () => {
    api.post.mockImplementation(() => mockPostTransactionError());

    const status = await salvaTransacao(mockTransacao[0]);

    expect(status).toBe('Erro na requisição');
  });

  it('Deve renderizar caso aconteça uma alteração(PUT) no saldo', async () => {
    api.put.mockImplementation(() => mockAtualizaSaldo());

    const status = await atualizaSaldo(mockSaldo);

    expect(status).toEqual(201);
  });

  it('Deve renderizar caso a API de put de atualizar saldo der erro', async () => {
    api.post.mockImplementation(() => mockAtualizaSaldoError());

    const status = await atualizaSaldo(mockSaldo);

    expect(status).toBe('Erro na requisição');
  });
});
