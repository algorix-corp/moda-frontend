import styled from "styled-components";
import ReservationSummary from "../components/Preview/ReservationSummary";
import SearchResult from "../components/Preview/SearchResult";

export default function Preview() {
  return (
    <Container>
      <SearchResult/>
      <ReservationSummary/>
    </Container>
  );
}

const Container = styled.div``;
