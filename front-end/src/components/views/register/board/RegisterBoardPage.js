import styled from "styled-components"
import LOGO from "../../../commons/logo/LOGO";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
    border-bottom: 0.1rem solid black;
    box-sizing: border-box;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const BodySection = styled.section`
    width: 100%;
    margin-top: 1rem;
`;
const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
`;
const Layer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export default function RegisterBoardPage() {
    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <LOGO></LOGO>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <BodySection>
                <SmallWrapper>
                    <Form>
                        <Layer>제목 / 길이 30자리까지</Layer>
                        <Layer>내용 / 길이 1000자 이내</Layer>
                        <Layer>이미지 / 리스트 형식</Layer>
                        <Layer>글타입 / 셀렉트 할거임</Layer>
                    </Form>
                </SmallWrapper>
            </BodySection>
        </Wrapper>
    )
}