import '../lib/amplify';
import { getVideoUrl } from './storageService';

const FIRST_PERFORMANCE_KEY = 'performances/performance_01.mp4';
const SECOND_PERFORMANCE_KEY = 'performances/performance_02.mp4';

export const getPerformances = async () => {
  const [firstPerformance, secondPerformance] = await Promise.all([
    getVideoUrl(FIRST_PERFORMANCE_KEY, 3600, 'guest'),
    getVideoUrl(SECOND_PERFORMANCE_KEY, 3600, 'guest'),
  ]);

  return {
    firstPerformance,
    secondPerformance,
  };
};
