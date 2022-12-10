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

  return (
    <AuthContext.Provider value={auth} >
      <div className="App">
        <div className="container">
          { (!auth.error) ? <App /> : <h1 className="title"> Неверные логин/пароль </h1> }
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export default Auth;
