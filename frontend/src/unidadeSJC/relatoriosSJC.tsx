import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../estilos/styles.module.css';

type Relatorio = {
    top10ClientesMaisConsumo: Cliente[];
    clientesPorGenero: Cliente[];
    servicosMaisConsumidos: Servico[];
    servicosMaisConsumidosPorGenero: Servico[];
    top10ClientesMenosConsumo: Cliente[];
    top5ClientesMaisValor: Cliente[];
}

type Cliente = {
    nome: string;
    genero: string;
    quantidadeConsumida: number;
    valorConsumido: number;
}

type Servico = {
    nome: string;
    quantidadeConsumida: number;
    generoMaisConsumidor: string;
}

function Relatorios() {
    const [relatorios, setRelatorios] = useState<Relatorio>({
        top10ClientesMaisConsumo: [
            { nome: 'Cliente 1', genero: 'Masculino', quantidadeConsumida: 100, valorConsumido: 1000 },
            { nome: 'Cliente 2', genero: 'Feminino', quantidadeConsumida: 90, valorConsumido: 900 },
            // ... outros clientes
        ],
            clientesPorGenero: [
                { nome: 'Cliente 1', genero: 'Masculino', quantidadeConsumida: 0, valorConsumido: 0 },
                { nome: 'Cliente 2', genero: 'Feminino', quantidadeConsumida: 0, valorConsumido: 0 },
                // ... outros clientes
            ],
            servicosMaisConsumidos: [
                { nome: 'Serviço 1', quantidadeConsumida: 100, generoMaisConsumidor: 'Masculino' },
                { nome: 'Serviço 2', quantidadeConsumida: 90, generoMaisConsumidor: 'Feminino' },
                // ... outros serviços
            ],
            servicosMaisConsumidosPorGenero: [
                { nome: 'Serviço 1', quantidadeConsumida: 0, generoMaisConsumidor: 'Masculino' },
                { nome: 'Serviço 2', quantidadeConsumida: 0, generoMaisConsumidor: 'Feminino' },
                // ... outros serviços
            ],
            top10ClientesMenosConsumo: [
                { nome: 'Cliente 1', genero: 'Masculino', quantidadeConsumida: 10, valorConsumido: 100 },
                { nome: 'Cliente 2', genero: 'Feminino', quantidadeConsumida: 20, valorConsumido: 200 },
                // ... outros clientes
            ],
            top5ClientesMaisValor: [
                { nome: 'Cliente 1', genero: 'Masculino', quantidadeConsumida: 0, valorConsumido: 1000 },
                { nome: 'Cliente 2', genero: 'Feminino', quantidadeConsumida: 0, valorConsumido: 900 },
                // ... outros clientes
            ],
        });

    const [relatorioSelecionado, setRelatorioSelecionado] = useState('');


    const handleRelatorioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRelatorioSelecionado(event.target.value);
    };

    const renderRelatorio = () => {
        switch (relatorioSelecionado) {
            case 'top10ClientesMaisConsumo':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade Consumida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.top10ClientesMaisConsumo.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.quantidadeConsumida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            case 'clientesPorGenero':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Gênero</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.clientesPorGenero.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.genero}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            
            case 'servicosMaisConsumidos':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Quantidade Consumida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.servicosMaisConsumidos.map((servico, index) => (
                                <tr key={index}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.quantidadeConsumida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            
            case 'servicosMaisConsumidosPorGenero':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Gênero Mais Consumidor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.servicosMaisConsumidosPorGenero.map((servico, index) => (
                                <tr key={index}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.generoMaisConsumidor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );

            case 'top10ClientesMenosConsumo':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade Consumida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.top10ClientesMenosConsumo.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.quantidadeConsumida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );

            case 'top5ClientesMaisValor':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor Consumido</th>
                            </tr>
                        </thead>
                        <tbody>
                        {relatorios.top5ClientesMaisValor.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.valorConsumido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                );
            default:
                return null;
            }
            }

    return (
        <div className={styles['container-lista']}>
        <div className={styles['wrap-cadastro']}>
            <h1>Relatórios</h1>

            <Form.Control as="select" onChange={(event: any) => handleRelatorioChange(event)}>
                <option value="">Selecione um relatório</option>
                <option value="top10ClientesMaisConsumo">10 clientes que mais consumiram produtos ou serviços</option>
                <option value="clientesPorGenero">Clientes por gênero</option>
                <option value="servicosMaisConsumidos">Serviços ou produtos mais consumidos</option>
                <option value="servicosMaisConsumidosPorGenero">Serviços ou produtos mais consumidos por gênero</option>
                <option value="top10ClientesMenosConsumo">10 clientes que menos consumiram produtos ou serviços</option>
                <option value="top5ClientesMaisValor">5 clientes que mais consumiram em valor</option>
            </Form.Control>

            {renderRelatorio()}
        </div>
    </div>
);

}

export default Relatorios;