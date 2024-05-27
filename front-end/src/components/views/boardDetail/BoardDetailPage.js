import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import BarModal from "../../commons/modal/BarModal";
import { useCallback, useState } from "react";

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
const BodySection = styled.section`
    width: 100%;
    border-top: 0.1rem solid #d9d9d9;
    box-sizing: boder-box;
`;
const BoardInfoSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
`;
const BoardHeaderSection = styled.section`
    width: 100%;
`;
const HeaderLayer = styled.div`
    width: 100%;
    min-height: 3.5rem;
    background-color: white;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: ${(props) => (props.$isLast ?
        '1px solid black' : 'none'
    )};
    border-left: 1px solid black;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.$justifyContent};
`;
const HeaderTextWrapper = styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
    border-left: ${(props) => (props.$borderLeft ?
        '1px solid black' : 'none'
    )};
`;
const HeaderText = styled.p`
    font-size: ${(props) => props.$fontSize};
    font-weight: normal;
    color: black;
    margin: 0 auto;
`;
const BoardContentSection = styled.section`
    width: 100%;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BoardLikeOrUnlikeSection = styled.section`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
`;
const BoardReplySection = styled.section`
    width: 100%;
    margin-top: 3rem;
    background-color: #eee;
`;

export default function BoardDetailPage() {
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
            <BodySection>
                <SmallWrapper>
                    <BoardInfoSection>
                        <BoardHeaderSection>
                            <HeaderLayer
                                $isLast={false}
                                $justifyContent="flex-end"
                            >
                                <HeaderTextWrapper $borderLeft={true}>
                                    <HeaderText $fontSize='1.4rem'>
                                        작성자 ID
                                    </HeaderText>
                                </HeaderTextWrapper>
                                <HeaderTextWrapper $borderLeft={true}>
                                    <HeaderText $fontSize='1.4rem'>
                                        작성일 new Date
                                    </HeaderText>
                                </HeaderTextWrapper>
                            </HeaderLayer>
                            <HeaderLayer
                                $isLast={true}
                                $justifyContent="center"
                            >
                                <HeaderTextWrapper $borderLeft={false}>
                                    <HeaderText $fontSize='1.8rem'>
                                        12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455
                                    </HeaderText>
                                </HeaderTextWrapper>
                            </HeaderLayer>
                        </BoardHeaderSection>
                        <BoardContentSection>
                            게시글 내용 과 이미지 리스트들
                        </BoardContentSection>
                        <BoardLikeOrUnlikeSection>
                            좋아요 / 싫어요 공간
                        </BoardLikeOrUnlikeSection>
                    </BoardInfoSection>
                    <BoardReplySection>
                        댓글 공간
                    </BoardReplySection>
                </SmallWrapper>
            </BodySection>
        </Wrapper>
    )
}