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

export const toggleIsHeaderTransparent = (isHeaderTransparent: boolean) => {
  return {
    type: 'TOGGLE_HEADER_TRANSPARENT',
    payload: isHeaderTransparent,
  };
};

export const setHeaderHeight = (headerHeight: number) => {
  return {
    type: 'SET_HEADER_HEIGHT',
    payload: headerHeight,
  };
};
