import Delete from '@/components/User/Delete';
import Download from '@/components/User/Download';

import icon from '@/assets/images/icons/edit.png';

import IUser from '@/interfaces/IUser';

interface IProps {
    "user": IUser,
    "rerender": () => void,
    "edit": (id: number | null) => void
}

enum Role {
    "ROLE_USER" = "Пользователь",
    "ROLE_ADMIN" = "Администратор",
    "ROLE_SUPERUSER" = "Суперпользователь"
}

function User({ user, rerender, edit }: IProps) {
    const { id, email, user: { lastName, name }, organization: { companyTitle }, roles } = user;
    const role: Role = (roles.map(r => r.name).includes("ROLE_SUPERUSER")) ? Role.ROLE_SUPERUSER : (roles.map(r => r.name).includes("ROLE_ADMIN")) ? Role.ROLE_ADMIN : Role.ROLE_USER;

    return (
        <div className="table-user">
            <p className="table-user__item count"> { name } </p>
            <p className="table-user__item"> { lastName } </p>
            <p className="table-user__item"> { email } </p>
            <p className="table-user__item"> { role } </p>
            <p className="table-user__item"> { companyTitle }</p>
            <Download id={id} edit={edit} />
            <Delete email={email} rerender={rerender} edit={edit} />
            <div className="table-user__item icon" onClick={() => edit(id)}> <img src={icon} /> </div>
        </div>
    )
}

export default User;