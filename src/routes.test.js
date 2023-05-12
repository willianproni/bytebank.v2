const { render, screen } = require('@testing-library/react');
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../src/paginas/Principal/App';
import AppRoutes from './routes';
import Cartoes from '../src/componentes/Cartoes';
import Servicos from '../src/componentes/Servicos';

describe('Testando as Rotas', () => {
  it('should render principal route', () => {
    render(<App />, { wrapper: BrowserRouter });

    const user = screen.getByText('Olá, Willian :)!');
    expect(user).toBeInTheDocument();
  });

  it('should render route cards', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const myCards = screen.getByText('Meus cartões');
    expect(myCards).toHaveTextContent('Meus cartões');
  });

  it('should render service route', () => {
    const routeService = '/servicos';
    render(
      <MemoryRouter initialEntries={[routeService]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="servicos" element={<Servicos />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const myServices = screen.getByText('Empréstimo');
    expect(myServices).toHaveTextContent('Empréstimo');
  });

  it('should render location atual location', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const location = screen.getByTestId('local');
    expect(location).toHaveTextContent(rota);
  });

  it('should render route 404', () => {
    const route = '/extrato';
    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(
      screen.getByText('Ops! Não encontramos a página')
    ).toBeInTheDocument();
  });
});
