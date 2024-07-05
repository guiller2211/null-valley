import { LuchadorData } from "../../types/luchador";

export type VotacionesProps = {
    total?: (count: number) => void;
    luchadoresData: LuchadorData[];
}