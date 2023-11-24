import React, { useState } from 'react';
import { Route, RouteProps, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Login';
import ListaClientesSJC from './unidadeSJC/listaClienteSJC';
import ListaProdutoSJC from './unidadeSJC/listaProdutoSJC';
import ListaServicoSJC from './unidadeSJC/listaServicoSJC';
import MenuSJC from './unidadeSJC/MenuSJC';
import ListaProdutoTaubate from './unidadeTaubate/listaProdutoTaubate';
import ListaClientesTaubate from './unidadeTaubate/listaClienteTaubate';
import ListaServicoTaubate from './unidadeTaubate/listaServicoTaubate';
import MenuTaubate from './unidadeTaubate/MenuTaubate';
import CadastroSJC from './unidadeSJC/cadastroSJC';
import Relatorios from './unidadeSJC/relatoriosSJC';
import RelatoriosTaubate from './unidadeTaubate/relatoriosTaubate';
import CadastroTaubate from './unidadeTaubate/cadastroTaubate';

interface PrivateRouteProps extends RouteProps {
    tela: string;
    menu: React.ComponentType; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ menu: MenuComponent, ...props }) => (
    <>
        <MenuComponent />
        <Route {...props} />
    </>
);
function Roteador () {
    const [tela] = useState('Login');

       
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/relatoriosSJC" tela={tela} menu={MenuSJC}>
                    <Relatorios/>
                </PrivateRoute> 
                <PrivateRoute path="/cadastroSJC" tela={tela} menu={MenuSJC}>
                    <CadastroSJC />
                </PrivateRoute>
                <PrivateRoute path="/produtoSJC" tela={tela} menu={MenuSJC}>
                    <ListaProdutoSJC />
                </PrivateRoute>
                <PrivateRoute path="/clienteSJC" tela={tela} menu={MenuSJC}>
                    <ListaClientesSJC />
                </PrivateRoute>
                <PrivateRoute path="/servicoSJC" tela={tela} menu={MenuSJC}>
                    <ListaServicoSJC />
                </PrivateRoute>
                <PrivateRoute path="/cadastroTaubate" tela={tela} menu={MenuTaubate}>
                    <CadastroTaubate />
                </PrivateRoute>
                <PrivateRoute path="/relatoriosTaubate" tela={tela} menu={MenuTaubate}>
                    <RelatoriosTaubate />
                </PrivateRoute>
                <PrivateRoute path="/produtoTaubate" tela={tela} menu={MenuTaubate}>
                    <ListaProdutoTaubate />
                </PrivateRoute>
                <PrivateRoute path="/clienteTaubate" tela={tela} menu={MenuTaubate}>
                    <ListaClientesTaubate />
                </PrivateRoute>
                <PrivateRoute path="/servicoTaubate" tela={tela} menu={MenuTaubate}>
                    <ListaServicoTaubate />
                </PrivateRoute>
                <Route path="/" component={Login} />
                <Route render={() => <div>Página não encontrada</div>} />
            </Switch>
        </Router>
    );
};

export default Roteador;