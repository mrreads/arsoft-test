import save from './../assets/images/icons/save.png';
import edit from './../assets/images/icons/edit.png';
import remove from './../assets/images/icons/remove.png';

function User({ data }) {
    return (
        <div className="table-user">
            <p className="table-user__item"> { data.user.lastName } </p>
            <p className="table-user__item"> { data.user.lastName } </p>
            <p className="table-user__item"> { data.user.name } </p>
            <p className="table-user__item"> Роль </p>
            <p className="table-user__item"> { data.organization.companyTitle }</p>
            <div className="table-user__item icon"> <img src={save} /> </div>
            <div className="table-user__item icon"> <img src={edit} /> </div>
            <div className="table-user__item icon"> <img src={remove} /> </div>
        </div>
    )
}

export default User;