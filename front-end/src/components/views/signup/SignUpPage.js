import styled from "styled-components";
import Logo from "../../commons/logo/Logo";
import { COLORS } from "../../../commons/styles/COLORS";
import FormInputWithLabel01 from "../../commons/input/FormInputWithLabel01";
import { useRef } from "react";

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
const Form = styled.form`
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
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    margin: 0;
`;
const Text = styled.span`
    font-size: 1.4rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding-top: 1rem;
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
    // 모든 인풋의 ref
    const userIdRef = useRef(null);
    const userPwRef = useRef(null);
    const pwCheckRef = useRef(null);
    const userNameRef = useRef(null);
    const genderRef = useRef(null);
    const birthRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const emailAddressRef = useRef(null);
    const emailSiteRef = useRef(null);
    // 모든 인풋에 대한 err state

    // 1-(1~2) 아이디 유효성 검사 및 중복 확인
    const userIdValnMul = async () => {
        console.log('validation n mutiple test start');
        const userId = userIdRef.current.value;
        console.log(`userId : ` + userId);
        // 간이 유효성 검사
        // 숫자,영문 각 최소 하나 이상 포함한 6-15자리
        // 오류 발생시 바로 리턴
        // 1-2
        await fetchUserIdMultiple(userId);
        console.log('validation n mutiple test finish');
    };
    // 1-2 오류 미발생 후 중복 확인 패칭
    const fetchUserIdMultiple = async (userId) => {
        console.log('multiple start');
        // 중복 검사
        // 있다면 오류 발생
        // 없다면 오류 제거 및 가입 버튼 활성화
        console.log('multiple finish');
    };
    // 사용자 등록 2-(1~4)
    const registerBtnClick = async () => {
        console.log('register btn click');
        // 모든 인풋의 value
        const userId = userIdRef.current.value;
        const userPw = userPwRef.current.value;
        const pwCheck = pwCheckRef.current.value;
        const userName = userNameRef.current.value;
        const gender = genderRef.current.value;
        const birth = birthRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const email = emailAddressRef.current.value + '@' +
            emailSiteRef.current.value;
        // 데이터 취합
        const data = {
            userId: userId,
            userPw: userPw,
            pwCheck: pwCheck,
            userName: userName,
            gender: gender,
            birth: birth,
            phoneNumber: phoneNumber,
            email: email,
            role: 'USER',
            profileImg: null,
        }
        // 2-2
        userDataValidation(data);
        // 2-3
        await fetchRegisterUserData(data);
        // 2-4 등록 후 로그인 페이지로 이동.
        console.log('page move');
    };
    // 2-2 사용자 등록 전 유효성 검사
    const userDataValidation = (data) => {
        // 데이터 유효성 검사 시작
        console.log('validation start');
        // 각 유효성 검사 진행
        // 비밀번호 인풋
        // 조건 : 숫자,영문,특수기호 각 최소 하나이상 포함 10-20자리
        // 비밀번호 확인 인풋
        // 조건 : 비밀번호와 동일한지
        // 이름 인풋
        // 조건 : 한글만 입력되어 있는지
        // 성별 인풋
        // 조건 : 라디오로 진행
        // 생년월일 인풋
        // 조건 : 리엑트 데이트 픽커 사용
        // 핸드폰 번호 인풋
        // 조건 : 숫자 8자리인지
        // 이메일 인풋
        // 조건 : 이메일주소에 영문,숫자만 있는지

        // 오류 발생 시
        if (data.userId === '') {
            console.log('error');
            return;
        }
        // 검사 통과
        console.log(data);
        console.log('validation end');
    };
    // 2-3 사용자 정보 db에 등록
    const fetchRegisterUserData = async (data) => {
        console.log('fetch register userData start');
        console.log(data);
        console.log('fetch register userData end');
    };

    return (
        <Wrapper>
            <MainContainer>
                <Logo></Logo>
                <Form>
                    <Text>* 필수</Text>
                    <Layer>
                        <Inputs width="75">
                            <FormInputWithLabel01
                                label="아이디"
                                type="text"
                                id="userId"
                                name="userId"
                                forwardRef={userIdRef}
                                placeholder="숫자,영문 혼합 6-15자리"
                            ></FormInputWithLabel01>
                        </Inputs>
                        <Inputs width="5"></Inputs>
                        <Inputs width="20">
                            <IdCheckBtn onClick={userIdValnMul}>
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
                                forwardRef={userPwRef}
                                placeholder="숫자,영문,특수기호 혼합 10-20자리"
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
                                forwardRef={pwCheckRef}
                                placeholder="입력한 비밀번호와 동일"
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
                                forwardRef={userNameRef}
                                placeholder="한글만"
                            ></FormInputWithLabel01>
                        </Inputs>
                        <Inputs width="15"></Inputs>
                        <Inputs width="35">
                            <FormInputWithLabel01
                                label="성별"
                                type="text"
                                id="gender"
                                name="gender"
                                forwardRef={genderRef}
                                placeholder="라디오 할거임"
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
                                forwardRef={birthRef}
                                placeholder="reactDatePicker 사용"
                            ></FormInputWithLabel01>
                        </Inputs>
                    </Layer>
                    <Text>* 한가지 이상 필수</Text>
                    <Layer>
                        <Inputs width="100">
                            <FormInputWithLabel01
                                label="휴대전화"
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                forwardRef={phoneNumberRef}
                                placeholder="010 및 '-' 제외 숫자 8자리"
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
                                forwardRef={emailAddressRef}
                                placeholder="수신 가능한 이메일 주소"
                            ></FormInputWithLabel01>
                        </Inputs>
                        <Inputs width="2"></Inputs>
                        <Inputs width="33">
                            <FormInputWithLabel01
                                label="사이트"
                                type="text"
                                id="emailSite"
                                name="emailSite"
                                forwardRef={emailSiteRef}
                                placeholder="셀렉트 할거임"
                            ></FormInputWithLabel01>
                        </Inputs>
                    </Layer>
                </Form>
                <SubmitBtn onClick={registerBtnClick}>
                    <SubmitText>가입하기</SubmitText>
                </SubmitBtn>
            </MainContainer>
        </Wrapper>
    )
}