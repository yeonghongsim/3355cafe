import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";

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

export default function LoginBtn() {
    return (
        <Wrapper>
            <Text>로그인</Text>
        </Wrapper>
    )
}