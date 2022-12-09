import { useEffect, useState } from "react";
import { host, request } from "@/hooks/useToken";

import save from '@/assets/images/icons/save.png';
import edit from '@/assets/images/icons/edit.png';
import remove from '@/assets/images/icons/remove.png';

import IUser from '@/interfaces/IUser';
interface IProps {
    "user": IUser
}

enum Role {
    "ROLE_USER" = "Пользователь",
    "ROLE_ADMIN" = "Администратор",
    "ROLE_SUPERUSER" = "Суперпользователь"
}


function User({ user }: IProps) {
    const { id, user: { lastName, name }, organization: { companyTitle }, roles } = user;
    const role: Role = (roles.map(r => r.name).includes("ROLE_SUPERUSER")) ? Role.ROLE_SUPERUSER : (roles.map(r => r.name).includes("ROLE_ADMIN")) ? Role.ROLE_ADMIN : Role.ROLE_USER;
    
    const download = () => {
        const archive = (async () => fetch(`${host}screenshot/arch/${id}`, request).then(res => res.json()))();
        archive.then(data => console.log(data));
    }
    
    return (
        <div className="table-user">
            <p className="table-user__item count"> { name } </p>
            <p className="table-user__item"> { lastName } </p>
            <p className="table-user__item"> username {id} </p>
            <p className="table-user__item"> { role } </p>
            <p className="table-user__item"> { companyTitle }</p>
            <div className="table-user__item icon" onClick={download}> <img src={save} /> </div>
            <div className="table-user__item icon"> <img src={edit} /> </div>
            <div className="table-user__item icon"> <img src={remove} /> </div>
        </div>
    )
}

export default User;