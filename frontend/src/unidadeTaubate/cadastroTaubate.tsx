import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../estilos/styles.module.css';


function CadastroTaubate() {
    const [state, setState] = useState({
        nome: '',
        nomeSocial: '',
        cpf: '',
        rgs: '',
        genero: '',
        telefones: '',
        produto: '',
        valorProduto: 0,
        servico: '',
        valorServico: 0
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'number' ? Number(target.value) : target.value;
        const name = target.name;

        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmitCliente(event: FormEvent) {
        event.preventDefault();
        console.log(state);
        setState(prevState => ({
            ...prevState,
            nome: '',
            nomeSocial: '',
            cpf: '',
            rgs: '',
            genero: '',
            telefones: ''
        }));
    }

    function handleSubmitProduto(event: FormEvent) {
        event.preventDefault();
        console.log(state);
        setState(prevState => ({
            ...prevState,
            produto: '',
            valorProduto: 0
        }));
    }
    
    function handleSubmitServico(event: FormEvent) {
        event.preventDefault();
        console.log(state);
        setState(prevState => ({
            ...prevState,
            servico: '',
            valorServico: 0
        }));
    }

        return (
            <>
            <div className={styles['container-lista']}>
                <div className={styles['wrap-cadastro']}>
                    <div className={styles['titulo-cadastro']}>
                        <h1>Cadastro de Clientes</h1>
                    </div>
                    <form  onSubmit={handleSubmitCliente}>
                        <div className={styles['form-group']}>
                            <label>Nome:</label>
                            <input type="text" className={styles['full-width']} name="nome" value={state.nome} onChange={handleInputChange} required />
                        </div>
                        <div className={styles['form-group']}>
                            <label>Nome Social:</label>
                            <input type="text" className={styles['full-width']} name="nomeSocial" value={state.nomeSocial} onChange={handleInputChange} />
                        </div>                        
                        <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                            <div className={styles['half']}>
                                <label>CPF:</label>
                                <input type="text" name="cpf" value={state.cpf} onChange={handleInputChange} required />
                            </div>
                            <div className={styles['half']}>
                                <label>RG:</label>
                                <input type="text" name="rgs" value={state.rgs} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                            <div className={styles['half']}>
                                <label>Gênero:</label>
                                <input type="text" name="genero" value={state.genero} onChange={handleInputChange} required />
                            </div>
                            <div className={styles['half']}>
                                <label>Telefones:</label>
                                <input type="text" name="telefones" value={state.telefones} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <input type="submit" value="Enviar" />
                        </div>
                    </form>
                </div>
             
            
            
                <div className={styles['wrap-cadastro2']}>
                    <div className={styles['titulo-cadastro']}>
                        <h1>Cadastro de Produtos </h1>
                    </div>
                    <form onSubmit={handleSubmitProduto}>
                        <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                            <div className={styles['half']}>
                                <label>Produto:</label>
                                <input type="text" name="produto" value={state.produto} onChange={handleInputChange} required />
                            </div>
                            <div className={styles['half']}>
                                <label>Valor:</label>
                                <input type="number" name="valorProduto" value={state.valorProduto} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <input type="submit" value="Enviar" />
                        </div>
                    </form>
                </div>
             

            
                <div className={styles['wrap-cadastro2']}>
                    <div className={styles['titulo-cadastro']}>
                        <h1>Cadastro de Serviços </h1>
                    </div>
                    <form onSubmit={handleSubmitServico}>
                        <div className={styles['form-group'] + ' ' + styles['flex-container']}>
                            <div className={styles['half']}>
                                <label>Serviço:</label>
                                <input type="text" name="servico" value={state.servico} onChange={handleInputChange} required />
                            </div>
                            <div className={styles['half']}>
                                <label>Valor:</label>
                                <input type="number" name="valorServico" value={state.valorServico} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <input type="submit" value="Enviar" />
                        </div>
                    </form>
                </div>
            </div> 
        </>
                    
        );
    }

    export default CadastroTaubate;