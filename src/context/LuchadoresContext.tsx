import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useReducer, useMemo, useContext } from 'react';

import type { Dispatch } from 'redux';
import { CommentsData } from '../types/luchador';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../services';
import { Context, LuchadorProviderProps } from './LuchadoresContext.types';
import { INITIAL_STATE, slice } from './LuchadoresContext.slice';

export const LuchadorContext = createContext<Context>({} as Context);

export const LuchadorProvider = (props: LuchadorProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);

  const actions = bindActionCreators(slice.actions, dispatch as Dispatch);

  const value = useMemo(() => {
    const luchadorValue: Context = {
      ...state,
      actions,
      agregarComentario: async (luchadorId: string, voto: CommentsData) => {
        try {
          const luchadorRef = doc(db, "luchador", luchadorId);
          await updateDoc(luchadorRef, {
            votes: arrayUnion(voto)
          });
        } catch (error) {
          console.error('Error al añadir voto:', error);
        }
      },
      resetVotaciones: async () => {
        try {
          const luchadoresRef = collection(db, 'luchador');

          const snapshot = await getDocs(luchadoresRef);
          snapshot.forEach(async (luchadorDoc) => {
            const luchadorId = luchadorDoc.id;
            const luchadorRef = doc(db, 'luchador', luchadorId);

            await updateDoc(luchadorRef, {
              votes: []
            });

          });

        } catch (error) {
          console.error('Error al reiniciar votaciones:', error);
          throw error;
        }
      }
    };

    return luchadorValue;
  }, [actions, state]);

  return <LuchadorContext.Provider value={value}>{children}</LuchadorContext.Provider>;
};

export const useLuchador = () => useContext(LuchadorContext);
