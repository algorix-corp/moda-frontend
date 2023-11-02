import styled from "styled-components";
import ReservationSummary from "../components/Preview/ReservationSummary";
import SearchResult from "../components/Preview/SearchResult";
import { useEffect, useState } from "react";
import Searching from "../components/Preview/Searching.tsx";
//import api from "../api.ts";
import { useRecoilState } from "recoil";
import { departureAtom, destinationAtom } from "../states/atom.ts";
import { useNavigate } from "react-router-dom";
import api from "../api.ts";

export default function Preview() {
  const [searching, setSearching] = useState<boolean>(true)
  const [departure, setDeparture] = useRecoilState(departureAtom)
  const [destination, setDestination] = useRecoilState(destinationAtom)
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(undefined)

  const search = () => {
    const params = new URLSearchParams()
    params.append('start_poi', departure.toString())
    params.append('end_poi', destination.toString())
    api.get('/map/route_drt', { params }).then((r) => {
      setData(r.data)
      console.log(r.data)
      setSearching(false)
    }).catch(() => {
      navigate('/preview/noresult', { replace: true })
    })
  }

  useEffect(() => {
    if(departure === -1 || destination === -1) {
      // get lat, lon from geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const params_geo = new URLSearchParams()
        params_geo.append('lat', lat.toString())
        params_geo.append('lon', lon.toString())
        api.get('/map/reverse_geocoding', { params: params_geo }).then((r) => {
          if(departure === -1) {
            setDeparture(r.data.poi)
          }
          if(destination === -1) {
            setDestination(r.data.poi)
          }
        }).catch(() => {
          navigate('/preview/noresult', { replace: true })
        })
      })
    } else {
      search()
    }
  }, [navigate, destination, departure, setSearching, setDeparture, setDestination])
  if(searching) {
    return (
      <Container>
        <Searching/>
      </Container>
    )
  } else {
    return (
      <Container>
        <SearchResult data={data}/>
        <ReservationSummary data={data}/>
      </Container>
    );
  }
}

const Container = styled.div``;
