import { FormEvent } from "react";

export interface Vote {
    nickname: string;
    comment: string;
    rating: number;
}

export type VotosData = {
    votes: Vote[];
    addVote: (vote: FormEvent) => void;
};
