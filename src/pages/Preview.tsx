import styled from "styled-components";
import ReservationSummary from "../components/Preview/ReservationSummary";
import SearchResult from "../components/Preview/SearchResult";
import { useEffect, useState } from "react";
import Searching from "../components/Preview/Searching.tsx";

export default function Preview() {
  const [searching, setSearching] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setSearching(false)
    }, 1000)
  }, [])
  if(searching) {
    return (
      <Container>
        <Searching/>
      </Container>
    )
  } else {
    return (
      <Container>
        <SearchResult/>
        <ReservationSummary/>
      </Container>
    );
  }
}

const Container = styled.div``;
