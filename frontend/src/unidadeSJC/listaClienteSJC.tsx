import React, { useEffect, useState, FormEvent} from 'react';
import axios from 'axios';
import styles from '../estilos/styles.module.css';
import { Link } from 'react-router-dom';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import RemovedorCliente from '../removedores/removedorCliente';
import RemovedorClienteLocal from '../removedores/removedorClienteLocal';
import { Cliente } from '../cliente'; 
import AtualizadorCliente from '../atualizador/atualizadorCliente';
import { Endereco } from '../cliente';
import { Telefone } from '../cliente';


function ListaClientesSJC(){
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteAtualizar, setClienteAtualizar] = useState<Cliente | null>(null);
  const [clienteModal, setClienteModal] = useState<Cliente | null>(null);
  const [filtro, setFiltro] = useState('');  
  const [modalAlterarShow, setModalAlterarShow] = useState(false);
  const [modalExcluirShow, setModalExcluirShow] = useState(false);
  const [state, setState] = useState<Cliente>({
    id: '',
    nome: '',
    sobreNome: '',
    endereco: {
      cidade: '',
      estado: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: '',
    },
    telefones: [],
  });

  
  
  
useEffect(() => {
        fetch('http://localhost:32832/clientes')
             .then(response => response.json())
             .then(data => { 
                 data.sort((a: Cliente, b: Cliente) => a.nome.localeCompare(b.nome));
                 setClientes(data);
                 console.log(data); 
             })
             .catch(error => console.error('Erro ao buscar clientes:', error));
     }, []);

const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
}

const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.sobreNome.toLowerCase().includes(filtro.toLowerCase())
);

const handleAlterarShow = (cliente: Cliente) => {
  abrirModalAtualizar(cliente);
};


const abrirModalAtualizar = (cliente: Cliente) => {
  setClienteAtualizar(cliente);
  setModalAlterarShow(true);
};

const atualizadorCliente = new AtualizadorCliente();

const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setClienteAtualizar(prevState => prevState ? {...prevState, nome: event.target.value} : null);
};

const handleSobreNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setClienteAtualizar(prevState => prevState ? {...prevState, sobreNome: event.target.value} : null);
};

const handleEnderecoChange = (field: keyof Endereco, event: React.ChangeEvent<HTMLInputElement>) => {
  setClienteAtualizar(prevState => {
    if (prevState) {
      const newEndereco = {...prevState.endereco};
      newEndereco[field as keyof Endereco] = event.target.value;
      return {...prevState, endereco: newEndereco};
    }
    return prevState;
  });
};

function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>, field: keyof Telefone) {
  setClienteAtualizar(prevState => {
    if (prevState) {
      const newTelefones = [...prevState.telefones];
      newTelefones[index][field as keyof Telefone] = event.target.value;
      return {...prevState, telefones: newTelefones};
    }
    return prevState;
  });
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (clienteAtualizar) {
    atualizadorCliente.atualizar(clienteAtualizar);
  }
};


const excluirRemoto = (idCliente: string) => {
  let removedor = new RemovedorCliente();
  let cliente = clientes.find(cliente => cliente.id === idCliente);
  if (cliente) {
    removedor.remover(cliente);
  }
}

const excluirLocal = (id: string, e: any) => {
  e.preventDefault();
  let removedorLocal = new RemovedorClienteLocal();
  let novosClientes = removedorLocal.remover(clientes, id);
  setClientes(novosClientes);
  excluirRemoto(id);
}

