import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../../../commons/store/store";
import { setUser } from "../../../commons/store/userSlice";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    // display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
`;
const ModalSection = styled.section`
    width: 50rem;
    height: 15rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ContentContainer = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    box-sizing: border-box;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    gap: 1rem;
    box-sizing: border-box;
`;
const Btn = styled.div`
    width: 12rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: ${(props) => (props.$bgColor)};
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
const Text = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;

export default function UpdateUserInfoModal({
    isOn,
    handleCloseModal,
    whatUpdate,
    prepareData
}) {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const userInfo = useSelector((state) => state.user.user);
    const fetchingUpdateDataRef = useRef(null);
    // 모달 외각 클릭 조작 코드
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                // 모달 외부를 클릭했을 때 모달을 닫습니다.
                handleCloseModal(false);
            }
        };
        // 컴포넌트가 마운트될 때 document에 이벤트 리스너를 등록합니다.
        document.addEventListener("mousedown", handleOutsideClick);
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [
        isOn,
        handleCloseModal
    ]);
    // let fetchingUpdateData;
    useEffect(() => {
        if (whatUpdate === 'logInfo') {
            fetchingUpdateDataRef.current = async () => {
                const userId = userInfo?._id;
                try {
                    const response = await fetch(`http://localhost:8080/update/user/${userId}/logInfo`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(prepareData),
                    });
                    if (response.ok) {
                        // const data = await response.json();
                        store.dispatch(setUser(null));
                        navigate(`/login`);
                    } else {
                        console.log('Failed to update data');
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            };
        }
        if (whatUpdate === 'userInfo') {
            fetchingUpdateDataRef.current = async () => {
                console.log('fetching update userInfo start');
                const userId = userInfo?._id;
                // try {
                //     const response = await fetch(`http://localhost:8080/update/user/${userId}/userInfo`, {
                //         method: "POST",
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json'
                //         },
                //         body: JSON.stringify(prepareData),
                //     });
                //     if (response.ok) {
                //         const data = await response.json();
                //         // console.log(data);
                //         store.dispatch(setUser(data));
                //         navigate(`/userInfo`);
                //     } else {
                //         console.log('Failed to update data');
                //     }
                // } catch (error) {
                //     console.log('Error:', error);
                // }
                fetch(`http://localhost:8080/update/user/${userId}/userInfo`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(prepareData),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update data');
                        }
                        return response.json();
                    })
                    .then(result => {
                        // console.log(result.userInfo);
                        store.dispatch(setUser(result.userInfo));
                    })
                    .then(() => {
                        // console.log('poge move')
                        navigate(`/userInfo`);
                    })
                    .catch(error => {
                        console.log('Error:', error);
                    });
            };
        }
    }, [
        whatUpdate,
        prepareData,
        navigate,
        userInfo
    ]);
    return (
        <Wrapper $isOn={isOn}>
            <ModalSection ref={modalRef}>
                <ContentContainer>
                    <Text>
                        {whatUpdate === 'logInfo' ? '비밀번호' : '회원정보'}를 변경하시겠습니까?
                    </Text>
                    <Text>
                        {
                            whatUpdate === 'logInfo' ?
                                '자동 로그아웃 후 로그인 페이지로 이동합니다.' :
                                '변경 후 회원 정보 페이지로 이동합니다.'
                        }
                    </Text>
                </ContentContainer>
                <BtnContainer>
                    <Btn
                        $bgColor="darkgray"
                        onClick={handleCloseModal}
                    >취소하기</Btn>
                    <Btn
                        $bgColor={COLORS.blueColor}
                        onClick={() => fetchingUpdateDataRef.current()}
                    >변경하기</Btn>
                </BtnContainer>
            </ModalSection>
        </Wrapper>
    )
}