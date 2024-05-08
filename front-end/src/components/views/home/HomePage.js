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
    width: 5.5rem;
    height: 5.5rem;
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
const BodySection = styled.section`
    width: 100%;
    height: 60vh;
    background-color: #eee;
`;
const ADSection = styled.section`
    width: 100%;
    height: 20vh;
    background-color: #d9d9d9;
`;
const FooterSection = styled.section`
    width: 100%;
    height: 8vh;
    background-color: darkgray;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const FooterCopyrightContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem 0 1rem;
`;
const CopyrightImg = styled.img`
    width: 2.4rem;
    height: 2.4rem;
`;
const CopyrightText = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: black;
`;
const FooterTextContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    gap: 1rem;
`;
const FooterText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    &:hover {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
    }
    ${props => props.afterText && `
    &::after {
        padding-left: 1rem;
        content: "|";
        font-size: 1.6rem;
    }
    `}
`;

export default function HomePage(props) {
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
            <BodySection>
                <SmallWrapper>1</SmallWrapper>
            </BodySection>
            <ADSection>
                <SmallWrapper>1</SmallWrapper>
            </ADSection>
            <FooterSection>
                <SmallWrapper>
                    <FooterContainer>
                        <FooterCopyrightContainer>
                            <CopyrightImg src="/image/copyright.svg"></CopyrightImg>
                            <CopyrightText>Copyright</CopyrightText>
                        </FooterCopyrightContainer>
                        <FooterTextContainer>
                            <FooterText afterText={true}>ppt</FooterText>
                            <FooterText afterText={false}>video</FooterText>
                        </FooterTextContainer>
                    </FooterContainer>
                </SmallWrapper>
            </FooterSection>
        </Wrapper>
    )
}