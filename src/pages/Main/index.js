/* eslint-disable consistent-return */
import React, { useState, useEffect, useMemo } from 'react';

import { AiOutlineApartment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import Container from '~/components/Container';
import { List, Header } from './styles';

export default function Main() {
  const [mensagem, setMensagem] = useState([]);
  const [calc, setCalc] = useState([]);
  const [solit, setSolit] = useState([]);

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

  useEffect(() => {
    async function loadSolicitações() {
      const response = await api.get('solicitacao/');
      const { data } = response;

      // eslint-disable-next-line no-plusplus
      const v = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].situação === 'aberta') {
          v.push(data[i]);
        }
      }
      setSolit(v);
    }
    loadSolicitações();
  }, []);
  const msg = useMemo(() => solit.length, [solit]);
  const size = useMemo(() => calc.length, [calc]);

  return (
    <Container msg={msg} size={size}>
      <Header>
        <h3>
          {size === 0
            ? 'Você não possui Pendências'
            : `Você posui ${size} pendências`}
        </h3>
        <h2>
          {msg === 0
            ? 'Você não possui Solicitações abertas'
            : `Você posui ${msg} solicitações abertas`}
        </h2>
      </Header>
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
