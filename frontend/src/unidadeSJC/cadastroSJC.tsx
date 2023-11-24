import React, { useState } from 'react';
import axios from 'axios';
import { Cliente, Endereco } from '../cliente';
import styles from '../estilos/styles.module.css';
import CadastradorCliente from '../cadastradores/cadastradorCliente';
import { useHistory } from 'react-router-dom';

function CadastroSJC() {
    
    const [clienteCadastrar, setClienteCadastrar] = useState<Cliente | null>(null);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [telefone, setTelefone] = useState({ddd: '', numero: ''});
    const [novoCliente, setNovoCliente] = useState<Cliente>({
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
        telefones: [{ddd: '', numero: ''}],
    });

const cadastradorCliente = new CadastradorCliente();    

const history = useHistory();

const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNovoCliente(prevState => ({...prevState, nome: event.target.value}));
  };
  
  const handleSobreNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNovoCliente(prevState => ({...prevState, sobreNome: event.target.value}));
  };
  
  const handleEnderecoChange = (field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNovoCliente(prevState => {
      const newEndereco = {...prevState.endereco};
      newEndereco[field as keyof Endereco] = event.target.value;
      return {...prevState, endereco: newEndereco};
    });
  };
  
  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, ''); 
    setNovoCliente(prevState => ({...prevState, telefones: [{ddd: '', numero: value}]}));
  }
  
  // ...
  
  



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await cadastradorCliente.cadastrar(novoCliente);
    history.push('/clienteSJC');
};
function formatPhoneNumber(ddd: string, numero: string) {
    return `(${ddd}) ${numero.substring(0, 4)}-${numero.substring(4)}`;
  }

    return (
    <div className={styles['container-lista']}>
        <div className={styles['wrap-cadastro']}>
            <div className={styles['titulo-cadastro']}>
                <h1>Cadastro de Clientes</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label>Nome:</label>
                    <input type="text" className={styles['full-width']} name="nome" value={novoCliente.nome} onChange={handleNomeChange} required />
                </div>
                <div className={styles['form-group']}>
                    <label>Sobrenome:</label>
                    <input type="text" className={styles['full-width']} name="sobreNome" value={novoCliente.sobreNome} onChange={handleSobreNomeChange} />
                </div>                
              {/* <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                <div className={styles['half']}>
                  <label>CPF:</label>
                  <input type="text" name="cpf" value={novoCliente.cpf} onChange={handleInputChange} required />
                </div>
                
                <div className={styles['half']}>
                  <label>Gênero:</label>
                  <select name="genero" value={novoCliente.genero} onChange={handleInputChange} required>
                    <option value="">Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
              </div> */}
              <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                
                <div className={styles['half']}>
                    <label>Telefone:</label>
                    <input type="text" className={styles['full-width']} name="telefone" value={novoCliente.telefones[0]?.numero} onChange={handlePhoneChange} required />
                </div>
                </div>
                <div className={styles['form-group']}>
                    <label>Endereço:</label>
                    <input type="text" className={styles['full-width']} name="rua" value={novoCliente.endereco.rua} onChange={(event) => handleEnderecoChange('rua', event)} required />
                </div>
                <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                    <div className={styles['half']}>
                        <label>Cidade:</label>
                        <input type="text" className={styles['full-width']} name="cidade" value={novoCliente.endereco.cidade} onChange={(event) => handleEnderecoChange('cidade', event)} required />
                    </div>
                    <div className={styles['half']}>
                        <label>Estado:</label>
                        <input type="text" className={styles['full-width']} name="estado" value={novoCliente.endereco.estado} onChange={(event) => handleEnderecoChange('estado', event)} required />
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <button type="submit" className={styles['btn-submit']}>Cadastrar</button>
                </div>
                    </form>
                </div>
            </div>
            );
        }
    
    

export default CadastroSJC;


      
