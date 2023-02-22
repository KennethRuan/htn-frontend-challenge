import React from 'react';
import RootElement from './src/components/rootElement';

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};