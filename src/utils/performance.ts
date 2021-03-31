import { performance } from 'perf_hooks';

export default async (promise: Promise<any>, identifier) => {
  const timeStart = performance.now();
  const result = await promise;
  const timeEnd = performance.now();

  const timeElapsed = timeEnd - timeStart;
  const timeElapsedToSeconds = (timeElapsed / 1000).toFixed(2);

  console.log(`Call to ${identifier} took ${timeElapsedToSeconds} seconds.`);
  return result;
};