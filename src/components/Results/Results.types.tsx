import { LuchadorData } from "../../types/luchador"

export type ResultsProps = {
  winner: LuchadorData[];
  onReset?: () => void;
  isLoading?: boolean;
}