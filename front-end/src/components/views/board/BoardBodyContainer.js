import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useRef } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SearchBarSection = styled.section`
    width: 100%;
    height: 8vh;
    // background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // padding-right: 1rem;
    // box-sizing: border-box;
`;
const SearchBarContainer = styled.div`
    width: 30rem;
    height: 4rem;
    gap: 0.5rem;
    // background-color: #eee;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SearchBarInputWrapper = styled.div`
    width: calc(100% - 5rem);
    height: 4rem;
    border: 0.1rem solid darkgray;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SearchBarInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    box-sizing: border-box;
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const SearchBarImgWrapper = styled.div`
    width: 4.5rem;
    height: 4rem;
    background-color: ${COLORS.blueColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;
const SearchBarImg = styled.img`
    width: 70%;
    height: 70%;
    flex-shrink: 0;
`;
const BoardListSection = styled.section`
    width: 100%;
    height: calc(100% - 8vh);
`;
const BoardListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BoardPageLayer = styled.div`
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PageText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const BoardContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid #d9d9d9;
    ${(props) => props.$boardIndex === 10 ? `
    border-bottom: 1px solid #d9d9d9;` : null
    }
    box-sizing: border-box;
`;
const BoardTypeWrapper = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    font-size: 1.4rem;
`;
const BoardWriterWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    font-size: 1.4rem;
`;
const BoardTitleWrapper = styled.div`
    width: 42%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #eee;
    font-size: 1.4rem;
    padding-left: 1rem;
    box-sizing: border-box;
`;
const BoardViewsWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    font-size: 1.4rem;
`;
const BoardEmotionWrapper = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    font-size: 1.4rem;
`;
const BoardDateWrapper = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    font-size: 1.4rem;
`;

export default function BoardBodyContainer({
    $location
}) {
    console.log($location);
    // imsi list for after get board list
    const imsiBoardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // search input ref
    const searchInputRef = useRef(null);
    // search input ref get value
    const handleSearchImgClick = () => {
        const searchData = searchInputRef.current.value;
        console.log(searchData);
        // window.location.href = '/board/search';
    };
    // click board, move to board detail
    const handleClickBoard = () => {
        window.location.href = '/boardDetail';
    };

    return (
        <Wrapper>
            <SearchBarSection>
                <SearchBarContainer>
                    <SearchBarInputWrapper>
                        <SearchBarInput ref={searchInputRef}></SearchBarInput>
                    </SearchBarInputWrapper>
                    <SearchBarImgWrapper
                        onClick={handleSearchImgClick}
                    >
                        <SearchBarImg src="/image/search.svg"></SearchBarImg>
                    </SearchBarImgWrapper>
                </SearchBarContainer>
            </SearchBarSection>
            <BoardListSection>
                <BoardListContainer>
                    {
                        imsiBoardList.map((board, idx) => (
                            <BoardContainer
                                key={idx}
                                $boardIndex={idx + 1}
                                onClick={handleClickBoard}>
                                <BoardTypeWrapper>글타입</BoardTypeWrapper>
                                <BoardWriterWrapper>작성자</BoardWriterWrapper>
                                <BoardTitleWrapper>제목</BoardTitleWrapper>
                                <BoardViewsWrapper>조회수</BoardViewsWrapper>
                                <BoardEmotionWrapper>좋아요/싫어요</BoardEmotionWrapper>
                                <BoardDateWrapper>작성일</BoardDateWrapper>
                            </BoardContainer>
                        ))
                    }
                    <BoardPageLayer>
                        <PageText>1</PageText>
                    </BoardPageLayer>
                </BoardListContainer>
            </BoardListSection>
        </Wrapper>
    )
}