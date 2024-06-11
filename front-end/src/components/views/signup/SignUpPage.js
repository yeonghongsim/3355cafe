import styled from "styled-components";
import LOGO from "../../commons/logo/LOGO";
import { COLORS } from "../../../commons/styles/COLORS";
import FormInputWithLabel01 from "../../commons/input/FormInputWithLabel01";
import FormRadioWithLabel01 from "../../commons/input/FormRadioWithLabel01";
import FormSelectWrapper01 from "../../commons/select/FormSelectWrapper01";
import { useRef, useState } from "react";
import SignUpConfirmModal from "../../commons/modal/SignUpConfirmModal";

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
    padding: 3rem 1.5rem 3rem 1.5rem;
    gap: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    height: 5.9rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Inputs = styled.div`
    width: ${(props) => (`${props.width}%`)};
    height: 100%;
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
    opacity: ${(props) => (props.$confirmedUserId ? 0.65 : 1)};
    transition: all .8s ease-in-out;
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
`;
const IdCheckText = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    margin: 0;
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
    opacity: ${(props) => (props.$confirmedUserId ? 1 : 0.5)};
    transition: all 1.2s ease-in-out;
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
    ${props => !props.$confirmedUserId && `
        pointer-events : none;
    `}
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
    const birthYearRef = useRef(null);
    const birthMonthRef = useRef(null);;
    const birthDayRef = useRef(null);
    const phoneNumberRef = useRef(null);
    // 모든 인풋에 대한 err state
    let [isOnErrUserId, setIsOnErrUserId] = useState(false);
    let [isOnErrUserPw, setIsOnErrUserPw] = useState(false);
    let [isOnErrPwCheck, setIsOnErrPwCheck] = useState(false);
    let [isOnErrUserName, setIsOnErrUserName] = useState(false);
    let [isOnErrBirthYear, setIsOnErrBirthYear] = useState(false);
    let [isOnErrBirthMonth, setIsOnErrBirthMonth] = useState(false);
    let [isOnErrBirthDay, setIsOnErrBirthDay] = useState(false);
    let [isOnErrPhoneNumber, setIsOnErrPhoneNumber] = useState(false);
    // 아이디 중복확인 여부
    let [confirmedUserId, setConfirmedUserId] = useState(false);
    // 유효성 검사 후 오류 발생 여부
    // let [isOnErrDataValidation, setIsOnErrDataValidation] = useState(false);
    // 등록 창 모달
    let [isOnConfirmModal, setIsOnConfirmModal] = useState(false);
    // 최종 데이터 세팅
    let [prepareData, setPrepareData] = useState({});
    // 1-(1~2) 아이디 유효성 검사 및 중복 확인
    // 1-1
    const userIdValnMul = () => {
        const userId = userIdRef.current.value;
        // 간이 유효성 검사
        // 숫자,영문 각 최소 하나 이상 포함한 6-15자리
        const isValid = /^(?!.*[!@#$%^&*(),.?":{}|<>])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])(?=.*[a-zA-Z])(?=.*\d).{6,15}$/.test(userId);
        // 오류 발생시 코드 종료
        if (!isValid) {
            // console.log('검사 부적합');
            setIsOnErrUserId(true);
            return;
        } else {
            setIsOnErrUserId(false);
        }
        // 1-2 오류 미발생 후 중복 확인 패칭
        fetchUserIdMultiple(userId);
    };
    // 1-2 오류 미발생 후 중복 확인 패칭
    const fetchUserIdMultiple = async (userId) => {
        // 중복 검사
        const imsiId = userId;
        fetch('http://localhost:8080/checkId/' + imsiId)
            .then(res => res.json())
            .then((data) => {
                let result = data.result;
                // 중복 없음
                if (result == null) {
                    const confirmMsg = window.confirm('사용가능한 아이디 입니다.');
                    if (confirmMsg) {
                        // console.log('사용 클릭');
                        setConfirmedUserId(true);
                    } else {
                        setConfirmedUserId(false);
                    }
                }
                // 중복 있음
                else {
                    setIsOnErrUserId(true);
                    alert('이미 사용중인 아이디 입니다.');
                }
            })
    };
    // user data validation error 여부 : 사용처 273줄
    let dataValidationError;
    // 사용자 등록 2-(1~2)
    // 2-1
    const registerBtnClick = (e) => {
        // console.log('register btn click');
        // 모든 인풋의 value
        const userId = userIdRef.current.value;
        const userPassword = userPwRef.current.value;
        const pwCheck = pwCheckRef.current.value;
        const userName = userNameRef.current.value;
        const gender = genderRef.current.value;
        const birth = birthMonthRef.current.value + '/' +
            birthDayRef.current.value + '/' +
            birthYearRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        // 데이터 취합
        const data = {
            userId: userId,
            userPassword: userPassword,
            pwCheck: pwCheck,
            userName: userName,
            gender: gender,
            birth: birth,
            phoneNumber: phoneNumber,
            role: 'USER',
            profileImgURL: null,
            profileImgName: null,
            isVanned: false,
            boardLikeList: [],
            replyLikeList: [],
        }
        // console.log(data);
        // 2-2 사용자 등록 전 유효성 검사
        userDataValidation(data);
        // 오류 발생 확인 후 처리
        if (!dataValidationError) {
            // 오류 미발생 : confirm modal open
            console.log('no error');
            setIsOnConfirmModal(true);
            e.stopPropagation();
        }
    };
    // 2-2 사용자 등록 전 유효성 검사
    const userDataValidation = (data) => {
        // 데이터 유효성 검사 시작
        // console.log('validation start');
        // 비밀번호 인풋
        // 조건 : 숫자,영문,특수기호 각 최소 하나이상 포함 10-20자리
        const pwValid = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*\d)(?=\S+$).{10,20}$/.test(data.userPassword);
        if (!pwValid) {
            // console.log('검사 부적합');
            setIsOnErrUserPw(true);
        } else {
            setIsOnErrUserPw(false);
        }
        // 비밀번호 확인 인풋
        // 조건 : 비밀번호와 동일한지
        const pwCheckValid = (data.userPassword !== data.pwCheck) || data.pwCheck.length === 0;
        if (pwCheckValid) {
            setIsOnErrPwCheck(true);
        } else {
            setIsOnErrPwCheck(false);
        }
        // 이름 인풋
        // 조건 : 한글만 입력되어 있는지
        const nameValid = /^[가-힣]+$/u.test(data.userName);
        if (!nameValid) {
            setIsOnErrUserName(true);
        } else {
            setIsOnErrUserName(false);
        }
        // 생년월일 인풋
        // 조건 : 각 인풋 null값 인 경우 오류
        // 년
        const yearValid = data.birth.split('/')[2] === '' ? true : false;
        if (yearValid) {
            setIsOnErrBirthYear(true)
        } else {
            setIsOnErrBirthYear(false)
        }
        // 월
        const monthValid = data.birth.split('/')[0] === '' ? true : false;
        if (monthValid) {
            setIsOnErrBirthMonth(true)
        } else {
            setIsOnErrBirthMonth(false)
        }
        // 일
        const dayValid = data.birth.split('/')[1] === '' ? true : false;
        if (dayValid) {
            setIsOnErrBirthDay(true)
        } else {
            setIsOnErrBirthDay(false)
        }
        // 핸드폰 번호 인풋
        // 조건 : 숫자 8자리인지
        const phoneNumberValidBefore = /^[0-9]*$/.test(data.phoneNumber);
        const phoneNumberValid = !phoneNumberValidBefore || data.phoneNumber.length !== 8;
        if (phoneNumberValid) {
            setIsOnErrPhoneNumber(true);
        } else {
            setIsOnErrPhoneNumber(false);
        }
        // 오류 발생 여부 확인
        // true === error, false === no error
        dataValidationError = !pwValid || pwCheckValid || !nameValid || yearValid || monthValid || dayValid || phoneNumberValid;
        if (dataValidationError) {
            // 하나라도 true 라면 console : error
            console.log('error');
            // setIsOnErrDataValidation(true);
            return;
        } else {
            // 전부다 false 라면 console: no err
            // 검사 통과
            console.log('no error');
            const prepareData = { ...data };
            // 연락처 010 추가
            prepareData.phoneNumber = '010-' + prepareData.phoneNumber.slice(0, 4)
                + '-' + prepareData.phoneNumber.slice(4, 8);
            // 생년월일 중 월과 일의 자릿수 체크
            // 한자리 일 경우 앞에 '0' 추가
            let month = prepareData.birth.split('/')[0];
            let day = prepareData.birth.split('/')[1];
            if (month.length === 1) {
                month = '0' + month
            }
            if (day.length === 1) {
                day = '0' + day
            }
            prepareData.birth = month + '/' + day + '/' + prepareData.birth.split('/')[2];
            // ConfirmModal on, set data
            setPrepareData(prepareData);
            console.log(prepareData);
        }
    };
    // confirm modal close
    const handleModalClose = () => {
        setIsOnConfirmModal(false);
    };

    return (
        <Wrapper>
            <MainContainer>
                <LOGO></LOGO>
                <Form>
                    <Layer>
                        <Inputs width="78">
                            <FormInputWithLabel01
                                label="아이디"
                                type="text"
                                id="userId"
                                name="userId"
                                forwardRef={userIdRef}
                                placeholder="숫자,영문 혼합 6-15자리"
                                isOnErr={isOnErrUserId}
                                readOnly={confirmedUserId}
                            ></FormInputWithLabel01>
                        </Inputs>
                        <Inputs width="2"></Inputs>
                        <Inputs width="20">
                            <IdCheckBtn
                                onClick={userIdValnMul}
                                $confirmedUserId={confirmedUserId}>
                                <IdCheckText>
                                    {confirmedUserId ? "재 확 인" : "확 인"}
                                </IdCheckText>
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
                                isOnErr={isOnErrUserPw}
                                readOnly={false}
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
                                isOnErr={isOnErrPwCheck}
                                readOnly={false}
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
                                isOnErr={isOnErrUserName}
                                readOnly={false}
                            ></FormInputWithLabel01>
                        </Inputs>
                        <Inputs width="20"></Inputs>
                        <Inputs width="30">
                            <FormRadioWithLabel01
                                label="성별"
                                type="radio"
                                id="gender"
                                name="gender"
                                forwardRef={genderRef}
                                options={[
                                    { index: 1, value: "남자", label: "남자" },
                                    { index: 2, value: "여자", label: "여자" },
                                ]}
                            ></FormRadioWithLabel01>
                        </Inputs>
                    </Layer>
                    <Layer>
                        <Inputs width="20">
                            <FormSelectWrapper01
                                label="생일) 년도"
                                type="text"
                                id="year"
                                name="year"
                                forwardRef={birthYearRef}
                                isOnErr={isOnErrBirthYear}
                            ></FormSelectWrapper01>
                        </Inputs>
                        <Inputs width="1.5"></Inputs>
                        <Inputs width="15">
                            <FormSelectWrapper01
                                label="월"
                                type="text"
                                id="month"
                                name="month"
                                forwardRef={birthMonthRef}
                                isOnErr={isOnErrBirthMonth}
                            ></FormSelectWrapper01>
                        </Inputs>
                        <Inputs width="1.5"></Inputs>
                        <Inputs width="15">
                            <FormSelectWrapper01
                                label="일"
                                type="text"
                                id="day"
                                name="day"
                                forwardRef={birthDayRef}
                                isOnErr={isOnErrBirthDay}
                            ></FormSelectWrapper01>
                        </Inputs>
                    </Layer>
                    <Layer>
                        <Inputs width="100">
                            <FormInputWithLabel01
                                label="휴대전화"
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                forwardRef={phoneNumberRef}
                                placeholder="010 및 '-' 제외 숫자 8자리"
                                isOnErr={isOnErrPhoneNumber}
                                readOnly={false}
                            ></FormInputWithLabel01>
                        </Inputs>
                    </Layer>
                </Form>
                <SubmitBtn
                    onClick={registerBtnClick}
                    $confirmedUserId={confirmedUserId}
                >
                    <SubmitText>가입하기</SubmitText>
                </SubmitBtn>
            </MainContainer>
            <SignUpConfirmModal
                isOn={isOnConfirmModal}
                handleModalClose={handleModalClose}
                prepareData={prepareData}
            ></SignUpConfirmModal>
        </Wrapper>
    )
}