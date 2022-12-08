import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth.ts";
import AuthContext from '@/contexts/authContext';

import Users from '@/components/Users.tsx';

function App() {
  const [auth, setAuth] = useState({ "error": "Unauthorized" });
  useEffect(() => {
    useAuth('superuser', 'superuser').then((data: any) => setAuth(data));
  }, []);
  
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (!auth.error)
      setToken(auth);
  }, [auth]);
  
  return (
    <AuthContext.Provider value={auth} >
      <div className="App">
        <div className="container">
          { (!auth.error) ? <Users /> : <h1> Неверные логин/пароль </h1> }
        </div>
      </div>
    </AuthContext.Provider>

  )
}

export default App;
