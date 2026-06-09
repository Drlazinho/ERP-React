import styled, { keyframes } from 'styled-components';

export const InputFile = styled.div`
  input[type='file']::file-selector-button {
    background-color: #e5e5e5;
    color: #000;
    padding: 5px 10px;
    margin-right: 20px;
    transition: 0.5s;
    border-radius: 8px;
  }

  input[type='file']::file-selector-button:hover {
    background-color: #eee;
  }
`;

const grow = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(2);
  }
`

const pulse = keyframes`
  	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;

export const ButtonAddAnexoInactive = styled.button`
  background-color: #ffc107;
  padding: .5rem;
  border: none;
  border-radius: 4px;
`;

export const ButtonAddAnexo = styled.button`
  background-color: #ffc107;
  padding: .5rem;
  border: none;
  border-radius: 4px;
  animation: ${ pulse} 1s ease-in-out infinite;
`;