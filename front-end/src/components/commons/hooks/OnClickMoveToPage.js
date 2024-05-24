import { useNavigate } from 'react-router-dom';

export default function OnClickMoveToPage(path) {
    const navigate = useNavigate();

    function handlePageMove() {
        navigate(path)
    }

    return handlePageMove;
}