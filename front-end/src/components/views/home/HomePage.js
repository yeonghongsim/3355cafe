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
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const Header = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderLogoContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const HeaderEmpty = styled.div`
    width: 70vw;
    height: 100%;
`;
const HeaderToggleContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BarImageWrapper = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0 , 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const BarImage = styled.img`
    width: 50%;
    height: 50%;
`;

export default function HomePage() {
    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <Header>
                        <HeaderLogoContainer>
                            <Logo></Logo>
                        </HeaderLogoContainer>
                        <HeaderEmpty></HeaderEmpty>
                        <HeaderToggleContainer>
                            <BarImageWrapper>
                                <BarImage src="/image/bars.svg"></BarImage>
                            </BarImageWrapper>
                        </HeaderToggleContainer>
                    </Header>
                </SmallWrapper>
            </HeaderSection>
        </Wrapper>
    )
}