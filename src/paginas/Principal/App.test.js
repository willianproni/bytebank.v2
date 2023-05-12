import { render, screen } from '@testing-library/react';
import App from './App';
import AppRoutes from '../../routes';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('<App/>', () => {
  it('Deve permitir adicionar uma transação em Extrato', () => {
    render(<App />, { wrapper: BrowserRouter });

    const select = screen.getByRole('combobox'); //pego a select
    const inputValue = screen.getByPlaceholderText('Digite um valor'); //pego a input
    const buttonTransaction = screen.getByRole('button'); //pego o button

    userEvent.selectOptions(select, ['Depósito']); //Realizo o select
    userEvent.type(inputValue, '100'); //Escrevo no input
    userEvent.click(buttonTransaction); //click no botão
    const transaction = screen.getByTestId('lista-transacoes'); //Selecio a lista inteira <ul/>
    const item = screen.getByRole('listitem'); //Seleciono a <li/>

    expect(transaction).toContainElement(item); //Espero q o item <li/> adicionado esteja presenta na <ul/>

    userEvent.selectOptions(select, ['Depósito']); //Realizo o select
    userEvent.type(inputValue, '100'); //Escrevo no input
    userEvent.click(buttonTransaction); //click no botão

    const Rerenderitem = screen.getAllByRole('listitem'); //Seleciono a <li/> dnv
    Rerenderitem.forEach((element) => {
      //ForEach na lista
      expect(transaction).toContainElement(element); //Esperar conter no documento
    });
  });

  it('Deve navegar até a página correspondente ao link clicado Cartões', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPageCards = screen.getByText('Cartões');

    expect(linkPageCards).toBeInTheDocument();

    userEvent.click(linkPageCards);

    expect(await screen.findByText('Meus cartões')).toBeInTheDocument();
  });

  it('Deve renderizar a navegação de tela para tela de meus investimentos', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const getLinkInvestimentos = screen.getByText('Investimentos');
    userEvent.click(getLinkInvestimentos);

    expect(await screen.findByText('Renda Fixa')).toBeInTheDocument();
  });
});
