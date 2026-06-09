import './styles.css';
import XisAnimado from '../../assets/xisAnimado.gif';

function Loading() {
  return (
    <div className="loader_container">
      <img src={XisAnimado} alt="Xis Animado" />
      <p className="colorText">Carregando....</p>
      <div class="dot-bricks"></div>
    </div>
  );
}
export default Loading;
