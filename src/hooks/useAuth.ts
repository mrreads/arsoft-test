export const host: String = 'http://23.111.202.224:8094/';

export let headers: Headers = new Headers({"Content-Type": "application/json"});

export let request: RequestInit = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  redirect: 'follow'
};

async function useAuth(email: string, password: string): Promise<any> {

    let body: BodyInit = JSON.stringify({
      "email": email,
      "password": password
    });
    
    const response: Response = await fetch(`${host}auth/login`, { ...request, method: 'POST', body: body  });
    const data = await response.json();
    await headers.append("Authorization", `Bearer_${data.token}`);
    return await data;
}

export default useAuth;