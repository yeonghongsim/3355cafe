import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const BoardListFullContainer = styled.div`
    width: 30rem;
    height: 50rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
`;
const BoardListWrapper = styled.div`
    min-width: 100%;
    height: 45rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    transform: ${props => `translateX(${(1 - props.$nowPageNum) * 30}rem)`};
    transition: transform 1.35s ease;
    will-change: transform;
`;
const BoardListContainer = styled.div`
    flex: 1;
    width: 30rem;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BoardContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.6rem;
    font-weight: normal;
    padding-left: 1.5rem;
    box-sizing: border-box;
`;
const PageNumFullContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const PageMoveContainer = styled.div`
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PageNumSmallContainer = styled.div`
    width: calc(100% - 6rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PageNumContainer = styled.div`
    width: 10.5rem;
    height: 3.5rem;
    overflow: hidden;
`;
const PageNumWrapper = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    transform: ${props => `translateX(-${(props.$nowPageLayer - 1) * 10.5}rem)`};
    transition: transform 1.35s ease;
    will-change: transform;
`;
const PageNumLayerContainer = styled.div`
    width: 10.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PageNumText = styled.p`
    font-size: 1.6rem;
    font-weight: ${(props) => props.$nowPageNum === props.$pageNum ? 'bold' : 'normal'};
    margin: 0;
    padding: 0 0.5rem 0 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;
const ChevronImg = styled.img`
    width: 30%;
    height: 30%;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
`;

export default function Test9Pagination() {
    const [boardList, setBoardList] = useState([]);
    const [nowPageNum, setNowPageNum] = useState(1);
    const [lastPageNum, setLastpageNum] = useState();
    const [nowPageLayer, setNowPageLayer] = useState(1);
    const [pageNumList, setPageNumList] = useState([]);

    const boardListWrapperRef = useRef(null);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fullURL = `http://localhost:8080/boardList`;
                const response = await axios.get(fullURL);
                const boardList = await response.data;
                let boardListFullCopy = [];
                let boardListSmallCopy = [];
                let count = 1;
                let pageNumFullCopy = [];
                let pageNumSmallCopy = [];
                for (let i = 0; i < boardList.length; i++) {
                    boardListSmallCopy.push(boardList[i]);
                    // 각 리스트 <= 9개 게시글
                    if ((i + 1) % 9 === 0) {
                        boardListFullCopy.push(boardListSmallCopy);
                        boardListSmallCopy = [];
                        pageNumSmallCopy.push(count);
                        if (count % 3 === 0) {
                            pageNumFullCopy.push(pageNumSmallCopy);
                            pageNumSmallCopy = [];
                        }
                        count += 1;
                    }
                    // 마지막 리스트 <= 9개 미만의 게시글
                    if (i === boardList.length - 1) {
                        boardListFullCopy.push(boardListSmallCopy);
                        pageNumSmallCopy.push(count);
                        pageNumFullCopy.push(pageNumSmallCopy);
                    }
                };
                // console.log(boardListCopy);
                // 저장한 모든 리스트를 갖는 전체 리스트
                setBoardList(boardListFullCopy);
                setPageNumList(pageNumFullCopy);
                setLastpageNum(pageNumFullCopy[pageNumFullCopy.length - 1][[pageNumFullCopy.length - 1].length]);
            } catch (error) {
                // console.error('Error getting itemType data:', error);
                throw error;
            }
        };
        fetchItems();
    }, []);
    const handlePrevPage = () => {
        if (nowPageNum > 1) {
            setNowPageNum(nowPageNum - 1);
            handlePageLayer(nowPageNum - 1);
        }
    };
    const handleNextPage = () => {
        if (nowPageNum < lastPageNum) {
            setNowPageNum(nowPageNum + 1);
            handlePageLayer(nowPageNum + 1);
        }
    };
    const handleSetNowPage = (pageNum) => {
        setNowPageNum(pageNum);
        handlePageLayer(pageNum);
    };
    const handlePageLayer = (pageNum) => {
        setNowPageLayer(Math.ceil(pageNum / 3));
    };
    return (
        <Wrapper>
            <BoardListFullContainer>
                <BoardListWrapper
                    ref={boardListWrapperRef}
                    $nowPageNum={nowPageNum}
                >
                    {
                        boardList.map((boards, i) =>
                            <BoardListContainer
                                key={i}
                            >
                                {
                                    boards.map((board, i) => {
                                        return (
                                            <BoardContainer
                                                key={i}
                                            >{board.boardTitle}</BoardContainer>
                                        )
                                    })
                                }
                            </BoardListContainer>
                        )
                    }
                </BoardListWrapper>
                <PageNumFullContainer>
                    <PageMoveContainer>
                        {
                            nowPageNum > 1 ?
                                <ChevronImg
                                    src="/image/chevron-left.svg"
                                    draggable="false"
                                    onClick={() => handlePrevPage()}
                                ></ChevronImg> : null
                        }
                    </PageMoveContainer>
                    <PageNumSmallContainer>
                        <PageNumContainer>
                            <PageNumWrapper
                                $nowPageLayer={nowPageLayer}>
                                {
                                    pageNumList.map((pageLayer, i) =>
                                        <PageNumLayerContainer
                                            key={i}
                                        >
                                            {
                                                pageLayer.map((pageNum, i) =>
                                                    <PageNumText
                                                        key={i}
                                                        onClick={() => handleSetNowPage(pageNum)}
                                                        $nowPageNum={nowPageNum}
                                                        $pageNum={pageNum}>
                                                        {pageNum}
                                                    </PageNumText>
                                                )
                                            }
                                        </PageNumLayerContainer>
                                    )
                                }
                            </PageNumWrapper>
                        </PageNumContainer>
                    </PageNumSmallContainer>
                    <PageMoveContainer>
                        {
                            nowPageNum === lastPageNum ?
                                null :
                                <ChevronImg
                                    src="/image/chevron-right.svg"
                                    draggable="false"
                                    onClick={() => handleNextPage()}
                                ></ChevronImg>
                        }
                    </PageMoveContainer>
                </PageNumFullContainer>
            </BoardListFullContainer>
        </Wrapper>
    )
}