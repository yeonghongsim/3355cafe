import styled from "styled-components";
import LOGO from "../../commons/logo/LOGO";
import BarModal from "../../commons/modal/BarModal";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import OnClickMoveToPage from "../../commons/hooks/OnClickMoveToPage";
import { Outlet, useLocation } from "react-router-dom";
import BoardListBodyContainer from "./BoardListBodyContainer";
import { setUser } from "../../../commons/store/userSlice";

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
const BodySection = styled.section`
    width: 100%;
    height: 80vh;
`;

export default function BoardListPage() {
    const location = useLocation();
    // get boardTypeList in store
    const boardTypeList = useSelector((state) => state.boardTypeList.boardTypeList);
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
        }, 1000);
    }, []);

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
                                전체
                            </NavText>
                        </Navbar>
                        {
                            boardTypeList.map((boardType, idx) => (
                                <Navbar key={idx}>
                                    <NavText onClick={OnClickMoveToPage(boardType.url)}>
                                        {boardType.name}
                                    </NavText>
                                </Navbar>
                            ))
                        }
                    </NavbarContainer>
                </SmallWrapper>
            </NavbarSection>
            <BodySection>
                <SmallWrapper>
                    {
                        location.pathname === '/board'
                            ? <BoardListBodyContainer $location={location.pathname}></BoardListBodyContainer> :
                            <Outlet></Outlet>
                    }
                </SmallWrapper>
            </BodySection>
        </Wrapper>
    )
}