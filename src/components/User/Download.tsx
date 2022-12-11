import { host, port, request } from "@/hooks/useToken";
import icon from '@/assets/images/icons/save.png';

interface IProps {
    "id": number,
    "edit": (value: null) => void
}

function Delete({ id, edit }: IProps) {
    const downloadArchive = async () => {
        open(`${host}:${port}/screenshot/arch/${id}`);
        edit(null);
        //await fetch(`${host}:${port}/screenshot/arch/${id}`, request).then(res => res.json()).then(data => console.log(data));
    }

    return(<div className="table-user__item icon" onClick={downloadArchive}> <img src={icon} /> </div>)
}

export default Delete;