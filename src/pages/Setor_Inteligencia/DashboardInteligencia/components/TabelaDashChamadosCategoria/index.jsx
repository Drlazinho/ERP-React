import { Typography } from '@mui/material';

function TabelaDashChamadosCategoria({ data }) {
  if (!data || data.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível...</Typography>;
  }
  const dadosTransformados = data.map((item) => (item.mediaEmDIas || 0) * 100);

  const dados = [
    {
      cor: '#4BACC6',
      valores: Array(data.length).fill((0.9 * 100).toFixed(2)),
    },
    {
      cor: '#2C4D75',
      valores: dadosTransformados,
    },
  ];

  const categorias = data.map((item) => item.categoria || 'Categoria');

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
      >
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th
              style={{
                padding: '8px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ddd',
                borderRight: '1px solid rgba(221, 226, 228, 0.40)',
              }}
            >
              Índice
            </th>
            {categorias.map((categoria, index) => (
              <th
                key={index}
                style={{
                  padding: '8px',
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {categoria}
              </th>
            ))}
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody>
          {dados.map((linha, rowIndex) => (
            <tr key={rowIndex}>
              <td
                style={{
                  borderRight: '1px solid rgba(221, 226, 228, 0.40)',
                  textAlign: 'center',
                  padding: '8px',
                  borderBottom: '1px solid rgba(221, 226, 228, 0.40)',
                }}
              >
                <div
                  style={{
                    backgroundColor: linha.cor,
                    height: 20,
                    width: 20,
                    borderRadius: '50%',
                    margin: 'auto',
                  }}
                />
              </td>
              {linha.valores.map((valor, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    borderBottom: '1px solid rgba(221, 226, 228, 0.40)',
                  }}
                >
                  {Number(valor).toFixed(2)}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaDashChamadosCategoria;
