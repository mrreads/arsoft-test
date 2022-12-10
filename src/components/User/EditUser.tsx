import { useForm, SubmitHandler  } from "react-hook-form";
import { host, request } from "@/hooks/useToken";

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

interface Inputs {
    name: string,
    lastName: string,
    email: string,
    roles: string,
};

function EditUser({ user, rerender, edit }: IProps) {
    const { id, email, user: { lastName, name }, organization: { companyTitle }, roles } = user;
    const role: string = (roles.map(r => r.name).includes("ROLE_SUPERUSER")) ? "ROLE_SUPERUSER" : (roles.map(r => r.name).includes("ROLE_ADMIN")) ? "ROLE_ADMIN" : "ROLE_USER";

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async form => {
        let body: BodyInit = JSON.stringify({
            "id": id,
            "name": form.name,
            "last_name":  form.lastName,
            "email": form.email,
            "roles": (form.roles == 'ROLE_ADMIN') ? [ {"name": "ROLE_USER"},{"name": "ROLE_ADMIN"}] : [{"name": "ROLE_USER"}]
        });
        await fetch(`${host}account/edit`, { ...request, method: "PUT", body: body })
        .then(res => { if (res.ok == true) { rerender(); edit(null) } });     
    }

    return (
        <form className="table-user" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="table-user__input count" defaultValue={name} {...register("name", { required: true })} />
            <input type="text" className="table-user__input" defaultValue={lastName} {...register("lastName", { required: true })} />
            <input type="text" className="table-user__input" {...register("email", { required: true })} />
            <select className="table-user__select" defaultValue={role} {...register("roles")}>
                <option value="ROLE_USER"> { Role.ROLE_USER } </option>
                <option value="ROLE_ADMIN"> { Role.ROLE_ADMIN } </option>
            </select>
            <p className="table-user__item"> { companyTitle }</p>

            <input type="submit"  className="table-user__button" value="Обновить" />
        </form>
    )
}

export default EditUser;