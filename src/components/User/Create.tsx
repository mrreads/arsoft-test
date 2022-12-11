import PopupCreate from '@/components/Popup/PopupCreate';
import { useState } from 'react';

interface IProps {
    "rerender": () => void,
    "edit": (id: null) => void
}

function Create({ rerender, edit}: IProps) {
    const [popupActive, setPopupActive] = useState(false);

    const showPopup =() => {
        edit(null);
        setPopupActive(true)
    }

    return (
    <>
        { (popupActive) ? <PopupCreate rerender={rerender} setPopupActive={setPopupActive} /> : null }
        <button className="bottom_panel_button" onClick={showPopup}> Создать пользователя </button>
    </>);
}

export default Create;