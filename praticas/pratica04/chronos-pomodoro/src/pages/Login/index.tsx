// src/pages/Login/index.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import { showMessage } from '../../adapters/showMessage';
import styles from './styles.module.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username.trim()) { showMessage.warn('Informe o usuário'); return; }
    if (!password)         { showMessage.warn('Informe a senha');  return; }

    if (login(username, password)) {
      showMessage.success('Bem-vindo!');
      navigate('/home');
    } else {
      showMessage.error('Usuário ou senha inválidos');
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <header className={styles.logo}>
          <h1 className={styles.logoTitle}>⏱ Chronos</h1>
          <p className={styles.logoSubtitle}>Pomodoro Timer</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="login-user" className={styles.label}>Usuário</label>
            <input
              id="login-user"
              type="text"
              className={styles.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              autoComplete="username"
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="login-pass" className={styles.label}>Senha</label>
            <input
              id="login-pass"
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              aria-required="true"
            />
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Entrar
          </button>
        </form>

        <hr className={styles.divider} />

        <div className={styles.links}>
          <button
            type="button"
            className={styles.btnLink}
            onClick={() => showMessage.info('Recuperação de senha em breve')}
          >
            Esqueci minha senha
          </button>
          <button
            type="button"
            className={styles.btnLink}
            onClick={() => showMessage.info('Cadastro em breve')}
          >
            Criar conta
          </button>
        </div>
      </div>
    </main>
  );
}