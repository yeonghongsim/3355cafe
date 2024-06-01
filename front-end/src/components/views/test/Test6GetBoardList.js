import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BodyContainer = styled.div`
    width: 80rem;
    height: 60rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
`;
const Layer = styled.div`
    width: 100%;
    height: 5rem;
    box-sizing: border-box;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const BackText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0 auto;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    &:hover {
        cursor: pointer;
    }
`;

export default function Test6GetBoardList() {
    const navigate = useNavigate();

    const handleClickBackText = () => {
        window.location.href = '/test6/1';
    };
    let [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fullURL = `http://localhost:8080/test/getWysiwyg`;
                const response = await axios.get(fullURL);
                const result = await response.data;
                setBoardList(result);
                // console.log(result);
            } catch (error) {
                console.error('Error getting itemType data:', error);
                throw error;
            }
        };
        // fetchUserItems를 의존성 배열에 추가
        fetchItems();
    }, []);

    console.log(boardList);
    const handleClickBoard = (board) => {
        // console.log(board);
        navigate('/test6/3', { state: { board: board } });
    };

    return (
        <Wrapper>
            <BodyContainer>
                {
                    boardList?.map((board, i) => (
                        <Layer key={i}
                            onClick={() => handleClickBoard(board)}
                        >{board.title}</Layer>
                    ))
                }
                <BackText onClick={handleClickBackText}>
                    뒤로 가기
                </BackText>
            </BodyContainer>
        </Wrapper>
    )
}