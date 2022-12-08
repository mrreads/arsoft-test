import useToken from './useToken';
const host = 'http://23.111.202.224:8094';

async function useAPI(method: string, url: string) {
    const { token } = useToken();

    let headers: Headers = new Headers();
    headers.append("Authorization", `Bearer_${token}`);

    let request: RequestInit = {
        method: method,
        headers: headers,
        redirect: 'manual'
    };

    const response: Response = await fetch(`${host}${url}`, request);
    return await response.json();
}

export default useAPI;