import { useEffect, useState } from "react";
import { host, request } from "@/hooks/useToken";

import User from "@/components/User/User";
import EditUser from "./User/EditUser";
import Paggination from '@/components/Paggination';

import IUser from "@/interfaces/IUser";

import '@/assets/styles/tables.scss';

function Users() {
    const [toggleRerender, setToggleRerender] = useState(false); // это нужно чтобы вызывать ререндер при удалении/добавлении пользователей
    const rerender = () => setToggleRerender(!toggleRerender); // можно в тупую обновлять страницу, но так правильнее

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const count = (async () => fetch(`${host}account`, request).then(res => res.json()))();
        count.then(data => setMaxPages(Math.ceil(data.length / 3)));
    }, [toggleRerender]);
    
    const [editUser, setEditUser] = useState<number | null>(null);
    
    useEffect(() => {
        (currentPage > maxPages) ? setCurrentPage(maxPages) : null; // если произошёл ререндер и страниц стало меньше
        (async () => fetch(`${host}account/api?page=${currentPage - 1}`, request).then(res => res.json()))().then(data => setUsers(data));
        setEditUser(null);
    }, [currentPage, toggleRerender]);

    const prevPage = (): void => {
        setEditUser(null);
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
    }
    const nextPage = (): void => {
        setEditUser(null);
        if (currentPage < maxPages)
            setCurrentPage(currentPage + 1)
    }
    return (
        <div className="table">

            <div className="table-title">
                <p className="table-title__item">Имя</p>
                <p className="table-title__item">Фамилия</p>
                <p className="table-title__item">Почта</p>
                <p className="table-title__item">Роль</p>
                <p className="table-title__item">Организация</p>
                <p className="table-title__item icon">Изображения</p>
            </div>
                
            {   
                users.map(user => 
                    (user.id != editUser)
                    ? 
                    <User key={user.id} user={user} rerender={rerender} edit={setEditUser} /> 
                    :
                    <EditUser key={user.id} user={user} rerender={rerender} edit={setEditUser} />
                )
            }
            
            <div className="bottom_panel">
                <Paggination currentPage={currentPage} maxPages={maxPages} prevPage={prevPage} nextPage={nextPage} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    )
}

export default Users;