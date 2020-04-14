/* eslint-disable consistent-return */
import React, { useState, useEffect, useMemo } from 'react';

import { AiOutlineApartment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import Container from '~/components/Container';
import { List } from './styles';

export default function Main() {
  const [mensagem, setMensagem] = useState([]);
  const [calc, setCalc] = useState([]);

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

  useEffect(() => {
    async function loadPendencias() {
      const response = await api.get('relatorio/');
      const { data } = response;

      // eslint-disable-next-line no-plusplus
      const v = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].tagConf !== true) {
          v.push(data[i]);
        }
      }
      setCalc(v);
    }
    loadPendencias();
  }, []);

  const size = useMemo(() => calc.length, [calc]);
  return (
    <Container size={size}>
      <h3>
        {size === 0
          ? 'Você não possui Pendências'
          : `Você posui ${size} pendências`}
      </h3>
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
