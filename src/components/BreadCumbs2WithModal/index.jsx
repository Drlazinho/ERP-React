import React from 'react';
import Card from './components/Card';

import { Container } from './styles';

export default function BreadCrump2({
  date1,
  idImage1,
  date2,
  idImage2,
  date3,
  idImage3,
  date4,
  idImage4,
  btnToModalCheck1,
  btnToModalCheck2,
  btnToModalCheck3,
  btnToModalCheck4,
  readOnly,
}) {
  return (
    <>
      <Container>
        <Card
          name={'生產'}
          idImage={idImage1}
          date={date1}
          modalResolution={btnToModalCheck1}
          readOnly={readOnly}
        />
        <Card
          name={'檢查'}
          idImage={idImage2}
          date={date2}
          modalResolution={btnToModalCheck2}
          readOnly={readOnly}
        />
        <Card
          name={'運輸'}
          idImage={idImage3}
          date={date3}
          modalResolution={btnToModalCheck3}
          readOnly={readOnly}
        />
        <Card
          name={'正在加載'}
          idImage={idImage4}
          date={date4}
          modalResolution={btnToModalCheck4}
          readOnly={readOnly}
        />
      </Container>
    </>
  );
}
