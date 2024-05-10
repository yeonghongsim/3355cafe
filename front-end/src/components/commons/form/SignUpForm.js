import styled from "styled-components";
import FormInputWithLabel01 from "../../commons/input/FormInputWithLabel01";

const Wrapper = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.12);
    border-radius: 1rem;
    padding: 1rem;
    gap: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    height: 5.9rem;
    background-color: #eee;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Inputs = styled.div`
    width: ${(props) => (`${props.width}%`)};
    height: 100%;
    background-color: #d9d9d9;
    position: relative;
`;
const IdCheckBtn = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: black;
    bottom: 0;
    position: absolute;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const IdCheckText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
`;
const Text = styled.span`
    font-size: 1.4rem;
    font-weight: normal
    color: black;
`;

export default function SignUpForm(props) {
    return (
        <Wrapper>
            <Text>* 필수</Text>
            <Layer>
                <Inputs width="75">
                    <FormInputWithLabel01
                        label="아이디"
                        type="text"
                        id="userId"
                        name="userId"
                    ></FormInputWithLabel01>
                </Inputs>
                <Inputs width="5"></Inputs>
                <Inputs width="20">
                    <IdCheckBtn>
                        <IdCheckText>확 인</IdCheckText>
                    </IdCheckBtn>
                </Inputs>
            </Layer>
            <Layer>
                <Inputs width="100">
                    <FormInputWithLabel01
                        label="비밀번호"
                        type="password"
                        id="userPw"
                        name="userPw"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
            <Layer>
                <Inputs width="100">
                    <FormInputWithLabel01
                        label="비밀번호확인"
                        type="password"
                        id="userPwCheck"
                        name="userPwCheck"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
            <Layer>
                <Inputs width="50">
                    <FormInputWithLabel01
                        label="이름"
                        type="text"
                        id="userName"
                        name="userName"
                    ></FormInputWithLabel01>
                </Inputs>
                <Inputs width="15"></Inputs>
                <Inputs width="35">
                    <FormInputWithLabel01
                        label="성별"
                        type="text"
                        id="gender"
                        name="gender"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
            <Layer>
                <Inputs width="30">
                    <FormInputWithLabel01
                        label="생년월일"
                        type="text"
                        id="birth"
                        name="birth"
                    ></FormInputWithLabel01>
                </Inputs>
                <Inputs width="1"></Inputs>
                <Inputs width="15">
                    <FormInputWithLabel01
                        label="선택아이콘"
                        type="text"
                        id="test"
                        name="test"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
            <Text>* 한가지 이상 필수</Text>
            <Layer>
                <Inputs width="100">
                    <FormInputWithLabel01
                        label="휴대전화"
                        type="text"
                        id="cellphone"
                        name="cellphone"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
            <Layer>
                <Inputs width="65">
                    <FormInputWithLabel01
                        label="이메일 주소"
                        type="text"
                        id="emailAddress"
                        name="emailAddress"
                    ></FormInputWithLabel01>
                </Inputs>
                <Inputs width="2"></Inputs>
                <Inputs width="33">
                    <FormInputWithLabel01
                        label="사이트"
                        type="text"
                        id="emailSite"
                        name="emailSite"
                    ></FormInputWithLabel01>
                </Inputs>
            </Layer>
        </Wrapper>
    )
}