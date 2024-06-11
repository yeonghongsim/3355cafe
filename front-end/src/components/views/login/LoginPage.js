import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import { COLORS } from "../../../commons/styles/COLORS";
import LoginInputWithLabel01 from "../../commons/input/LoginInputWithLabel01";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import store from "../../../commons/store/store";
import { setUser } from "../../../commons/store/userSlice";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    // padding: 0 1rem 0 1rem;
`;
const Text = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    margin-top: 1rem;
    padding-left: 0.5rem;
    &:hover {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;
const Btn = styled.div`
    width: 15rem;
    height: 4.5rem;
    background-color: ${COLORS.blueColor};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
    transition : all .8s ease-in-out;
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
`;
// 오류 발생 시 코드 만들었을때 사용예정
const ErrorAnnounceText = styled.p`
    font-size: 1.4rem;
    font-weight: normal;
    color: red;
    padding-left: 0.5rem;
    margin: 0;
`;

export default function LoginPage() {
    const navigate = useNavigate();
    const userIdRef = useRef(null);
    const userPwRef = useRef(null);
    let [errorLogin, setErrorLogin] = useState();

    const handleFindInfo = () => {
        console.log('try to find id/pw');
    };
    const moveToRegisterUserPage = () => {
        navigate('/signUp');
    };
    const handleLoginBtnClick = async () => {
        const data = {
            userId: userIdRef.current.value,
            userPassword: userPwRef.current.value
        }
        // get Url
        const url = 'http://localhost:8080/login';
        // 객체를 쿼리 문자열로 변환
        const queryString = new URLSearchParams(data).toString();
        // url에 쿼리 문자열 추가
        const fullUrl = `${url}?${queryString}`;
        fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // 요청 헤더 설정 (JSON을 사용하는 경우)
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.result == null) {
                    // console.log('회원정보 불일치');
                    setErrorLogin(true);
                } else {
                    // console.log('회원정보 일치');
                    // console.log(data.result);
                    setErrorLogin(false);
                    const userInfo = {
                        _id: data.result._id,
                        userId: data.result.userId,
                        userName: data.result.userName,
                        birth: data.result.birth,
                        phoneNumber: data.result.phoneNumber,
                        profileImgURL: data.result.profileImgURL,
                        profileImgName: data.result.profileImgName,
                        gender: data.result.gender,
                        role: data.result.role,
                        isVanned: data.result.isVanned,
                        boardLikeList: data.result.boardLikeList,
                        replyLikeList: data.result.replyLikeList,
                    }
                    // console.log(userInfo);
                    // store에 저장
                    store.dispatch(setUser(userInfo));
                    // 페이지 이동
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('error : ' + error);
            })
    };

    return (
        <Wrapper>
            <Container>
                <LogoContainer>
                    <LOGO></LOGO>
                </LogoContainer>
                <Form>
                    <Layer>
                        <LoginInputWithLabel01
                            id="userId"
                            name="userId"
                            type="text"
                            label="아이디"
                            placeholder="아이디 입력란"
                            forwardRef={userIdRef}
                        ></LoginInputWithLabel01>
                    </Layer>
                    <Layer>
                        <LoginInputWithLabel01
                            id="userPw"
                            name="userPw"
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호 입력란"
                            forwardRef={userPwRef}
                        ></LoginInputWithLabel01>
                    </Layer>
                    {
                        errorLogin && <Layer>
                            <ErrorAnnounceText>*아이디 또는 비밀번호를 확인해 주세요.</ErrorAnnounceText>
                        </Layer>
                    }
                    <Layer>
                        <Text onClick={handleFindInfo}>아이디 / 비밀번호 찾기</Text>
                    </Layer>
                    <Layer>
                        <Text onClick={moveToRegisterUserPage}>회원 가입 하러가기</Text>
                    </Layer>
                    <Layer>
                        <BtnContainer onClick={handleLoginBtnClick}>
                            <Btn>로그인</Btn>
                        </BtnContainer>
                    </Layer>
                </Form>
            </Container>
        </Wrapper>
    )
}