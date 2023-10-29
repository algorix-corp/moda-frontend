import styled from 'styled-components';
import { places } from '../dummy';

export default function PlaceList() {
  return (
    <Container>
      {places.map((place, index) => (
        <PlaceGroup key={index}></PlaceGroup>
      ))}
    </Container>
  );
}

const Container = styled.div``;

const PlaceGroup = styled.div``;
