import styled from "styled-components";
import ReservationSummary from "../components/Preview/ReservationSummary";
import SearchResult from "../components/Preview/SearchResult";
import { useEffect, useState } from "react";
import Searching from "../components/Preview/Searching.tsx";
import api from "../api.ts";
import { useRecoilState } from "recoil";
import { departureAtom, destinationAtom } from "../states/atom.ts";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const [searching, setSearching] = useState<boolean>(true)
  const [departure] = useRecoilState(departureAtom)
  const [destination] = useRecoilState(destinationAtom)
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams()
    params.append('start_poi', departure.toString())
    params.append('end_poi', destination.toString())
    api.get('/map/route', { params }).then((r) => {
      setSearching(false)
    }).catch(() => {
      navigate('/preview/noresult', { replace: true })
    })
  }, [navigate, destination, departure])
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
