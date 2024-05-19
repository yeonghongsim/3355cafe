import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import store from "../../../commons/store/store";
import { setUser } from "../../../commons/store/userSlice";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.blueColor};
    border-radius: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;
const Text = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
`;

export default function LogoutBtn({
    handleModalClose
}) {
    const moveToPage = () => {
        handleModalClose();
        setTimeout(() => {
            store.dispatch(setUser(null));
            window.location.href = '/';
        }, 1000);
    };

    return (
        <Wrapper onClick={moveToPage}>
            <Text>로그아웃</Text>
        </Wrapper>
    )
}