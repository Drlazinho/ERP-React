import React from 'react';
//import LayoutNovo from '../components/LayoutNovo'
import styles from './styles.css';

const Th = ({ width, children }) => {
  return (
    //<LayoutNovo>
    <div className="home">
      <th className={styles.th} style={{ width: `${width}px` }}>
        {children}
      </th>
    </div>
    //</LayoutNovo>
  );
};

export default Th;
