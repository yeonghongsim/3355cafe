import { useRef, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;
const FullContainer = styled.div`
    width: 30rem;
    height: 50rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    overflow: hidden;
    &:hover {
        cursor: pointer;
    }
`;
const SmallWrapper = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    transform: ${(props) => `translateX(${props.$transformX}rem)`};
    transition: transform 0.15s ease-out;
    will-change: transform;
    overflow-x: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const Container = styled.div`
    width: 30rem;
    height: 50rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border: 1px solid black;
    box-sizing: border-box;
`;
export default function Test10DragSlide() {
    const imsiList = [1, 2, 3, 4, 5];
    const wrapperRef = useRef(null);
    const [pageNum, setPageNum] = useState(1);
    const [startX, setStartX] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [transformX, setTransformX] = useState(0);
    const [howMuchDrag, setHowMuchDrag] = useState(0);
    let lastPageNum = imsiList.length;

    const handleMouseDown = (e) => {
        setStartX(e.pageX);
        setDragging(true);
        setHowMuchDrag(0);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const deltaX = (e.pageX - startX) * 0.1;
        console.log(deltaX);
        setHowMuchDrag(deltaX);
        setTransformX(deltaX - 30 * (pageNum - 1));
    };

    const handleMouseUp = () => {
        setStartX(null);
        setDragging(false);
        console.log('----------------');
        console.log('transformX : ' + transformX);
        console.log('howMuchDrag : ' + howMuchDrag);
        if (howMuchDrag <= -10) {
            if (pageNum < lastPageNum) {
                console.log('slide to next container');
                const initialPageNum = pageNum + 1;
                setPageNum(initialPageNum);
                setTransformX(-30 * (initialPageNum - 1));
            } else {
                setPageNum(lastPageNum);
                setTransformX(-30 * (lastPageNum - 1))
            }
        } else if (howMuchDrag >= 10) {
            if (pageNum > 1) {
                console.log('slide to prev container');
                const initialPageNum = pageNum - 1;
                setPageNum(initialPageNum);
                setTransformX(-30 * (initialPageNum - 1));
            } else {
                setPageNum(1);
                setTransformX(0);
            }
        } else if (howMuchDrag === 0) {
            console.log('just click');
        } else {
            console.log('slide to now container');
            const initialPageNum = pageNum;
            setPageNum(initialPageNum);
            setTransformX(-30 * (initialPageNum - 1));
        }
    };
    console.log('pageNum : ' + pageNum);

    return (
        <Wrapper>
            <FullContainer>
                <SmallWrapper
                    ref={wrapperRef}
                    $transformX={transformX}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {
                        imsiList.map((val, i) =>
                            <Container
                                key={i}
                            >{val}</Container>
                        )
                    }
                </SmallWrapper>
            </FullContainer>
        </Wrapper>
    )
}