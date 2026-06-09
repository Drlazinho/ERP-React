import React from 'react';
import styles from './styles.module.css';
import LayoutNovo from '../../components/LayoutNovo';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../lotties/Maintenance.json';
import Amvoxlogopng from '../../assets/Amvoxlogopng.png';

export default function Manutencao() {
  const animationLottieOption = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <LayoutNovo>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.Lottie}>
            <Lottie options={animationLottieOption} height={150} width={150} />
          </div>

          <h1>Página em Manutenção</h1>
          <p>
            Estamos fazendo uma atualização na página, volte em algumas horas!
          </p>
          <div className={styles.buttonBox}>
            <Link to="/principal">
              <button className={styles.button}>
                Voltar para a página Principal
              </button>
            </Link>
          </div>
          <img src={Amvoxlogopng} alt="Amvox" width={100} height={100}></img>
        </div>
      </div>
    </LayoutNovo>
  );
}
