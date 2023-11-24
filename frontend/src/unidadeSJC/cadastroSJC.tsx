import React, { useState } from 'react';
import axios from 'axios';
import { Cliente, Endereco } from '../cliente';
import styles from '../estilos/styles.module.css';
import CadastradorCliente from '../cadastradores/cadastradorCliente';
import { useHistory } from 'react-router-dom';

function CadastroSJC() {
    
    
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
  
  const handleEnderecoChange = (field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
   
  



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await cadastradorCliente.cadastrar(novoCliente);
    history.push('/clienteSJC');
};

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
                         
                               
                <div className={styles['form-group']}>
                    <label>Rua:</label>
                    <input type="text" className={styles['full-width']} name="rua" value={novoCliente.endereco.rua} onChange={(event) => handleEnderecoChange('rua', event)} required />
                    
                </div>
                <div className={styles['form-group'] + ' ' + styles['flex-container'] }>
                    <div className={styles['half']}>
                    <label>Número:</label>
                    <input type="text" name="rua" value={novoCliente.endereco.numero} onChange={(event) => handleEnderecoChange('numero', event)} required />
                    </div>                
                <div className={styles['half']}>
                    <label>Bairro:</label>                    
                    <input type="text"  name="rua" value={novoCliente.endereco.bairro} onChange={(event) => handleEnderecoChange('bairro', event)} required />
                </div>
                <div className={styles['half']}>                    
                        <label>CEP:</label>
                        <input type="text"  name="rua" value={novoCliente.endereco.codigoPostal} onChange={(event) => handleEnderecoChange('codigoPostal', event)} required />
                </div>              
                
            </div>
                
               
                <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                
                    
                    <div className={styles['half']}>
                    <label>Estado:</label>
                    <select name="estado" value={novoCliente.endereco.estado} onChange={(event) => handleEnderecoChange('estado', event)} required>
                        <option value="">Selecione...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Para</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                        <option value="EX">Estrangeiro</option>                                 
                    </select>                               
                </div>
                <div className={styles['half']}>
                        <label>Cidade:</label>
                        <input type="text" name="cidade" value={novoCliente.endereco.cidade} onChange={(event) => handleEnderecoChange('cidade', event)} required />
                        
                    </div>
                
                <div className={styles['half']}>
                    <label>Telefone:</label>
                    <input type="text" name="telefone" value={novoCliente.telefones[0]?.numero} onChange={handlePhoneChange} required />
                </div>
                
                
                </div>
                <div className={styles['form-group']}>
                    <label>Informacoes Adicionais:</label>                       
                <textarea name="informacoesAdicionais" className={styles['full-width']} value={novoCliente.endereco.informacoesAdicionais} onChange={(event) => handleEnderecoChange('informacoesAdicionais', event)} required />
                </div>      
                <div className={` ${styles['btn-center']}`}>
                    <button type="submit" className={styles['btn-submit']}>Cadastrar</button>
                </div>         
                             
            </form>
            
                
        </div>
    </div>
    );
}
    
    

export default CadastroSJC;


      
