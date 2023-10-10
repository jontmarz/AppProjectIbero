import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Dashboard() {
    const { user } = useUserContext();

    return (
        <>
            <div>Usuario: {user.fullName}</div>
        </>
    )
}
