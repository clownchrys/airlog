import styled from "@emotion/styled";
import { BellFilled, ClockCircleFilled, HeartFilled, SmileFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Media } from "src/lib/fresnel";

const Container = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 30px;
  transition: all .3s;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }

  #title {
    margin: 0;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  #icon {
    width: 100px;
    height: 100px;
    background-color: #40A9FF;
    color: white;
    box-sizing: border-box;
    border: none;
    padding: 20px;
    margin: 10px;
    font-size: 2rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 768px) {
      width: 80px;
      height: 80px;
      font-size: 1.5rem;
    }
  }

  #desc {
    text-align: center;
    p {
      margin-bottom: 5px;
    }
    @media screen and (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const Features = [
  {
    title: "일정 알림 푸시",
    icon: <BellFilled />,
    desc: "오늘의 컨텐츠는?\n새 컨텐츠를 푸시 메시지로 알려드려요"
  },
  {
    title: "히스토리",
    icon: <ClockCircleFilled />,
    desc: "좀 더 큰 팬덤을 원한다면?\n내가 좋아하는 스타의 연대기를 만들어 관리하세요"
  },
  {
    title: "핫 컨텐츠",
    icon: <HeartFilled />,
    desc: "새로 좋아하게 된 스타가 있다구요?\n그러면 인기있고 핫한 주요 컨텐츠부터 보는게 어떨까요?"
  },
  {
    title: "커뮤니티",
    icon: <SmileFilled />,
    desc: "함께 참여하세요!\nAirlog는 오로지 팬 문화를 위한 커뮤니티입니다"
  },
]

export default function IntroFeatureComponent() {
  const router = useRouter();

  return <Container>
    {
      Features.map(({ title, icon, desc }, index) =>
        <Card key={ index }>
          <h2 id="title">{ title }</h2>
          <button id="icon" onClick={ () => router.push("/browse") }>{ icon }</button>
          <Media greaterThanOrEqual="md" >
            <div id="desc">
              { desc.split('\n').map((line, lineNo) => <p key={ `desc-${ index }-line${ lineNo }` }>{ line }</p>) }
            </div>
          </Media>
        </Card>
      )
    }
  </Container>
}