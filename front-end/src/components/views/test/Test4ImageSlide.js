import { useEffect, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ImageListFullContainer = styled.div`
    width: 50rem;
    height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
`;
const ImageIndexContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    box-sizing: border-box;
`;
const ImageIndexText = styled.p`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
    ${props => props.$beforeText && `
        &::before {
            content: '/';
            font-size: 1.6rem;
            font-weight: normal;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        `
    }
`;
const ImageListWrapper = styled.div`
    width: 100%;
    height: calc(100% - 5rem);
    border-radius: 0 0 1rem 1rem;
    overflow: hidden;
    position: relative;
`;
const MoveClick = styled.div`
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
const MoveClickImg = styled.img`
    width: 50%;
    height: 50%;
    flex-shrink: 0;
`;
const ImageListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    transform: translateX(-${props => props.$imageNowIndex * 100}%);
    transition: transform 1.35s ease;
    will-change: transform;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    object-fit: cover;
`;

export default function Test4ImageSlide() {

    let [imageNowIndex, setImageNowIndex] = useState(0);
    let [intervalId, setIntervalId] = useState(null);
    const imsiImageList = ['/image/imsiImage1.jpeg'
        , '/image/imsiImage2.jpeg', '/image/imsiImage3.jpeg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setImageNowIndex((prevIndex) =>
                prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        setIntervalId(interval);

        return () => clearInterval(interval);
    }, [
        imsiImageList.length
    ]);
    const resetInterval = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        const newInterval = setInterval(() => {
            setImageNowIndex((prevIndex) =>
                prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        setIntervalId(newInterval);
    };

    const handleMovePrevImg = (e) => {
        setImageNowIndex((prevIndex) =>
            prevIndex === 0 ? imsiImageList.length - 1 : prevIndex - 1
        );
        e.stopPropagation();
        resetInterval();
    };
    const handleMoveNextImg = (e) => {
        setImageNowIndex((prevIndex) =>
            prevIndex === imsiImageList.length - 1 ? 0 : prevIndex + 1
        );
        e.stopPropagation();
        resetInterval();
    };

    return (
        <Wrapper>
            <ImageListFullContainer>
                <ImageIndexContainer>
                    <ImageIndexText $beforeText={false}>
                        {imageNowIndex + 1}
                    </ImageIndexText>
                    <ImageIndexText $beforeText={true}>
                        {imsiImageList.length}
                    </ImageIndexText>
                </ImageIndexContainer>
                <ImageListWrapper
                >
                    <ImageListContainer
                        $imageNowIndex={imageNowIndex}
                    >
                        {
                            imsiImageList.map((image, idx) => (
                                <Image src={image} key={idx}></Image>
                            ))
                        }
                    </ImageListContainer>
                    <MoveClick
                        $way='left'
                    >
                        <MoveClickImg
                            src="/image/arrow-left.svg"
                            onClick={handleMovePrevImg}
                        ></MoveClickImg>
                    </MoveClick>
                    <MoveClick
                        $way='right'
                    >
                        <MoveClickImg
                            src="/image/arrow-right.svg"
                            onClick={handleMoveNextImg}
                        ></MoveClickImg>
                    </MoveClick>
                </ImageListWrapper>
            </ImageListFullContainer>
        </Wrapper>
    )
}