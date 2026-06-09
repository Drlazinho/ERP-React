import React from 'react';
//import LayoutNovo from '../components/LayoutNovo'
import styles from './styles.css';

const Td = ({ children }) => {
  return (
    // <LayoutNovo>
    <div className="home">
      <td className={styles.td}>{children}</td>;
    </div>
    //</LayoutNovo>
  );
};

export default Td;
