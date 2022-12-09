import { useEffect, useState } from "react";
import { host, request } from "@/hooks/useToken";

import User from "./User";
import Paggination from './Paggination';

import IUser from "@/interfaces/IUser";

import '@/assets/styles/tables.scss';

function Table() {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const count = (async () => fetch(`${host}account`, request).then(res => res.json()))();
        count.then(data => setMaxPages(Math.ceil(data.length / 3)));
    }, []);
    
    
    useEffect(() => {
        (async () => fetch(`${host}account/api?page=${currentPage - 1}`, request).then(res => res.json()))().then(data => setUsers(data));
    }, [currentPage]);

    const prevPage = (): void => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
    }
    const nextPage = (): void => {
        if (currentPage < maxPages)
            setCurrentPage(currentPage + 1)
    }

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
            
            <div className="bottom_panel">
                <Paggination currentPage={currentPage} maxPages={maxPages} prevPage={prevPage} nextPage={nextPage} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    )
}

export default Table;