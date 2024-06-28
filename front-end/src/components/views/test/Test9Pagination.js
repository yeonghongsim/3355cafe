import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
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
    // overflow: hidden;
`;
const BoardListWrapper = styled.div`
    min-width: 100%;
    height: 45rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
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
const PageNumContainer = styled.div`
    width: calc(100% - 6rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    // const [nowPageIndex, setNowPageIndex] = useState(1);
    const [pageNumList, setPageNumList] = useState([]);
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
                        console.log(count);
                    }
                };
                // console.log(boardListCopy);
                // 저장한 모든 리스트를 갖는 전체 리스트
                setBoardList(boardListFullCopy);
                setPageNumList(pageNumFullCopy);
            } catch (error) {
                // console.error('Error getting itemType data:', error);
                throw error;
            }
        };
        fetchItems();
    }, [])
    const handlePrevPage = () => {
        console.log('click prev')
    };
    const handleNextPage = () => {
        console.log('click next')
    };
    // const handleSetNowPage = (pageNum) => {
    //     console.log(pageNum);
    // };
    // console.log(boardList);
    console.log(pageNumList);
    return (
        <Wrapper>
            <BoardListFullContainer>
                <BoardListWrapper>
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
                        <ChevronImg
                            src="/image/chevron-left.svg"
                            draggable="false"
                            onClick={() => handlePrevPage()}
                        ></ChevronImg>
                    </PageMoveContainer>
                    <PageNumContainer>
                        1
                    </PageNumContainer>
                    <PageMoveContainer>
                        <ChevronImg
                            src="/image/chevron-right.svg"
                            draggable="false"
                            onClick={() => handleNextPage()}
                        ></ChevronImg>
                    </PageMoveContainer>
                </PageNumFullContainer>
            </BoardListFullContainer>
        </Wrapper>
    )
}