import { useContext } from "react";
import authContext from '@/contexts/authContext';
export default () => useContext(authContext);
export { host, port, headers, request } from '@/hooks/useAuth';