import styled from "styled-components"
import Logo from "../../commons/logo/Logo";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Header = styled.section`
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderLeft = styled.div`
    width: 20vw;
    height: 100%;
`;
const HeaderMiddle = styled.div`
    width: 60vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    gap: 1rem;
    background-color: #eee;
`;
const HeaderRight = styled.div`
    width: 20vw;
    height: 100%;
`;
const Body = styled.section`
    width: 100%;
    height: 80vh;
    background-color: #d9d9d9;
`;

export default function HomePage() {
    return (
        <Wrapper>
            <Header>
                <HeaderLeft></HeaderLeft>
                <HeaderMiddle>
                    <Logo></Logo>
                    1
                </HeaderMiddle>
                <HeaderRight></HeaderRight>
            </Header>
            <Body></Body>
        </Wrapper>
    )
}