import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AuthContext from '@/contexts/authContext';

import App from '@/App';

import IAuth from "@/interfaces/IAuth";

function Auth() {
  const [auth, setAuth] = useState<IAuth>({ error: "Unauthorized" });
  useEffect(() => {
    // сюда можно было бы вставить загрузку/сохранения токена в куки, 
    // чтобы кадый раз не авторизовываться по новой. 
    // но в данном проекте у нас логин/пароль захардкожены.
    useAuth('superuser', 'superuser').then((data: any) => setAuth(data));
  }, []);
  
  const Error = () => {
    return (
    <div className="auth"> 
      <h1> Неверные логин/пароль </h1> 
      <p> Или озможно браузер блокирует запросы к API </p> 
    </div>);
  };

  return (
    <AuthContext.Provider value={auth} >
      <div className="App">
        <div className="container">
          { (!auth.error) ? <App /> : <Error /> }
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export default Auth;
