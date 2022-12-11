import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { host, port, headers as headersToken, request } from "@/hooks/useToken";

interface IProps {
    "rerender": () => void,
    "setPopupActive": (bool: boolean) => void
}

interface ICompanies {
    "timestamp"?: string,
    "success"?: string,
    "data": [
        {
            "id": number,
            "publicationDate"?: string,
            "companyTitle": string,
            "companyUrl"?: string,
            "location"?: string,
            "numberOfAccounts"?: number
        },
    ]
}

interface Inputs {
    name: string,
    lastName: string,
    birthDate: string,
    companyTitle: string,
    email: string,
    password: string,
    roles?: string,
};

function PopupCreate({ rerender, setPopupActive }: IProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    
    const [companies, setCompanies] = useState<ICompanies["data"]>();

    useEffect(() => {
        // с 8094 порта данные не брались
        (async () => fetch(`${host}:8093/organization`, request).then(res => res.json()))().then(res => setCompanies(res.data));
    }, []);

    const createUser: SubmitHandler<Inputs> = async form => {
        const url = (form.roles == 'ROLE_ADMIN') ? "auth/reg/admin" : "reg/user";
        //const port = (form.roles == 'ROLE_ADMIN') ? "8093" : "8094"; // если потребуется разный порт для юзера и админа
        let headers = headersToken;
        headers.delete("Content-Type");
        headers.append("Content-Type", `application/x-www-form-urlencoded`);
        
        let data = new URLSearchParams();
        data.append("companyTitle", form.companyTitle);
        data.append("name", form.name);
        data.append("lastName", form.lastName);
        data.append("lastname", form.lastName);
        data.append("email", form.email);
        data.append("password", form.password);
        data.append("birthDate", "2022-11-30 02:24:46");
        
        await fetch(`${host}:${port}/${url}`, { ...request, method: "POST", body: data, headers: headers })
        .then(res => res.json())
        .then(data => { if (data.success) { rerender(); setPopupActive(false); }});
    }

    return (
    <div className="popup-wrapper">
        <form onSubmit={handleSubmit(createUser)} className="popup create">
            <h2 className="popup-title"> Создать пользователя? </h2>

            <p className="popup-input__title">Имя { errors.name?.type === 'required' && <span className="error">Введите имя</span> } </p>
            <input className="popup-input__item" {...register("name", { required: true })} />

            <p className="popup-input__title">Фамилия { errors.lastName?.type === 'required' && <span className="error">Введите фамилию</span> } </p>
            <input className="popup-input__item" {...register("lastName", { required: true })} />

            <p className="popup-input__title">Email { errors.email?.type === 'required' && <span className="error">Введите email</span> } </p>
            <input className="popup-input__item" {...register("email", { required: true })} />

            <p className="popup-input__title">Пароль { errors.password?.type === 'required' && <span className="error">Введите пароль</span> } </p>
            <input className="popup-input__item" type="password" {...register("password", { required: true })} />

            <select className={`popup-input__select ${(errors.companyTitle?.type === 'required') ? 'error' : ''}`} {...register("companyTitle", { required: true })}>
                <option value="">Выберите комппанию</option>
                { companies?.map(c => <option value={c.companyTitle} key={c.id}> { c.companyTitle }</option>) }
            </select>

            <select className={`popup-input__select ${(errors.roles?.type === 'required') ? 'error' : ''}`} {...register("roles", { required: true })}>
                <option value="">Выберите роль</option>
                <option value="ROLE_USER"> Пользователь </option>
                <option value="ROLE_ADMIN"> Администратор </option>
            </select>
            
            <div className="popup-buttons">
                <div className="popup-buttons__item" onClick={() => setPopupActive(false)}>Закрыть</div>
                <input type="submit" className="popup-buttons__item" value="Сохранить" />
            </div>
        </form>
    </div>
    )
}

export default PopupCreate;