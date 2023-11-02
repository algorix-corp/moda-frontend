import ReserveSuccess from "../components/Reservation/ReserveSuccess.tsx";
import ReservationSummary from "../components/Preview/ReservationSummary.tsx";
import { useRecoilState } from "recoil";
import { resultdataAtom } from "../states/atom.ts";

export default function Reserve() {
  const [data] = useRecoilState(resultdataAtom)
  return (
    <>
      <ReserveSuccess/>
      <ReservationSummary data={data}/>
    </>
  );
}
