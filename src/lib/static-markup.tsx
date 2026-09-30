import { createContext, useContext } from 'react';

/** Initial build-rendered content stays visible while the client attaches controls. */
export const StaticMarkupContext = createContext(false);
export const useStaticMarkup = () => useContext(StaticMarkupContext);
