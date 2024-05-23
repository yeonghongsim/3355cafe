import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import BarModal from "../../commons/modal/BarModal";
import { useCallback, useEffect, useState } from "react";

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
    cursor: normal;
    ${props => props.$beforeText && `
    &::before {
        content: '/';
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        font-size: 1.4rem;
    `}
}
`;
const AdImageListContainer = styled.div`
    width: 100%;
    height: calc(100% - 3rem);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0 0 1rem 1rem;
    overflow: hidden;
`
const AdImageListWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const AdImage = styled.img`
    width: 100%;
    height: 100%;
     flex-shrink: 0;
    // border-radius: 1rem;
    object-fit: cover;
    // padding: 0.5rem;
    // box-sizing: border-box;
    cursor: pointer;
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
    // background-color: ${props => props.$bgColor};
    padding: 1rem;
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
    const imsiNoticeTextList = ['공지사항1', '공지사항2', '공지사항3'];
    const imsiImageList = ['/image/imsiImage1.jpeg', '/image/imsiImage2.jpeg'
        , '/image/imsiImage3.jpeg'];
    // gpt가 알려준 image 관련 추가 코드 01

    let [isOnBarModal, setIsOnBarModal] = useState(false);
    // modal open/close
    const handleBarModal = (e) => {
        e.stopPropagation();
        setIsOnBarModal(!isOnBarModal);
    };
    // modal close
    const handleModalClose = useCallback(() => {
        setIsOnBarModal(false);
    }, []);
    // notice section 부분 slide animation function
    const [noticeCount, setNoticeCount] = useState(0);
    const [isNoticeHovered, setIsNoticeHovered] = useState(false);
    // 공지사항 인덱스를 업데이트하는 함수
    const updateNoticeIndex = useCallback(() => {
        if (!isNoticeHovered) {
            setNoticeCount(prevCount => (prevCount + 1) % imsiNoticeTextList.length);
        }
    }, [isNoticeHovered, imsiNoticeTextList.length]);

    // 마우스 호버 이벤트 핸들러
    const handleMouseEnter = () => {
        setIsNoticeHovered(true);
    };

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
                            <NavText>
                                게시판
                            </NavText>
                        </Navbar>
                        <Navbar>
                            <NavText>
                                관리자모드
                            </NavText>
                        </Navbar>
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
                                        현재 이미지 index
                                    </AdImageIndexText>
                                    <AdImageIndexText $beforeText={true}>
                                        {imsiImageList.length}
                                    </AdImageIndexText>
                                </AdImageIndexContainer>
                                <AdImageListContainer>
                                    <AdImageListWrapper
                                    >
                                        {
                                            imsiImageList.map((image, i) => (
                                                <AdImage src={image} key={i}></AdImage>
                                            ))
                                        }
                                    </AdImageListWrapper>
                                </AdImageListContainer>
                            </AdImageListFullContainer>
                        </BodyContainerLeft>
                        <BodyContainerRight>
                            <BodyContainerRightSmall $bgColor="lightblue">
                                오늘의 핫이슈
                            </BodyContainerRightSmall>
                            <BodyContainerRightSmall $bgColor="lightyellow">
                                이미지 파일들(ppt, video) 다운로드
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