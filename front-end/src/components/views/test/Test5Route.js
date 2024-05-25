import { useLocation, Outlet } from "react-router-dom";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const Header = styled.div`
    width: 100%;
    height: 10%;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    font-weight: bold;
`;
const Body = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 3rem;
    font-weight: bold;
`;

export default function Test5Route() {
    const location = useLocation();
    return (
        <Wrapper>
            <Header>
                공용 사용
            </Header>
            <Body>
                {location.pathname === '/test5' ?
                    <>
                        초기 화면
                    </> :
                    <Outlet />
                }
            </Body>
        </Wrapper>
    )
}