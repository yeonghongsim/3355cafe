import styled from "styled-components"
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
const BackText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: black;
`;
const Body = styled.div`
    width: 80%;
    min-height: 80%;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0 ,0.25);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    border: 1px solid #eee;
`;
const TitleContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.8rem;
    font-weight: bold;
`;
const ContentContainer = styled.div`
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.8rem;
    font-weight: bold;
`;


export default function Test6GetBoard({ props }) {
    const location = useLocation();
    const board = location.state?.board;

    console.log(board);
    const handlePageBack = () => {
        window.location.href = '/test6/2';
    };

    return (
        <Wrapper>
            <BackText onClick={handlePageBack}>뒤로 가기</BackText>
            <Body>
                <Layer>
                    <TitleContainer>
                        {board.title}
                    </TitleContainer>
                </Layer>
                <Layer>
                    <ContentContainer dangerouslySetInnerHTML={{ __html: board.contentHTML }}>

                    </ContentContainer>
                </Layer>
            </Body>
        </Wrapper>
    )
}