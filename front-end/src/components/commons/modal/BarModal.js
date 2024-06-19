import { useEffect, useRef } from "react";
import styled from "styled-components"
import LoginBtn from "../button/LoginBtn";
import SignupBtn from "../button/SignupBtn";
import LogoutBtn from "../button/LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyBoardList } from "../../../commons/store/myBoardList";
import axios from "axios";

const Wrapper = styled.div`
    width: 25rem;
    max-height: ${(props) => (props.$isOn === 'true' ? "100rem" : 0)};
    background-color: white;
    border-radius: 0.5rem;
    position: absolute;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
    top: 90%;
    right: 0;
    overflow: hidden;
    opacity: ${(props) => (props.$isOn === 'true' ? 1 : 0)};
    transition: max-height .9s ease-in-out, opacity .78s ease-in-out;
    // transition: all 0.9s ease-in-out;
    z-index: 200;
    padding: 0.5rem;
    box-sizing: border-box;
    // display: ${(props) => (props.$isOn ? 'block' : 'none')};
`;
const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ProfileContainer = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ProfileImageContainer = styled.div`
    width: 6rem;
    height: 100%;
    padding: 0.3rem;
    box-sizing: border-box;
`;
const ProfileImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    overflow: hidden;
`;
const ProfileImage = styled.img`
    // width: 60%;
    width: ${(props) => (props.$selectedImg ? '100%' : '60%')};
    // height: 60%;
    height: ${(props) => (props.$selectedImg ? '100%' : '60%')};
    flex-shrink: 1;
`;
const ProfileNameContainer = styled.div`
    width: calc(100% - 6rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    box-sizing: border-box;
    gap: 0.5rem;
`;
const ProfileName = styled.p`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const ProfileText = styled.span`
    font-size: 1.4rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding-left: 0.5rem;
`;
const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const ContentText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    &:hover {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
    }
    &:hover::after {
        color: black;
    }
    ${props => props.$afterText && `
    &::after {
        content: "|";
        padding: 0 0.5rem 0 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
    `}
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const BoardLengthText = styled.span`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding: 0 0.3rem 0 0.3rem;
`;

export default function BarModal({
    isOn
    , handleModalClose
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const myBoardList = useSelector((state) => state.myBoardList.myBoardList);
    const modalRef = useRef(null);
    let selectedImg;
    if (userInfo?.profileImgURL !== null) {
        selectedImg = true;
    } else {
        selectedImg = false;
    }
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
    const moveToUserInfoPage = () => {
        navigate('/userInfo');
    };
    const moveToMyBoardListPage = (myBoardList) => {
        navigate('/myBoardList', { state: { myBoardList } });
    };

    // 두 배열이 동일한지 확인하는 함수
    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
        }
        return true;
    };
    useEffect(() => {
        if (userInfo !== null) {
            // console.log('get my boardlist');
            const fetchMyBoardList = async () => {
                const userId = userInfo?._id;
                let myBoards;
                try {
                    const fullURL = `http://localhost:8080/myBoardList/${userId}`;
                    const response = await axios.get(fullURL);
                    myBoards = await response.data;
                    // 지피티 코드
                    // 배열의 내용을 비교하여 동일하지 않으면 상태를 업데이트
                    if (!arraysEqual(myBoardList, myBoards)) {
                        dispatch(setMyBoardList(myBoards));
                    }
                } catch (error) {
                    console.error('Error getting itemType data:', error);
                    throw error;
                }
            };
            fetchMyBoardList();
        }
    }, [
        myBoardList
        , userInfo
        , dispatch
    ])

    return (
        <Wrapper $isOn={isOn} ref={modalRef}>
            <ModalContainer>
                <ProfileContainer>
                    <ProfileImageContainer>
                        <ProfileImageWrapper>
                            {
                                userInfo === null ?
                                    <ProfileImage
                                        $selectedImg={false}
                                        src="/image/profile.svg"
                                    ></ProfileImage>
                                    : userInfo?.profileImgURL === null ?
                                        <ProfileImage
                                            $selectedImg={selectedImg}
                                            src="/image/profile.svg"
                                        ></ProfileImage>
                                        : <ProfileImage
                                            $selectedImg={selectedImg}
                                            src={userInfo?.profileImgURL}
                                            alt={userInfo?.profileImgName}
                                        ></ProfileImage>
                            }
                        </ProfileImageWrapper>
                    </ProfileImageContainer>
                    <ProfileNameContainer>
                        <ProfileName>
                            {
                                userInfo === null ?
                                    'Guest' : userInfo?.userName
                            }
                            <ProfileText>님</ProfileText>
                        </ProfileName>
                    </ProfileNameContainer>
                </ProfileContainer>
                {
                    userInfo === null ?
                        <>
                            <ButtonContainer>
                                <LoginBtn></LoginBtn>
                            </ButtonContainer>
                            <ButtonContainer>
                                <SignupBtn></SignupBtn>
                            </ButtonContainer>
                        </>
                        :
                        <>
                            <ContentContainer>
                                <ContentText
                                    $afterText="true"
                                    onClick={moveToUserInfoPage}
                                >회원 정보</ContentText>
                                <ContentText
                                    $afterText="false"
                                    onClick={() => moveToMyBoardListPage(myBoardList)}>
                                    내 게시글(
                                    <BoardLengthText>{myBoardList.length}</BoardLengthText>
                                    )개</ContentText>
                            </ContentContainer>
                            <ButtonContainer>
                                <LogoutBtn
                                    handleModalClose={handleModalClose}
                                ></LogoutBtn>
                            </ButtonContainer>
                        </>
                }
            </ModalContainer>
        </Wrapper>
    )
}