import { ReactNode } from "react";
import { CommentsData, LuchadorData } from "../types/luchador";
import { slice } from "./LuchadoresContext.slice";
import { CaseReducerActions } from "@reduxjs/toolkit";

export type CaseReducers = typeof slice.caseReducers;

export type Context = LuchadorData & {
  actions: CaseReducerActions<CaseReducers, 'luchador'>;
  agregarComentario: (luchadorId: string, comentario: CommentsData) => void;
  resetVotaciones: () => void;
};


export type LuchadorProviderProps = {
  children: ReactNode;
  initialState?: LuchadorData;
};
