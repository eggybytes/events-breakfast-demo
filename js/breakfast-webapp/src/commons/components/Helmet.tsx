import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

interface Props {
  title: string;
  description: string;
}

// Helmet provides <title> and <meta> tags for all our screens
const Helmet = ({ title, description }: Props) => {
  return (
    <ReactHelmet>
      <title>{title === 'eggy' ? title : `${title} · eggy`}</title>
      <meta name="description" content={description} />
    </ReactHelmet>
  ); 
};

export default Helmet;
