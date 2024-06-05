import { useSelector } from "react-redux";
import styled from "styled-components"
import FormInputWithLabel02 from "../../../commons/input/FormInputWithLabel02";
import { useRef, useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BodySection = styled.section`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    @media screen and (max-width: 1024px){
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`;
const FormContainer = styled.div`
    width: 50rem;
    height: 25rem;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Form = styled.div`
    width: 100%;
    height: 75%;
`;
const IdPwContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
`;
const InfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ImgContainer = styled.div`
    width: 15rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ImgWrapper = styled.div`
    width: 12rem;
    height: 12rem;
    background-color: #d9d9d9;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
`;
const Img = styled.img`
    width: 55%;
    height: 55%
    flex-shrink: 0;
`;
const NameNumberContainer = styled.div`
    width: calc(100% - 15rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: center;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 8rem;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Btn = styled.div`
    width: 15rem;
    height: 5rem;
    background-color: #3572EF;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    transition: all 0.8s;
    &:hover {
        cursor: pointer;
        background-color: blue;
        scale: 1.05;
    }
`;
const HideInput = styled.input`
    display: none;
`;

export default function UpdateUserInfoPage() {
    // get userInfo from store
    const userInfo = useSelector((state) => state.user.user);
    // refs
    const userIdRef = useRef(null);
    const userPwRef = useRef(null);
    const userNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const imgRef = useRef(null);
    // error states
    let [isOnErrUserId, setIsOnErrUserId] = useState(false);
    let [isOnErrUserPw, setIsOnErrUserPw] = useState(false);
    let [isOnErrUserName, setIsOnErrUserName] = useState(false);
    let [isOnErrPhoneNumber, setIsOnErrPhoneNumber] = useState(false);
    const handleUpdateUserLog = () => {
        const userId = userIdRef.current.value;
        const userPassword = userPwRef.current.value;
        const data = {
            userId: userId,
            userPassword: userPassword,
        }
        console.log(data);
        // 데이터 유효성 검사하기
        // 아이디
        // 숫자,영문 각 최소 하나 이상 포함한 6-15자리
        const idValid = /^(?!.*[!@#$%^&*(),.?":{}|<>])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])(?=.*[a-zA-Z])(?=.*\d).{6,15}$/.test(userId);
        if (!idValid) {
            console.log('부적합');
            setIsOnErrUserId(true);
        } else {
            console.log('적합');
            setIsOnErrUserId(false);
        }
        // 비밀번호
        // 조건 : 숫자,영문,특수기호 각 최소 하나이상 포함 10-20자리
        const pwValid = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*\d)(?=\S+$).{10,20}$/.test(userPassword);
        if (!pwValid) {
            console.log('부적합');
            setIsOnErrUserPw(true);
        } else {
            console.log('적합');
            setIsOnErrUserPw(false);
        }
    };
    const handleUpdateUserInfo = () => {
        const data = {
            profileImgURL: null,
            profileImgName: null,
            userName: userNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
        }
        console.log(data)
        // 데이터 유효성 검사하기
        // 프로필이름
        // 프로필경로
        // 유저 이름
        // 조건 : 한글만 입력되어 있는지
        const nameValid = /^[가-힣]+$/u.test(data.userName);
        if (!nameValid) {
            console.log('부적합');
            setIsOnErrUserName(true);
        } else {
            console.log('적합');
            setIsOnErrUserName(false);
        }
        // 연락처
        const phoneNumberValidBefore = /^[0-9]*$/.test(data.phoneNumber);
        const phoneNumberValid = !phoneNumberValidBefore || data.phoneNumber.length !== 8;
        if (phoneNumberValid) {
            console.log('부적합');
            setIsOnErrPhoneNumber(true);
        } else {
            console.log('적합');
            setIsOnErrPhoneNumber(false);
        }
    };
    const handleImgClick = () => {
        imgRef.current.click();
    };
    const handleInputFireSpace = (e) => {
        const newValue = e.target.value.replace(/\s+/g, '');
        if (newValue !== e.target.value) {
            // 공백이 제거된 경우, input 필드의 값을 업데이트합니다.
            e.target.value = newValue;
        }
    };
    return (
        <Wrapper>
            <BodySection>
                <FormContainer>
                    <Form>
                        <IdPwContainer>
                            <InputWrapper>
                                <FormInputWithLabel02
                                    label="아이디"
                                    id="userId"
                                    name="userId"
                                    forwardRef={userIdRef}
                                    defaultValue={userInfo.userId}
                                    onInput={handleInputFireSpace}
                                    placeholder="숫자,영문 혼합 6-15자리"
                                    isOnErr={isOnErrUserId}
                                    type="text"
                                    readOnly={true}
                                ></FormInputWithLabel02>
                            </InputWrapper>
                            <InputWrapper>
                                <FormInputWithLabel02
                                    label="비밀번호"
                                    id="userPassword"
                                    name="userPassword"
                                    forwardRef={userPwRef}
                                    placeholder="숫자,영문,특수기호 혼합 10-20자리"
                                    onInput={handleInputFireSpace}
                                    isOnErr={isOnErrUserPw}
                                    type="password"
                                    readOnly={false}
                                ></FormInputWithLabel02>
                            </InputWrapper>
                        </IdPwContainer>
                    </Form>
                    <BtnContainer>
                        <Btn
                            onClick={handleUpdateUserLog}
                        >변경하기</Btn>
                    </BtnContainer>
                </FormContainer>
                <FormContainer>
                    <Form>
                        <InfoContainer>
                            <ImgContainer>
                                <ImgWrapper
                                    onClick={handleImgClick}
                                >
                                    <Img src="/image/profile.svg"></Img>
                                </ImgWrapper>
                            </ImgContainer>
                            <HideInput
                                ref={imgRef}
                                type="file"
                            ></HideInput>
                            <NameNumberContainer>
                                <InputWrapper>
                                    <FormInputWithLabel02
                                        label="이름"
                                        id="userName"
                                        name="userName"
                                        forwardRef={userNameRef}
                                        defaultValue={userInfo.userName}
                                        placeholder="한글명"
                                        onInput={handleInputFireSpace}
                                        isOnErr={isOnErrUserName}
                                        type="text"
                                        readOnly={false}
                                    ></FormInputWithLabel02>
                                </InputWrapper>
                                <InputWrapper>
                                    <FormInputWithLabel02
                                        label="연락처"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        forwardRef={phoneNumberRef}
                                        placeholder="'010' 제외 숫자 8자리"
                                        onInput={handleInputFireSpace}
                                        isOnErr={isOnErrPhoneNumber}
                                        type="text"
                                        readOnly={false}
                                    ></FormInputWithLabel02>
                                </InputWrapper>
                            </NameNumberContainer>
                        </InfoContainer>
                    </Form>
                    <BtnContainer>
                        <BtnContainer>
                            <Btn
                                onClick={handleUpdateUserInfo}
                            >변경하기</Btn>
                        </BtnContainer>
                    </BtnContainer>
                </FormContainer>
            </BodySection>
        </Wrapper>
    )
}