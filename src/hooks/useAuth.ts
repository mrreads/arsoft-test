import { host } from './useAPI';

async function useAuth(email: string, password: string): Promise<any> {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body: BodyInit = JSON.stringify({
      "email": email,
      "password": password
    });
    
    let request: RequestInit = {
      method: 'POST',
      headers: headers,
      body: body,
      mode: 'cors',
      redirect: 'follow'
    };

    const response: Response = await fetch(`${host}auth/login`, request);
    return await response.json();
}

export default useAuth;