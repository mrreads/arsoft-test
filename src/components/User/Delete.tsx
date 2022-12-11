import { useState } from 'react';
import { host, port, request } from "@/hooks/useToken";

import PopupDelete from '@/components/Popup/PopupDelete';

import icon from '@/assets/images/icons/remove.png';

interface IProps {
    "email": string,
    "rerender": () => void,
    "edit": (id: null) => void
}

function Delete({ email, rerender, edit }: IProps) {
    const [popupActive, setPopupActive] = useState(false);

    const showPopup =() => {
        edit(null);
        setPopupActive(true)
    }

    const deleteUser = async () => {
        await fetch(`${host}:${port}/account/${email}`, { ...request, method: "DELETE" });
        await setPopupActive(false);
        await rerender();
    }

    return (
        <>
            { (popupActive) ? <PopupDelete deleteUser={deleteUser} setPopupActive={setPopupActive} /> : null }
            <div className="table-user__item icon" onClick={showPopup}> <img src={icon} /> </div>
        </>
    );
}

export default Delete;