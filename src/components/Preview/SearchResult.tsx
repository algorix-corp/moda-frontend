import styled from "styled-components";
import {Directions} from "../../dummy.ts";

export default function SearchResult() {
  return (
    <Container>
      <Text>모다가 <span>최적</span>의 경로를 찾았어요.</Text>
      {
        Directions.map((direction, index) => {
          return (
            <div key={ index }>
              <p>{ direction }</p>
            </div>
          )
        }
        )
      }
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px - 94px - 185px);
  padding: 20px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  
  & > span {
    color: var(--primary);
  }
`;
