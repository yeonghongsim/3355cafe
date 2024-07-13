import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import BarModal from "../../commons/modal/BarModal";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnClickMoveToPage from "../../commons/hooks/OnClickMoveToPage";
import axios from "axios";
import store from "../../../commons/store/store";
import { setBoardTypeList } from "../../../commons/store/boardTypeList";
import { setUser } from "../../../commons/store/userSlice";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderLogoContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderEmpty = styled.div`
    width: 70vw;
    height: 100%;
`;
const HeaderToggleContainer = styled.div`
    width: 15vw;
    height: 100%;
`;
const BarImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
`;
const BarImageWrapper = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0 , 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const BarImage = styled.img`
    width: 50%;
    height: 50%;
`;
const NavbarSection = styled.section`
    width: 100%;
    height: 8vh;
    background: linear-gradient(#68D2E8, #03AED2);
`;
const NavbarContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.3rem;
`;
const Navbar = styled.nav`
    // width: 10rem;
    height: 100%;
    padding: 0 1rem 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const NavText = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;
const NoticeSection = styled.section`
    width: 100%;
    height: 5vh;
`;
const NoticeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    z-index: 100;
    overflow: hidden;
`;
const NoticeContainer = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    box-sizing: border-box;
    transform: translateY(-${props => props.$noticeCount * 100}%);
    transition: transform 0.75s;
    pointerEvents: ${(props) => (props.$isNoticeHovered ? 'none' : 'auto')}
`;
const NoticeText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
const BodySection = styled.section`
    width: 100%;
    height: 65vh;
`;
const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BodyContainerLeft = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    // padding: 0.5rem;
    // box-sizing: border-box;
`;
const AdImageListFullContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
`;
const AdImageIndexContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    box-sizing: border-box;
`;
const AdImageIndexText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    ${props => props.$beforeText && `
        &::before {
            content: '/';
            font-size: 1.4rem;
            font-weight: normal;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        `
    }
`;
const AdImageListWrapper = styled.div`
    width: 100%;
    height: calc(100% - 3rem);
    border-radius: 0 0 1rem 1rem;
    overflow: hidden;
    position: relative;
`;
const AdImageMoveClick = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    left: ${(props) => (props.$way === 'left' ? '1rem' : 'unset')};
    right: ${(props) => (props.$way === 'right' ? '1rem' : 'unset')};
    top: 50%;
    opacity: 0.5;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    transition: all 0.75s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;
const AdImageMoveClickImg = styled.img`
    width: 50%;
    height: 50%;
    flex-shrink: 0;
`;
const AdImageListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    transform: translateX(-${props => props.$imageNowIndex * 100}%);
    transition: transform 1.35s ease;
    will-change: transform;
`;
const AdImage = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    object-fit: cover;
`;
const BodyContainerRight = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BodyContainerRightSmall = styled.div`
    width: 100%;
    height: 50%;
    // padding: 1rem;
    box-sizing: border-box;
`;
const RecentBoardListFullContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
`;
const RecentBoardListHeadContainer = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const RecentBoardListHeadText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
    color: black;
`;
const RecentBoardListContainer = styled.div`
    width: 100%;
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const RecentBoard = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const RecentBoardText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
const IconsFullContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: felx-start;
    justify-content: flex-start;
    padding: 1rem;
    box-sizing: border-box;
`;
const IconsContainer = styled.div`
    width: 10rem;
    height: 50%;
    border: 1px solid black;
    box-sizing: border-box;
`;
const FooterSection = styled.section`
    width: 100%;
    height: 7vh;
    margin-top: 3vh;
    background: linear-gradient(#eee, #d9d9d9);
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const FooterCopyrightContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem 0 1rem;
`;
const CopyrightImg = styled.img`
    width: 2rem;
    height: 2rem;
`;
const CopyrightText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
`;
const FooterTextContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    gap: 1rem;
`;
const FooterText = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
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
        padding-left: 1rem;
        content: "|";
        font-size: 1.5rem;
    }
    `}
`;

export default function HomePage(props) {
    const navigate = useNavigate();
    // userInfo section
    let userInfo = useSelector((state) => state.user.user);
    // get boardTypeList in store
    const boardTypeList = useSelector((state) => state.boardTypeList.boardTypeList);
    // boardtypeList search n save in store
    useEffect(() => {
        // console.log('get board type');
        let boardTypes;
        const fetchBoardTypeList = async () => {
            try {
                const fullURL = `http://localhost:8080/boardType`;
                const response = await axios.get(fullURL);
                boardTypes = await response.data;
                // setItemList(await response.data);
                // setIsLoading(false);
                if (boardTypeList.length !== boardTypes.length) {
                    store.dispatch(setBoardTypeList(boardTypes));
                }
            } catch (error) {
                console.error('Error getting itemType data:', error);
                throw error;
            }
        };
        // fetchUserItems를 의존성 배열에 추가
        fetchBoardTypeList();
    }, [
        boardTypeList
    ]);
    // bar modal section
    let [isOnBarModal, setIsOnBarModal] = useState(false);
    // up-right side bar modal open/close
    const handleBarModal = (e) => {
        e.stopPropagation();
        setIsOnBarModal(!isOnBarModal);
    };
    // up-right side  modal close
    const handleModalClose = useCallback(() => {
        setIsOnBarModal(false);
        setTimeout(() => {
            setUser(null);
        }, 750);
    }, []);
    // notice section
    const imsiNoticeTextList = ['공지사항1', '공지사항2', '공지사항3'];
    // notice section 부분 slide animation function
    const [noticeCount, setNoticeCount] = useState(0);
    const [isNoticeHovered, setIsNoticeHovered] = useState(false);
    // notice text hovering
    const updateNoticeIndex = useCallback(() => {
        if (!isNoticeHovered) {
            setNoticeCount(prevCount => (prevCount + 1) % imsiNoticeTextList.length);
        }
    }, [isNoticeHovered, imsiNoticeTextList.length]);
    // notice text mouse hover event handler
    const handleMouseEnter = () => {
        setIsNoticeHovered(true);
    };
    // notice text mouse hover event handler
    const handleMouseLeave = () => {
        setIsNoticeHovered(false);
    };
    // 공지 사항 관련 슬라이드 세팅
    useEffect(() => {
        // 3초마다 공지사항 인덱스 업데이트
        const interval = setInterval(updateNoticeIndex, 3300);
        // 컴포넌트가 unmount될 때 clearInterval 호출하여 메모리 누수 방지
        return () => clearInterval(interval);
    }, [updateNoticeIndex]);
    // Ad image section
    const imsiImageList = ['/image/imsiImage1.jpeg', '/image/imsiImage2.jpeg'
        , '/image/imsiImage3.jpeg'];
    let [currentImageIndex, setCurrentImageIndex] = useState(0);
    let [adImageIntervalId, setAdImageIntervalId] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        setAdImageIntervalId(interval);

        return () => clearInterval(interval);
    }, [
        imsiImageList.length
    ]);
    const adImageResetInterval = () => {
        if (adImageIntervalId) {
            clearInterval(adImageIntervalId);
        }
        const newInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        setAdImageIntervalId(newInterval);
    };
    const handleMovePrevImg = (e) => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imsiImageList.length - 1 : prevIndex - 1
        );
        e.stopPropagation();
        adImageResetInterval();
    };
    const handleMoveNextImg = (e) => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
        );
        e.stopPropagation();
        adImageResetInterval();
    };
    // login page 이동
    const moveToPage = (path, board) => {
        // navigate(path);
        const prevPathname = '/';
        navigate(path, { state: { board, prevPathname } });
    };
    // localstorage 사용해서 최근 본 게시글 목록 사용할 예정
    const [recentBoardList, setRecentBoardList] = useState([]);
    useEffect(() => {
        if (userInfo) {
            const userKey = `recentBoards_${userInfo._id}`;
            const recentBoards = JSON.parse(localStorage.getItem(userKey)) || [];
            setRecentBoardList(recentBoards);
        }
    }, [userInfo]);

    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <HeaderLogoContainer>
                            <LOGO></LOGO>
                        </HeaderLogoContainer>
                        <HeaderEmpty></HeaderEmpty>
                        <HeaderToggleContainer>
                            <BarImageContainer>
                                <BarImageWrapper onClick={handleBarModal}>
                                    <BarImage src="/image/bars.svg"></BarImage>
                                </BarImageWrapper>
                                <BarModal
                                    isOn={isOnBarModal ? "true" : "false"}
                                    handleModalClose={handleModalClose}
                                ></BarModal>
                            </BarImageContainer>
                        </HeaderToggleContainer>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <NavbarSection>
                <SmallWrapper>
                    <NavbarContainer>
                        <Navbar>
                            <NavText onClick={OnClickMoveToPage('/board')}>
                                게시판
                            </NavText>
                        </Navbar>
                        {
                            userInfo?.role === 'ADMIN' ?
                                <Navbar>
                                    <NavText>
                                        관리자모드
                                    </NavText>
                                </Navbar> : null
                        }
                    </NavbarContainer>
                </SmallWrapper>
            </NavbarSection>
            <NoticeSection>
                <SmallWrapper>
                    <NoticeWrapper>
                        {
                            imsiNoticeTextList.map((notice, i) =>
                                <NoticeContainer
                                    key={i}
                                    $noticeCount={noticeCount}
                                    $isNoticeHovered={isNoticeHovered}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <NoticeText>
                                        {notice}
                                    </NoticeText>
                                </NoticeContainer>
                            )
                        }
                    </NoticeWrapper>
                </SmallWrapper>
            </NoticeSection>
            <BodySection>
                <SmallWrapper>
                    <BodyContainer>
                        <BodyContainerLeft>
                            <AdImageListFullContainer>
                                <AdImageIndexContainer>
                                    <AdImageIndexText $beforeText={false}>
                                        {currentImageIndex + 1}
                                    </AdImageIndexText>
                                    <AdImageIndexText $beforeText={true}>
                                        {imsiImageList.length}
                                    </AdImageIndexText>
                                </AdImageIndexContainer>
                                <AdImageListWrapper
                                >
                                    <AdImageListContainer
                                        $imageNowIndex={currentImageIndex}
                                    >
                                        {
                                            imsiImageList.map((image, idx) => (
                                                <AdImage src={image} key={idx}></AdImage>
                                            ))
                                        }
                                    </AdImageListContainer>
                                    <AdImageMoveClick
                                        $way='left'
                                    >
                                        <AdImageMoveClickImg
                                            src="/image/arrow-left.svg"
                                            onClick={handleMovePrevImg}
                                        ></AdImageMoveClickImg>
                                    </AdImageMoveClick>
                                    <AdImageMoveClick
                                        $way='right'
                                    >
                                        <AdImageMoveClickImg
                                            src="/image/arrow-right.svg"
                                            onClick={handleMoveNextImg}
                                        ></AdImageMoveClickImg>
                                    </AdImageMoveClick>
                                </AdImageListWrapper>
                            </AdImageListFullContainer>
                        </BodyContainerLeft>
                        <BodyContainerRight>
                            <BodyContainerRightSmall>
                                <RecentBoardListFullContainer>
                                    <RecentBoardListHeadContainer>
                                        <RecentBoardListHeadText>
                                            최근 본 게시글
                                        </RecentBoardListHeadText>
                                    </RecentBoardListHeadContainer>
                                    {
                                        userInfo === null ?
                                            <RecentBoardText onClick={() => moveToPage('/login', null)}>
                                                회원 전용 서비스 입니다. 로그인 하러 가시겠습니까?
                                            </RecentBoardText> :
                                            <RecentBoardListContainer>
                                                {
                                                    recentBoardList.length === 0 ?
                                                        <RecentBoardText>
                                                            최근 본 게시글이 없습니다.
                                                        </RecentBoardText> :
                                                        recentBoardList.map((board, i) => (
                                                            <RecentBoard
                                                                key={i}
                                                            >
                                                                <RecentBoardText
                                                                    onClick={() => moveToPage(`/boardDetail/${board._id}`, board)}>
                                                                    {board.boardTitle}
                                                                </RecentBoardText>
                                                            </RecentBoard>
                                                        ))
                                                }
                                            </RecentBoardListContainer>
                                    }
                                </RecentBoardListFullContainer>
                            </BodyContainerRightSmall>
                            <BodyContainerRightSmall>
                                <IconsFullContainer>
                                    <IconsContainer>1</IconsContainer>
                                    <IconsContainer>2</IconsContainer>
                                    <IconsContainer>3</IconsContainer>
                                    <IconsContainer>4</IconsContainer>
                                </IconsFullContainer>
                            </BodyContainerRightSmall>
                        </BodyContainerRight>
                    </BodyContainer>
                </SmallWrapper>
            </BodySection>
            <FooterSection>
                <SmallWrapper>
                    <FooterContainer>
                        <FooterCopyrightContainer>
                            <CopyrightImg src="/image/copyright.svg"></CopyrightImg>
                            <CopyrightText>Copyright</CopyrightText>
                        </FooterCopyrightContainer>
                        <FooterTextContainer>
                            <FooterText $afterText="true">ppt</FooterText>
                            <FooterText $afterText="false">video</FooterText>
                        </FooterTextContainer>
                    </FooterContainer>
                </SmallWrapper>
            </FooterSection>
        </Wrapper>
    )
}