import { useState } from 'react';
import { host, request } from "@/hooks/useToken";
import icon from '@/assets/images/icons/remove.png';

import PopupDelete from '@/components/Popup/PopupDelete';


interface IProps {
    "email": string,
    "rerender": () => void
}

function Delete({ email, rerender }: IProps) {
    const [popupActive, setPopupActive] = useState(false);

    const deleteUser = async () => {
        await fetch(`${host}account/${email}`, { ...request, method: "DELETE" });
        await setPopupActive(false);
        await rerender();
    }

    return (
        <>
            { (popupActive) ? <PopupDelete deleteUser={deleteUser} setPopupActive={setPopupActive} /> : null }
            <div className="table-user__item icon" onClick={() => setPopupActive(true)}> <img src={icon} /> </div>
        </>
    );
}

export default Delete;