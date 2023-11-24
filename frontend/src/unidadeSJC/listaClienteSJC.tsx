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
import 'bootstrap-icons/font/bootstrap-icons.css';



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

const handleEnderecoChange = (field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setClienteAtualizar(prevState => {
    if (prevState) {
      const newEndereco = {...prevState.endereco};
      newEndereco[field as keyof Endereco] = event.target.value;
      return {...prevState, endereco: newEndereco};
    }
    return prevState;
  });
};

function handlePhoneChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, ''); 
  const ddd = value.slice(0, 2); 
  const numero = value.slice(2); 

  setClienteAtualizar(prevState => {
    if (prevState) {
      const newTelefones = [...prevState.telefones];
      newTelefones[index].ddd = ddd;
      newTelefones[index].numero = numero;
      return {...prevState, telefones: newTelefones};
    }
    return prevState;
  });
}

const fetchClientes = async () => {
  const response = await fetch('http://localhost:32832/clientes');
  const data = await response.json();
  data.sort((a: Cliente, b: Cliente) => a.nome.localeCompare(b.nome));
  setClientes(data);
};

useEffect(() => {
  fetchClientes();
}, []);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (clienteAtualizar) {
    await atualizadorCliente.atualizar(clienteAtualizar);
    setModalAlterarShow(false);
    setTimeout(fetchClientes, 500); 
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

function formatPhoneNumber(ddd: string, numero: string) {
  return `(${ddd}) ${numero.substring(0, 4)}-${numero.substring(4)}`;
}

return (
  <div className={styles['container-lista']}>
      <div className={styles['wrap-lista']}>
          <div className={styles['titulo-tabela']}>
              <h1>Lista de Clientes</h1>
          </div>
          <div className={styles['titulo-tabela2']}>
              <input type="text" value={filtro} onChange={handleFiltroChange} placeholder="Buscar por nome" />
              <span className="bi bi-search"></span>
              
          </div>
          <div className={styles['table-responsive']}>
              <Table striped hover>
                  <thead>
                      <tr className={styles['coluna-left']}>
                          <th>Nome</th>
                          <th>Sobrenome</th>
                          <th>Endereço</th>
                          <th>Cidade</th>
                          <th>Estado</th>                          
                          <th>Telefone</th>                          
                          <th>Editar</th>
                          <th>Excluir</th>
                      </tr>
                  </thead>
                  <tbody>
                      {clientesFiltrados.map((cliente, index) => (
                          <tr className={styles['coluna-left']} key={index}>                              
                              <td>{cliente.nome}</td>
                              <td>{cliente.sobreNome}</td>
                              <td>{cliente.endereco.rua}, {cliente.endereco.numero}, {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.estado}, {cliente.endereco.codigoPostal}</td>
                              <td>{cliente.endereco.cidade}</td>
                              <td>{cliente.endereco.estado}</td>                              
                              <td>{cliente.telefones.map(telefone => (
                                  <p key={telefone.numero}>{telefone.ddd} {telefone.numero}</p>
                              ))}</td>                              
                              <td>         
                              <button onClick={() => handleAlterarShow(cliente)}>Editar</button>
                              </td>
                              <td>
                              <button onClick={(e) => excluirLocal(cliente.id, e)}>Excluir</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>              
            </div>
            <div className={styles['titulo-tabela2']}>
              <Link to="/cadastroSJC">
                  <button>Cadastrar </button>
              </Link>
              </div>
            </div>
            <div>
            <Modal show={modalAlterarShow} onHide={() => setModalAlterarShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title className={styles['modal-title']}>Atualizar Cliente</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles['modal-container']}>
                  {clienteAtualizar && (
                    <>
                      <input type="hidden" name="id" value={clienteAtualizar.id} />
                      <label>
                        Nome:
                        <br />
                        <input type="text" name="nome" value={clienteAtualizar.nome} onChange={handleNomeChange} className={styles['full-width-input']} />
                      </label>
                      <label>
                        Sobrenome:
                        <br />
                        <input type="text" name="sobreNome" value={clienteAtualizar.sobreNome} onChange={handleSobreNomeChange} className={styles['full-width-input']}/>
                      </label>
                      <label>
                        Rua:
                        <br />
                        <input type="text" name="rua" value={clienteAtualizar.endereco.rua} onChange={e => handleEnderecoChange('rua', e)} className={styles['full-width-input']} />
                      </label>
                      <div className={styles['flex-container-modal']}>
                        <label className={styles['flex-item-modal']}>
                          Número:
                          <br />
                          <input type="text" name="numero" value={clienteAtualizar.endereco.numero} onChange={e => handleEnderecoChange('numero', e)} />
                        </label>
                        <label className={styles['flex-item-modal']}>
                          Bairro:
                          <br />
                          <input type="text" name="bairro" value={clienteAtualizar.endereco.bairro} onChange={e => handleEnderecoChange('bairro', e)} />
                        </label>
                      </div>
                      <div className={styles['flex-container-modal']}>
                        <label className={styles['flex-item-modal']}>
                          CEP:
                          <br />
                          <input type="text" name="codigoPostal" value={clienteAtualizar.endereco.codigoPostal} onChange={e => handleEnderecoChange('codigoPostal', e)} />
                        </label>
                        <label className={styles['flex-item-modal']}>
                          Cidade:
                          <br />
                          <input type="text" name="cidade" value={clienteAtualizar.endereco.cidade} onChange={e => handleEnderecoChange('cidade', e)} />
                        </label>
                      </div>
                      <div className={styles['flex-container-modal']}>
                        <label className={styles['flex-item-modal']}>
                          Estado:
                          <br />
                          <input type="text" name="estado" value={clienteAtualizar.endereco.estado} onChange={e => handleEnderecoChange('estado', e)} />
                        </label>
                        <label className={styles['flex-item-modal']}>
                          Telefone:
                          {clienteAtualizar.telefones.map((telefone, index) => (
                            <div key={index}>
                              <input 
                                type="text" 
                                name={`telefone-${index}`} 
                                value={formatPhoneNumber(telefone.ddd, telefone.numero)} 
                                onChange={e => handlePhoneChange(index, e)} 
                              />
                            </div>
                          ))}
                        </label>
                      </div>
                      <label>
                        Informações adicionais:
                        <br />
                        <textarea name="informacoesAdicionais" value={clienteAtualizar.endereco.informacoesAdicionais} onChange={e => handleEnderecoChange('informacoesAdicionais', e)} className={styles['full-width-input']} />
                      </label>                      
                      <div className={styles['button-container']}>                        
                        <button type="submit">Atualizar</button>
                      </div>
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

