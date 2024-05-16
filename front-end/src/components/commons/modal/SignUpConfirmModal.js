import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
`;
const Container = styled.div`
    width : 40rem;
    height: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Head = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
`;
const HeadText = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: black;
`;
const Content = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    border-top: 0.1rem solid #d9d9d9;
    border-bottom: 0.1rem solid #d9d9d9;
    padding: 1rem;
    box-sizing: border-box;
`;
const ContentText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    margin: 0;
`;
const Footer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding : 0.5rem 1rem 0.5rem 0;
    box-sizing: border-box;
    gap: 1rem;
    &:hover {
        cursor: pointer;
    }
`;
const Button = styled.div`
    width: 10rem;
    height: 100%;
    padding : 0.5rem;
    background-color: ${(props) => (props.$bgColor)};
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BtnText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
`;

export default function SignUpConfirmModal({
    isOn
    , handleModalClose
    , prepareData
}) {
    const modalRef = useRef(null);

    // 모달 외각 클릭 조작 코드
    useEffect(() => {
        let handleClickOutside;
        if (isOn) {
            handleClickOutside = (e) => {
                if (modalRef.current && !modalRef.current.contains(e.target)) {
                    handleModalClose();
                }
            };
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        }
    }, [
        isOn
        , handleModalClose
        , modalRef
    ]);
    // 등록 후 로그인 페이지로 이동.
    const handleSignUp = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/signUp', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepareData)
            })

            // 서버 응답 후 필요한 로직
            if (response.ok) {
                // console.log('success');
                // 등록 후 화면 이동
                window.location.href = '/login';
            }
            else { console.log('fail') }
        } catch (error) { console.log('통신 오류: ', error) }
    };

    return (
        <Wrapper $isOn={isOn}>
            <Container ref={modalRef}>
                <Head>
                    <HeadText>입력하신 정보는 </HeadText>
                </Head>
                <Content>
                    <ContentText>아이디 : {prepareData.userId}</ContentText>
                    <ContentText>이름 : {prepareData.userName}</ContentText>
                    <ContentText>성별 : {prepareData.gender}</ContentText>
                    <ContentText>생일 : {prepareData.birth}</ContentText>
                    <ContentText>연락처 : {prepareData.phoneNumber}</ContentText>
                </Content>
                <Footer>
                    <Button
                        $bgColor="darkgray"
                        onClick={handleModalClose}
                    >
                        <BtnText>취소</BtnText>
                    </Button>
                    <Button
                        $bgColor={COLORS.blueColor}
                        onClick={handleSignUp}
                    >
                        <BtnText>등록</BtnText>
                    </Button>
                </Footer>
            </Container>
        </Wrapper>
    )
}