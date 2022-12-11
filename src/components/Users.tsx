import { useEffect, useState } from "react";
import { host, port, request } from "@/hooks/useToken";

import User from "@/components/User/User";
import EditUser from "@/components/User/Edit";
import Create from "@/components/User/Create";
import Paggination from '@/components/Paggination';

import IUser from "@/interfaces/IUser";

import '@/assets/styles/tables.scss';

function Users() {
    const [toggleRerender, setToggleRerender] = useState(false); // это нужно чтобы вызывать ререндер при удалении/добавлении пользователей
    const rerender = () => setToggleRerender(!toggleRerender); // можно в тупую обновлять страницу, но так правильнее
    const [sort, setSort] = useState<string>('none');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [users, setUsers] = useState<IUser[]>([]);
    const [editUser, setEditUser] = useState<number | null>(null);
    
    useEffect(() => {
        fetch(`${host}:${port}/account`, request).then(res => res.json()).then(data => setMaxPages(Math.ceil(data.length / 3)));
        (currentPage > maxPages) ? setCurrentPage(maxPages) : null; // если произошёл ререндер и страниц стало меньше
        fetch(`${host}:${port}/account/api?page=${currentPage - 1}&sort=${sort}`, request).then(res => res.json()).then(data => setUsers(data));
        setEditUser(null);
    }, [currentPage, toggleRerender, sort, maxPages]);

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
    
    useEffect(() => setEditUser(null), [sort]);

    return (
        <div className="table">
            <div className="table-title">
                <p className={`table-title__item ${sort == 'name' ? 'active' : ''}`} onClick={() => setSort('name') }>Имя</p>
                <p className={`table-title__item ${sort == 'lastname' ? 'active' : ''}`} onClick={() => setSort('lastname') }>Фамилия</p>
                <p className={`table-title__item ${sort == 'email' ? 'active' : ''}`} onClick={() => setSort('email') }>Почта</p>
                <p className={`table-title__item ${sort == 'roles' ? 'active' : ''}`} onClick={() => setSort('roles') }>Роль</p>
                <p className={`table-title__item ${sort == 'organization' ? 'active' : ''}`} onClick={() => setSort('organization') }>Организация</p>
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
                <Create rerender={rerender} edit={setEditUser}  />
            </div>

        </div>
    )
}

export default Users;