import styled from "styled-components"

const Wrapper = styled.div`
    width: 7.5rem;
    height: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    :hover {
        cursor: pointer;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
`;

export default function LOGO(props) {
    const moveToHomepage = () => {
        window.location.href = "/"
    };
    return (
        <Wrapper onClick={moveToHomepage}>
            <Image src="/image/myLogo.png"></Image>
        </Wrapper>
    )
}