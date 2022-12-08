import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth.js";

function App() {
  const [auth, setAuth] = useState({ "error": "Unauthorized" });
  useEffect(() => {
    useAuth('superuser', 'superuser').then((data: any) => setAuth(data));
  }, []);
  
  return (
    <div className="App">
      <div className="container">
        { (!auth.error) ? <h1> Верные </h1> : <h1> Неверные логин/пароль </h1> }
      </div>
    </div>
  )
}

export default App;
