import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../estilos/styles.module.css';
import { Link } from 'react-router-dom';

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    rgs: string[];
    genero: string;
    dataCadastro: string;
    telefones: string[];
};

function ListaClientesTaubate () {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [modalShow, setModalShow] = useState(false);
    const [clienteModal, setClienteModal] = useState<Cliente | null>(null);
    const [filtro, setFiltro] = useState('');
    const [modalConsumoShow, setModalConsumoShow] = useState(false);
    const [modalAlterarShow, setModalAlterarShow] = useState(false);
    const [modalExcluirShow, setModalExcluirShow] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [servicoSelecionado, setServicoSelecionado] = useState('');

    useEffect(() => {
        const clientesFicticios = [
            { nome: 'João',
                nomeSocial: 'Jonh',
                cpf: '22222222222',
                rgs: ['222222222'],
                genero: 'Masculino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(11) 111111111']
            },
                        
            {
                nome: 'Fabio',
                nomeSocial: 'Fab',
                cpf: '34343434343',
                rgs: ['343434343'],
                genero: 'Masculino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(31) 313131313']
            },

            {
                nome: 'Ana',
                nomeSocial: 'Ana',
                cpf: '44444444444',
                rgs: ['444444444'],
                genero: 'Feminino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(44) 444444444']
            },

            {
                nome: 'Joaquim',
                nomeSocial: 'Joaq',
                cpf: '55555555555',
                rgs: ['555555555'],
                genero: 'Masculino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(55) 555555555']
            },

            {
                nome: 'Pedro',
                nomeSocial: 'Ped',
                cpf: '66666666666',
                rgs: ['666666666'],
                genero: 'Masculino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(66) 666666666']
            },
            
            {
                nome: 'Maria',
                nomeSocial: 'Mary',
                cpf: '33333333333',
                rgs: ['333333333'],
                genero: 'Feminino',
                dataCadastro: new Date().toISOString(),
                telefones: ['(22) 222222222']
            },                      
           
        ];
        clientesFicticios.sort((a, b) => a.nome.localeCompare(b.nome));
        setClientes(clientesFicticios);
    }, []);
    const handleRowClick = (cliente: Cliente) => {
        setModalShow(true);
        setClienteModal(cliente);
    }

    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const handleConsumoClick = (cliente: Cliente) => {
        setClienteModal(cliente);
        setModalConsumoShow(true);
    };

    const handleAlterarClick = (cliente:Cliente) => {
        setModalAlterarShow(true);
        setClienteModal(cliente);
    }

    const handleExcluirClick = (cliente:Cliente) => {
        setClientes(clientes.filter(c => c !== cliente));
    };

    const handleProdutoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProdutoSelecionado(event.target.value);
    };

    const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setServicoSelecionado(event.target.value);
    };

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clienteModal) {
            setClienteModal({ ...clienteModal, nome: event.target.value });
        }
    };

    const handleNomeSocialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clienteModal) {
            setClienteModal({ ...clienteModal, nomeSocial: event.target.value });
        }
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clienteModal) {
            setClienteModal({ ...clienteModal, cpf: event.target.value });
        }
    };
    
    const handleRgsChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        if (clienteModal) {
            const rgs = event.target.value.split(', ').map(rg => rg.trim());
            setClienteModal({ ...clienteModal, rgs: rgs });
        }
    };

    const handleGeneroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clienteModal) {
            setClienteModal({ ...clienteModal, genero: event.target.value });
        }
    };

    const handleTelefonesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clienteModal) {
            const telefones = event.target.value.split(', ').map(telefone => telefone.trim());
            setClienteModal({ ...clienteModal, telefones: telefones });
        }
    };

    const adicionarConsumo = () => {
        console.log("Adicionar consumo");
        setModalConsumoShow(false);
    }

    const alterarCliente = () => {
        console.log("Alterar cliente");
        setModalAlterarShow(false);
    }

    const excluirCliente = () => {
        console.log("Excluir cliente");
        setModalExcluirShow(false);
    }
    

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.cpf.includes(filtro)
    );

        return (
          <>
                <div className={styles['container-lista']}>
                    <div className={styles['wrap-lista']}>
                        <div className={styles['titulo-tabela']}>
                            <h1>Lista de Clientes</h1>
                        </div>
                    <div className={styles['titulo-tabela2']}>
                    <input type="text" value={filtro} onChange={handleFiltroChange} placeholder="Buscar por nome ou CPF" />
                        <Link to="/cadastroTaubate">
                            <button>Cadastrar </button>
                        </Link>
                    </div>                     
                    <div className={styles['table-responsive']}>
                    <Table striped hover>
                    <thead>
                    <tr className={styles['coluna-left']}>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Detalhes</th>
                        <th>Consumo</th>                        
                        <th>Alterar</th>
                        <th>Excluir</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {clientesFiltrados.map((cliente: Cliente, index: number) => ( 
                        <tr className={styles['coluna-left']} key={index}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefones.join(', ')}</td>
                            <td><button onClick={() => handleRowClick(cliente)}>Detalhes</button></td>
                            <td><button onClick={() => handleConsumoClick(cliente)}>Adicionar</button></td>
                            <td><button onClick={() => handleAlterarClick(cliente)}>Editar</button></td>
                            <td><button onClick={() => handleExcluirClick(cliente)}>Excluir</button></td>
                            
                        </tr>
                    ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div>
              <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>{clienteModal?.nome}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Nome Social: {clienteModal?.nomeSocial}</p>
                        <p>CPF: {clienteModal?.cpf}</p>
                        <p>RGs: {clienteModal?.rgs.join(', ')}</p>
                        <p>Gênero: {clienteModal?.genero}</p>
                        <p>Data de Cadastro: {clienteModal?.dataCadastro ? new Date(clienteModal.dataCadastro).toLocaleDateString('pt-BR') : ''}</p>
                        <p>Telefones: {clienteModal?.telefones.join(', ')}</p>
                    </Modal.Body>
                </Modal>
                <Modal show={modalConsumoShow} onHide={() => setModalConsumoShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Consumo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>
                                Produto:
                                <select value={produtoSelecionado} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleProdutoChange(event)}>
                                    <option value="">Selecione um produto</option>
                                    <option value="produto1">Produto 1</option>
                                    <option value="produto2">Produto 2</option>
                                    <option value="produto3">Produto 3</option>
                                    
                                </select>
                            </label>
                            <br />
                            <br />
                            <label>
                                Serviço:
                                <select value={servicoSelecionado} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleServicoChange(event)}>
                                    <option value="">Selecione um serviço</option>
                                    <option value="servico1">Serviço 1</option>
                                    <option value="servico2">Serviço 2</option>
                                    <option value="servico3">Serviço 3</option>
                                    
                                </select>
                            </label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalConsumoShow(false)}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={adicionarConsumo}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalAlterarShow} onHide={() => setModalAlterarShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>
                                Nome:
                                <input type="text" value={clienteModal?.nome} onChange={handleNomeChange} />
                            </label>
                            <br />
                            <label>
                                Nome Social:
                                <input type="text" value={clienteModal?.nomeSocial} onChange={handleNomeSocialChange} />
                            </label>
                            <br />
                            <label>
                                CPF:
                                <input type="text" value={clienteModal?.cpf} onChange={handleCPFChange} />
                            </label>
                            <br />
                            <label>
                                RGs:
                                <input type="text" value={clienteModal?.rgs.join(', ')} onChange={handleRgsChange} />
                            </label>
                            <br />
                            <label>
                                Gênero:
                                <input type="text" value={clienteModal?.genero} onChange={handleGeneroChange} />
                            </label>
                            <br />
                            <label>
                                Telefones:
                                <input type="text" value={clienteModal?.telefones.join(', ')} onChange={handleTelefonesChange} />
                            </label>
                            <br />
                            
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalAlterarShow(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={alterarCliente}>Salvar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalExcluirShow} onHide={() => setModalExcluirShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Excluir Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tem certeza que deseja excluir o cliente {clienteModal?.nome}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalExcluirShow(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={excluirCliente}>Excluir</Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </div>                
            </>
        );
    }

export default ListaClientesTaubate;