return (
  <div className={styles['container-lista']}>
      <div className={styles['wrap-lista']}>
          <div className={styles['titulo-tabela']}>
              <h1>Lista de Clientes</h1>
          </div>
          <div className={styles['titulo-tabela2']}>
              <input type="text" value={filtro} onChange={handleFiltroChange} placeholder="Buscar por nome" />
              <Link to="/cadastroSJC">
                  <button>Cadastrar </button>
              </Link>
          </div>
          <div className={styles['table-responsive']}>
              <Table striped hover>
                  <thead>
                      <tr className={styles['coluna-left']}>
                          <th>Nome</th>
                          <th>Sobrenome</th>
                          <th>Cidade</th>
                          <th>Estado</th>                          
                          <th>Telefone</th>
                          <th>Endereço</th>
                          <th>Ações</th>
                      </tr>
                  </thead>
                  <tbody>
                      {clientesFiltrados.map((cliente, index) => (
                          <tr className={styles['coluna-left']} key={index}>                              
                              <td>{cliente.nome}</td>
                              <td>{cliente.sobreNome}</td>
                              <td>{cliente.endereco.cidade}</td>
                              <td>{cliente.endereco.estado}</td>                              
                              <td>{cliente.telefones.map(telefone => (
                                  <p key={telefone.numero}>{telefone.ddd} {telefone.numero}</p>
                              ))}</td>
                              <td>{cliente.endereco.rua}, {cliente.endereco.numero}, {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.estado}, {cliente.endereco.codigoPostal}</td>
                              <td>                                  
                              <button onClick={() => handleAlterarShow(cliente)}>Alterar</button>
                              <button onClick={(e) => excluirLocal(cliente.id, e)}>Excluir</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
            </div>
            </div>
            <div>
            <Modal show={modalAlterarShow} onHide={() => setModalAlterarShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Atualizar Cliente</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={handleSubmit}>
                {clienteAtualizar && (
                  <>
                    <input type="hidden" name="id" value={clienteAtualizar.id} />
                    <input type="text" name="nome" value={clienteAtualizar.nome} onChange={handleNomeChange} />
                    <input type="text" name="sobreNome" value={clienteAtualizar.sobreNome} onChange={handleSobreNomeChange} />
                    <input type="text" name="rua" value={clienteAtualizar.endereco.rua} onChange={e => handleEnderecoChange('rua', e)} />
                    <input type="text" name="cidade" value={clienteAtualizar.endereco.cidade} onChange={e => handleEnderecoChange('cidade', e)} />
                    <input type="text" name="estado" value={clienteAtualizar.endereco.estado} onChange={e => handleEnderecoChange('estado', e)} />
                    <input type="text" name="bairro" value={clienteAtualizar.endereco.bairro} onChange={e => handleEnderecoChange('bairro', e)} />
                    <input type="text" name="numero" value={clienteAtualizar.endereco.numero} onChange={e => handleEnderecoChange('numero', e)} />
                    <input type="text" name="codigoPostal" value={clienteAtualizar.endereco.codigoPostal} onChange={e => handleEnderecoChange('codigoPostal', e)} />
                    <input type="text" name="informacoesAdicionais" value={clienteAtualizar.endereco.informacoesAdicionais} onChange={e => handleEnderecoChange('informacoesAdicionais', e)} />
                    {clienteAtualizar.telefones.map((telefone, index) => (
                      <div key={index}>
                        <input type="text" name={`telefone-${index}-ddd`} value={telefone.ddd} onChange={e => handleInputChange(index, e, 'ddd')} />
                        <input type="text" name={`telefone-${index}-numero`} value={telefone.numero} onChange={e => handleInputChange(index, e, 'numero')} />
                      </div>
                    ))}
                    <button type="submit">Atualizar</button>
                    
                  </>
                  
                )}
              </Form>
              
              </Modal.Body>
            </Modal>
            
        </div>
      </div>

  
);
}

export default ListaClientesSJC;

{/* import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../estilos/styles.module.css';
import { Link } from 'react-router-dom';

type Cliente = {  */}
{/* //     nome: string;
//     nomeSocial: string;
//     cpf: string;
//     rgs: string[];
//     genero: string;
//     dataCadastro: string;
//     telefones: string[];
// };

// function ListaClientesSJC () { */}
{/* //     const [clientes, setClientes] = useState<Cliente[]>([]);
//     const [modalShow, setModalShow] = useState(false);
//     const [clienteModal, setClienteModal] = useState<Cliente | null>(null);
//     const [filtro, setFiltro] = useState('');
//     const [modalConsumoShow, setModalConsumoShow] = useState(false);
//     const [modalAlterarShow, setModalAlterarShow] = useState(false);
//     const [modalExcluirShow, setModalExcluirShow] = useState(false);
//     const [produtoSelecionado, setProdutoSelecionado] = useState('');
//     const [servicoSelecionado, setServicoSelecionado] = useState('');

//     useEffect(() => { */}
{/* //         fetch('http://localhost:32832/clientes')
//             .then(response => response.json())
//             .then(data => { */}
{/* //                 data.sort((a: Cliente, b: Cliente) => a.nome.localeCompare(b.nome));
//                 setClientes(data);
//                 console.log(data); 
//             })
//             .catch(error => console.error('Erro ao buscar clientes:', error));
//     }, []);
//         const handleRowClick = (cliente: Cliente) => {
//         setModalShow(true); */}
{/* //         setClienteModal(cliente);
//     }

//     const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => { */}
{/* //         setFiltro(event.target.value);
//     };

//     const handleConsumoClick = (cliente: Cliente) => { */}
{/* //         setClienteModal(cliente);
//         setModalConsumoShow(true);
//     };

//     const handleAlterarClick = (cliente:Cliente) => { */}
{/* //         setModalAlterarShow(true);
//         setClienteModal(cliente);
//     }

//     const handleExcluirClick = (cliente:Cliente) => { */}
{/* //         setClientes(clientes.filter(c => c !== cliente));
//     };

//     const handleProdutoChange = (event: React.ChangeEvent<HTMLSelectElement>) => { */}
{/* //         setProdutoSelecionado(event.target.value);
//     };

//     const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setServicoSelecionado(event.target.value);
//     };

//     const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (clienteModal) {
//             setClienteModal({ ...clienteModal, nome: event.target.value });
//         }
//     };

//     const handleNomeSocialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (clienteModal) {
//             setClienteModal({ ...clienteModal, nomeSocial: event.target.value });
//         }
//     };

//     const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (clienteModal) {
//             setClienteModal({ ...clienteModal, cpf: event.target.value });
//         }
//     };
    
//     const handleRgsChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
//         if (clienteModal) {
//             const rgs = event.target.value.split(', ').map(rg => rg.trim());
//             setClienteModal({ ...clienteModal, rgs: rgs });
//         }
//     };

//     const handleGeneroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (clienteModal) {
//             setClienteModal({ ...clienteModal, genero: event.target.value });
//         }
//     };

//     const handleTelefonesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (clienteModal) {
//             const telefones = event.target.value.split(', ').map(telefone => telefone.trim());
//             setClienteModal({ ...clienteModal, telefones: telefones });
//         }
//     };

//     const adicionarConsumo = () => {
//         console.log("Adicionar consumo");
//         setModalConsumoShow(false);
//     }

//     const alterarCliente = () => {
//         console.log("Alterar cliente");
//         setModalAlterarShow(false);
//     }

//     const excluirCliente = () => {
//         console.log("Excluir cliente");
//         setModalExcluirShow(false);
//     }
//     // componentDidMount() {
//     //     // Substitua 'http://localhost:3000/clientes' pela URL do seu servidor
//     //     fetch('http://localhost:3000/clientes')
//     //         .then(response => response.json())
//     //         .then(clientes => setState({ clientes }));
//     // }

//     const clientesFiltrados = clientes.filter(cliente =>
//         cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
//         cliente.cpf.includes(filtro)
//     );

//         return (
//           <>
//                 <div className={styles['container-lista']}>
//                     <div className={styles['wrap-lista']}>
//                         <div className={styles['titulo-tabela']}>
//                             <h1>Lista de Clientes</h1>
//                         </div>
//                     <div className={styles['titulo-tabela2']}>
//                     <input type="text" value={filtro} onChange={handleFiltroChange} placeholder="Buscar por nome ou CPF" />
//                         <Link to="/cadastroSJC">
//                             <button>Cadastrar </button>
//                         </Link>
//                     </div>                     
//                     <div className={styles['table-responsive']}>
//                     <Table striped hover>
//                     <thead>
//                       <tr className={styles['coluna-left']}>
//                         <th>Nome</th>
//                         <th>Telefone</th>
//                         <th>Detalhes</th>
//                         <th>Consumo</th>                        
//                         <th>Alterar</th>
//                         <th>Excluir</th>
                        
//                       </tr>
//                     </thead>
//                     <tbody>
//                     {clientesFiltrados.map((cliente: Cliente, index: number) => ( 
//                         <tr className={styles['coluna-left']} key={index} >
//                             <td>{cliente.nome}</td>
//                             <td>{cliente.telefones.join(', ')}</td>
//                             <td><button onClick={() => handleRowClick(cliente)}>Detalhes</button></td>
//                             <td><button onClick={() => handleConsumoClick(cliente)}>Adicionar</button></td>
//                             <td><button onClick={() => handleAlterarClick(cliente)}>Editar</button></td>
//                             <td><button onClick={() => handleExcluirClick(cliente)}>Excluir</button></td>
                            
//                         </tr>
//                     ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//               <div>
//               <Modal show={modalShow} onHide={() => setModalShow(false)}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>{clienteModal?.nome}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Nome Social: {clienteModal?.nomeSocial}</p>
//                         <p>CPF: {clienteModal?.cpf}</p>
//                         <p>RGs: {clienteModal?.rgs.join(', ')}</p>
//                         <p>Gênero: {clienteModal?.genero}</p>
//                         <p>Data de Cadastro: {clienteModal?.dataCadastro ? new Date(clienteModal.dataCadastro).toLocaleDateString('pt-BR') : ''}</p>
//                         <p>Telefones: {clienteModal?.telefones.join(', ')}</p>
//                     </Modal.Body>
//                 </Modal>
//                 <Modal show={modalConsumoShow} onHide={() => setModalConsumoShow(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Adicionar Consumo</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form>
//                             <label>
//                                 Produto:
//                                 <select value={produtoSelecionado} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleProdutoChange(event)}>
//                                     <option value="">Selecione um produto</option>
//                                     <option value="produto1">Produto 1</option>
//                                     <option value="produto2">Produto 2</option>
//                                     <option value="produto3">Produto 3</option>
                                    
//                                 </select>
//                             </label>
//                             <br />
//                             <br />
//                             <label>
//                                 Serviço:
//                                 <select value={servicoSelecionado} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleServicoChange(event)}>
//                                     <option value="">Selecione um serviço</option>
//                                     <option value="servico1">Serviço 1</option>
//                                     <option value="servico2">Serviço 2</option>
//                                     <option value="servico3">Serviço 3</option>
                                    
//                                 </select>
//                             </label>
//                         </form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setModalConsumoShow(false)}>
//                             Fechar
//                         </Button>
//                         <Button variant="primary" onClick={adicionarConsumo}>
//                             Salvar
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//                 <Modal show={modalAlterarShow} onHide={() => setModalAlterarShow(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Alterar Cliente</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form>
//                             <label>
//                                 Nome:
//                                 <input type="text" value={clienteModal?.nome} onChange={handleNomeChange} />
//                             </label>
//                             <br />
//                             <label>
//                                 Nome Social:
//                                 <input type="text" value={clienteModal?.nomeSocial} onChange={handleNomeSocialChange} />
//                             </label>
//                             <br />
//                             <label>
//                                 CPF:
//                                 <input type="text" value={clienteModal?.cpf} onChange={handleCPFChange} />
//                             </label>
//                             <br />
//                             <label>
//                                 RGs:
//                                 <input type="text" value={clienteModal?.rgs.join(', ')} onChange={handleRgsChange} />
//                             </label>
//                             <br />
//                             <label>
//                                 Gênero:
//                                 <input type="text" value={clienteModal?.genero} onChange={handleGeneroChange} />
//                             </label>
//                             <br />
//                             <label>
//                                 Telefones:
//                                 <input type="text" value={clienteModal?.telefones.join(', ')} onChange={handleTelefonesChange} />
//                             </label>
//                             <br />
                            
//                         </form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setModalAlterarShow(false)}>
//                             Cancelar
//                         </Button>
//                         <Button variant="primary" onClick={alterarCliente}>Salvar</Button>
//                     </Modal.Footer>
//                 </Modal>
//                 <Modal show={modalExcluirShow} onHide={() => setModalExcluirShow(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Excluir Cliente</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
                        
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setModalExcluirShow(false)}>
//                             Cancelar
//                         </Button>
//                         <Button variant="danger" onClick={excluirCliente}>Excluir</Button>
//                     </Modal.Footer>
//                 </Modal>
//                 </div>
//             </div>                
//             </>
//         );
//     }

// export default ListaClientesSJC; */}