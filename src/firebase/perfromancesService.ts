import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "./firebaseConfig"

export const getPerformances = async (): Promise<{firstPerformance: string, secondPerformance: string}> => {
    const firstPerformanceRef = ref(storage, 'performances/performance_01.mp4');
    const secondPerformanceRef = ref(storage, 'performances/performance_02.mp4');

    const firstPerformance = await getDownloadURL(firstPerformanceRef);
    const secondPerformance = await getDownloadURL(secondPerformanceRef);

    return {
        firstPerformance,
        secondPerformance
    }
}