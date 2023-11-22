import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import wbimg from './assets/logo.png';
import styles from './estilos/styles.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | undefined>();
    const history = useHistory();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        const defaultPassword = '1234'; // Defina a senha padrão aqui
        if (password !== defaultPassword) {
            setError('Senha incorreta');
            return;
        }
        if (email === 'unidadesjc@gmail.com') {
            history.push('/clienteSJC');
            setError('');
        } else if (email === 'unidadetaubate@gmail.com') {
            history.push('/clienteTaubate');
            setError('');
        } else {
            setError('Email não cadastrado');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles['container-login']}>
                <div className={styles['wrap-login']}>
                    <form className={styles['login-form']} onSubmit={handleLogin}>
                        <span className={styles['login-form-title']}>
                            <img src={wbimg} alt="logo"/> 
                        </span>                                                         
                        <div className={styles['wrap-input']}>
                            <input className={email !== "" ? styles['has-val'] + ' ' + styles.input : styles.input} 
                            type="email" 
                            value={email}
                            onChange={handleEmailChange}
                            required/>
                            <span className={styles['focus-input']} data-placeholder="Email"></span>
                        </div>
                        
                        <div className={styles['wrap-input']}>
                            <input className={password !== "" ? styles['has-val'] + ' ' + styles.input : styles.input} 
                            type="password" 
                            value={password}
                            onChange={handlePasswordChange}
                            required/>
                            <span className={styles['focus-input']} data-placeholder="Password"></span>                                
                        </div>   
                        {error && <div className={styles.error}>{error}</div>} {/* Adicione a mensagem de erro aqui */}
                        <div className={styles['container-login-form-btn']}>
                            <button className={styles['login-form-btn']} type="submit">Entrar</button>
                        </div>
                    </form>                         
                </div>
            </div>
        </div>                
    );
}

export default Login;