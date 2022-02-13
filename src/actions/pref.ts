export const setFirstRun = (firstRun: boolean) => {
  return {
    type: 'SET_FIRST_RUN',
    payload: firstRun,
  };
};
