import { useEffect, useState } from "react";
import useAPI from '@/hooks/useAPI';
import User from "./User";

import IUser from "@/interfaces/IUser";

import '@/assets/styles/tables.scss';


function Table() {
    const [users, setUsers] = useState<IUser[]>([]);
    const fetch = useAPI('GET', 'account');
    useEffect(() => {
        fetch.then(data => setUsers(data));
    }, []);

    return (
        <div className="table">

            <div className="table-title">
                <p className="table-title__item">Имя</p>
                <p className="table-title__item">Фамилия</p>
                <p className="table-title__item">Username</p>
                <p className="table-title__item">Роль</p>
                <p className="table-title__item">Организация</p>
                <p className="table-title__item icon">Изображения</p>
            </div>

            { users.map(user => <User key={user.id} user={user} />)}
        
        </div>
    )
}

export default Table;