export const setFirstRun = (firstRun: boolean) => {
  return {
    type: 'SET_FIRST_RUN',
    payload: firstRun,
  };
};

export const setSetupComplete = (setupComplete: boolean) => {
  return {
    type: 'SET_SETUP_COMPLETE',
    payload: setupComplete,
  };
};

export const setIsAuthenticated = (isAuthenticated: boolean) => {
  return {
    type: 'SET_IS_AUTHENTICATED',
    payload: isAuthenticated,
  };
};

export const setIsNewUser = (isNewUser: boolean | undefined) => {
  return {
    type: 'SET_IS_NEW_USER',
    payload: isNewUser,
  };
};
