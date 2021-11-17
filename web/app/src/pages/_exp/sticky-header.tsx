import Image from "next/image";
import styled from "@emotion/styled";

export default function StickyHeader() {
  const SIZE = 200;

  const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
  const StickyHeader = styled.div`
    width: 100%;
    padding: 30px 0;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    background-color: #000000ff;
    color: white;
    position: -webkit-sticky;
    position: sticky;
    z-index: 2;
  `;

  return <>
    <Flex>
      {
        Array(20).fill(null).map((value, index) =>
          <Flex key={ index } aria-label={ "parent" } css={ { height: "1000px" } }>
            {/* Header */ }
            <StickyHeader css={ { top: "70px" } }>{ index + 1 } 월</StickyHeader>
            {/* Season */ }
            <StickyHeader css={ { top: "168px" } }>시즌 인디케이터1</StickyHeader>
            <Image src={ "/ice.svg" } width={ SIZE } height={ SIZE }/>
            <Image src={ "/fire.svg" } width={ SIZE } height={ SIZE }/>
            <Image src={ "/fire.svg" } width={ SIZE } height={ SIZE }/>
            {/* Season */ }
            <StickyHeader css={ { top: "168px" } }>시즌 인디케이터2</StickyHeader>
            <Image src={ "/fire.svg" } width={ SIZE } height={ SIZE }/>
          </Flex>)
      }
      <StickyHeader css={ { backgroundColor: "orange", bottom: "20px", width: 200, height: 100, alignSelf: "flex-start" } }>플로팅 버튼들</StickyHeader>
    </Flex>
  </>
}