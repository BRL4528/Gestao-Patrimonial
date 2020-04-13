/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';

import { AiOutlineApartment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import Container from '~/components/Container';
import { List } from './styles';

export default function Main() {
  const [mensagem, setMensagem] = useState([]);

  useEffect(() => {
    async function loadMensagem() {
      const response = await api.get('mensagem/');
      // eslint-disable-next-line array-callback-return
      const data = response.data.map((a) => {
        if (a.assunto === 'patrimonio') {
          return a;
        }
      });

      setMensagem(data);
    }
    loadMensagem();
  }, []);
  return (
    <Container>
      <h1>
        <AiOutlineApartment />
        Gestão Patrimonial
      </h1>
      <p>Departamento Agricola</p>
      <List>
        {mensagem.map((msg) => (
          <li key={msg.id}>
            <span>{msg.title}</span>
            <Link to={`/repository/${encodeURIComponent(msg.categoria)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
