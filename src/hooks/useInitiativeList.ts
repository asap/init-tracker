import { InitiativeRowEntity } from "../components/InitiativeRow";
import useLocalStorage from "./useLocalStorage";

export default function useInitiativeList() {
  const [initiativeList, setInitiativeList] = useLocalStorage<
    InitiativeRowEntity[]
  >("init-tracker", []);

  return [initiativeList, setInitiativeList] as [
    InitiativeRowEntity[],
    (value: InitiativeRowEntity[]) => void,
  ];
}
