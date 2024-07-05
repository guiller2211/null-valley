// luchador.data.tsx
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from '../services';
import { getDownloadURL, ref } from "firebase/storage";
import { LuchadorData } from '../types/luchador';

export async function getLuchadores(): Promise<LuchadorData[]> {
  const luchadoresSnapshot = await getDocs(collection(db, "luchador"));
  const luchadoresData = await Promise.all(luchadoresSnapshot.docs.map(async (doc) => {
    const data = doc.data() as LuchadorData;
    const imageUrl = await getDownloadURL(ref(storage, data.image.fullPath));

    return {
      ...data,
      id: doc.id,
      image: {
        ...data.image,
        fullPath: imageUrl
      }
    };
  }));

  return luchadoresData;
}
