import save from '@/assets/images/icons/save.png';
import edit from '@/assets/images/icons/edit.png';
import remove from '@/assets/images/icons/remove.png';

import IUser from '@/interfaces/IUser';
interface IProps {
    "user": IUser
}

function User({ user }: IProps) {
    const { user: { lastName, name }, organization: { companyTitle } } = user;
    return (
        <div className="table-user">
            <p className="table-user__item"> { lastName } </p>
            <p className="table-user__item"> { lastName } </p>
            <p className="table-user__item"> { name } </p>
            <p className="table-user__item"> Роль </p>
            <p className="table-user__item"> { companyTitle }</p>
            <div className="table-user__item icon"> <img src={save} /> </div>
            <div className="table-user__item icon"> <img src={edit} /> </div>
            <div className="table-user__item icon"> <img src={remove} /> </div>
        </div>
    )
}

export default User;