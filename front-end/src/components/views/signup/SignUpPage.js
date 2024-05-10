import styled from "styled-components";
import Logo from "../../commons/logo/Logo";
import { COLORS } from "../../../commons/styles/COLORS";
import SignUpForm from "../../commons/form/SignUpForm";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
`;
const MainContainer = styled.div`
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SubmitBtn = styled.div`
    width: 16rem;
    height: 4rem;
    margin: 0 auto;
    margin-top: 1.5rem;
    background-color: ${COLORS.blueColor};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    &:hover {
        cursor: pointer;
    }
`;
const SubmitText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
`;

export default function SignUpPage() {
    return (
        <Wrapper>
            <MainContainer>
                <Logo></Logo>
                <SignUpForm></SignUpForm>
                <SubmitBtn>
                    <SubmitText>가입하기</SubmitText>
                </SubmitBtn>
            </MainContainer>
        </Wrapper>
    )
}