import styled from 'styled-components';
import logoAmvox2d from '../../assets/logo_amvox_2d.png';

export const Container = styled.div`
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 50%),
      rgb(255 255 255 / 75%)
    ),
    url(/static/media/logo_amvox_2d.8278d8d3.png);
  background-size: 400px;
  background-repeat: no-repeat;
  background-position: left -10% bottom -20%;
`;

export const ContentForm = styled.div`
  padding: 1rem;
  width: 40%;

  img {
    width: 150px;
  }

  form {
    margin: 2rem 0 0 0;
  }

  .logo {
  }

  .header {
    margin: 2rem 0 0 0;

    h1 {
      font-weight: bold;
    }

    p {
    }
  }

  form input {
    width: 80%;
  }

  button {
    margin-top: 1rem;
    width: 80%;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    .header {
      text-align: center;
    }

    form input {
      width: 100%;
    }

    button {
      margin-top: 1rem;
      width: 100%;
    }
  }
`;

export const Overlay = styled.div`
.return-app-button {
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  background-color: rgba(255, 0, 0, 0.247);
  padding: 1rem;
  width: fit-content;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.247);
  color: aliceblue;
  display: flex;
  transition: linear .2s;
  z-index: 999;
}

.return-app-button:hover{
  background-color: rgb(255, 0, 0);
  border: 4px solid rgb(0, 0, 0);
  cursor: pointer;
}
`;

export const Carrousel = styled.div`
  .mySwiper {
    width: 100%;
  }

  .mySwiper_slide {
    height: 90vh;
  }
`;