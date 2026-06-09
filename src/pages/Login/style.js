import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: #e9e9e9; */
  background-color: #141414;
  height: 100vh;
  /* padding: .5rem; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgb(233 233 233 / 10%),
      rgb(233 233 233 / 50%)
    ),
    url(/static/media/logo_amvox_2d.8278d8d3.png);
  /* background-size: 400px; 
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: left -10% bottom -20%; */
  position: relative;

  @media (max-width: 500px) {
    height: 100dvh;
  }
`;

export const ContentForm = styled.div`
  padding: 1rem;
  width: 30%;

  .text-secondary {
    color: '#8c8c8c';
  }

  /* .boxForm {
    display: flex;
    flex-direction: column;
    background-color: #000;
    border-radius: 10px;
    width: 90%;
  }

  .revisao {
    position: absolute;
    font-size: .8rem !important;
    bottom: 1rem;
  } */

  img {
    min-width: 8%;
    width: 100%;
  }

  form {
    width: 100%;
    margin: 1rem 2rem 1rem;
  }

  .logo {
  }

  .header {
    margin: 1rem 2rem 1rem;

    h1 {
      font-weight: bold;
    }

    p {
    }
  }

  /* form {
    input {
    width: 50%;
  }
  } */

  button {
    margin-top: 1rem;
    /* width: 80%; */
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

export const ContentImg = styled.div`
  width: 70%;
  height: 100%;

  .mySwiper {
    height: 100%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .swiper-slide img {
    /* border-radius: 10px; */
    width: 100%;
    height: 100%;
    filter: brightness(78%);
    object-fit: cover;
  }

  .swiper-slide h1 {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0%;
    padding: 8rem 1.5rem 4.5rem 1.5rem;
    text-align: left;
    color: #ffffff;
    background: linear-gradient(
      to bottom,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 75%),
      rgb(0 0 0 / 100%)
    );

    span {
      font-size: 2rem;
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const CarrouselModalLogin = styled.div`
  width: 30%;
  height: 50%;

  .mySwiper {
    height: 100%;

    .swiper-pagination {
      display: none;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;
