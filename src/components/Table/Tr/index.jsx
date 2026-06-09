import React from 'react';
//import LayoutNovo from '../components/LayoutNovo'
import styles from './styles.css';

const Tr = ({ index, children }) => {
  return (
    //<LayoutNovo>
    <div className="home">
      <tr
        className={`${index % 2 == 0 ? styles.par : styles.impar} ${styles.tr}`}
      >
        {children}
      </tr>
    </div>
    //</LayoutNovo>
  );
};

export default Tr;
