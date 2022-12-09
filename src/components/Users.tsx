import { useEffect, useState } from "react";
import useAPI from '@/hooks/useAPI';

import User from "./User";
import Paggination from './Paggination';

import IUser from "@/interfaces/IUser";

import '@/assets/styles/tables.scss';

function Table() {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const count = useAPI('GET', `account`);

    const [users, setUsers] = useState<IUser[]>([]);
    const fetch = useAPI('GET', `account/api?page=${currentPage - 1}`);
    useEffect(() => {
        count.then(data => setMaxPages(Math.ceil(data.length / 3)));
        fetch.then(data => setUsers(data));
    }, []);

    useEffect(() => {
        fetch.then(data => setUsers(data));
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