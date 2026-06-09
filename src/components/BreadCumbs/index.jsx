import { Container } from './styles';
import React from 'react';
import Card from './components/Card';
import CardInspecao from './components/CardInspecao';

export default function BreadCrump({
  name1,
  date1,
  idImage1,
  name2,
  date2,
  idImage2,
  name3,
  date3,
  idImage3,
  name4,
  date4,
  idImage4,
  verticalStack,
  breadToInspecao,
  toMobile,
}) {
  return (
    <>
      <Container verticalStack={verticalStack}>
        <Card
          name={name1}
          idImage={idImage1}
          date={date1}
          verticalStack={verticalStack}
          breadToInspecao={breadToInspecao}
        />
        {toMobile ? (
          <CardInspecao
            name={name2}
            idImage={idImage2}
            date={date2}
            verticalStack={verticalStack}
            breadToInspecao={breadToInspecao}
          />
        ) : (
          <Card
            name={name2}
            idImage={idImage2}
            date={date2}
            verticalStack={verticalStack}
            breadToInspecao={breadToInspecao}
          />
        )}

        <Card
          name={name3}
          idImage={idImage3}
          date={date3}
          verticalStack={verticalStack}
        />
        <Card
          name={name4}
          idImage={idImage4}
          date={date4}
          verticalStack={verticalStack}
          breadToInspecao={breadToInspecao}
        />
      </Container>
    </>
  );
}
