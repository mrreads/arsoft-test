import { useRef } from 'react';

interface IProps {
    "deleteUser": () => void
    "setPopupActive": (bool: boolean) => void
}

function PopupDelete({ deleteUser, setPopupActive }: IProps) {
    return (
    <div className="popup-wrapper">
        <div className="popup">
            <h2> Вы действительно хотите удалить пользователя? </h2>
            <div className="popup-buttons">
                <div className="popup-buttons__item" onClick={() => setPopupActive(false)}>Нет</div>
                <div className="popup-buttons__item" onClick={deleteUser}>Да</div>
            </div>
        </div>
    </div>
    )
}

export default PopupDelete;