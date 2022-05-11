import React from 'react';
import { Container, Text, MapContainer } from './styles';
import { FlexCol } from '../../Wrapper/styles';
import { contact } from '../../../utils/data/companyInfo';

const CompanyInfo = () => {
  return (
    <Container>
      <MapContainer>
      <iframe
              title="墊一店位置"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3619.2419265821673!2d121.2877846!3d24.8897282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468183d2e30c5a3%3A0xbebe3263ff84f24b!2zMzM1LCBUYW95dWFuIENpdHksIERheGkgRGlzdHJpY3QsIOaciOa5lui3rzEyOOiZnw!5e0!3m2!1sen!2stw!4v1643314926097!5m2!1sen!2stw"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: "none", aspectRatio: "1/1" }}
        />
      </MapContainer>
      <FlexCol>
        {
          Object.values(contact).map((item, index)=> <Text key={index}>{`${item.name}：${item.value}`}</Text>)
        }
      </FlexCol>
    </Container>
  )
}

export default CompanyInfo