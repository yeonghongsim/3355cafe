import { useEffect } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ImageListFullContainer = styled.div`
    width: 40rem;
    height: 40rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const IndexContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    box-sizing: border-box;
`;
const IndexText = styled.p`
    font-size: 1.8rem;
    font-weight: normal;
    margin: 0;
    ${props =>
        props.$beforeText && `
        &::before {
            content: '/';
            font-size: 1.6rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }`
    }
`;
const ImageListContainer = styled.div`
    width: 100%;
    height: calc(100% - 3rem);
`;
const ImageListWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0 0 1rem 1rem;
    overflow: hidden;
    // transform: translateX(-100%);
    // transform: translateY(-${props => props.$imageIndexCount * 100}%);
    transition: transform 0.75s;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    object-fit: cover;
    &:hover {
        cursor: pointer;
    }
`;

export default function Test4ImageSlide() {

    const imsiImageList = ['/image/imsiImage1.jpeg'
        , '/image/imsiImage2.jpeg', '/image/imsiImage3.jpeg'];

    useEffect(() => (
        console.log(1212)
    ), []);

    return (
        <Wrapper>
            <ImageListFullContainer>
                <IndexContainer>
                    <IndexText $beforeText={false}>
                        현재 이미지 index
                    </IndexText>
                    <IndexText $beforeText={true}>
                        {imsiImageList.length}
                    </IndexText>
                </IndexContainer>
                <ImageListContainer>
                    <ImageListWrapper>
                        {
                            imsiImageList.map((image, index) => (
                                <Image src={image} key={index}></Image>
                            ))
                        }
                    </ImageListWrapper>
                </ImageListContainer>
            </ImageListFullContainer>
        </Wrapper>
    )
}