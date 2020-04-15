import React, { useState, useEffect } from 'react';

import { AiOutlineLoading, AiOutlineCloseCircle } from 'react-icons/ai';

import { toast, ToastContainer } from 'react-toastify';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  List,
  Owner,
  Form,
  SubmitButtonCommit,
  SubmitButtonLow,
  SubmitButtonTransfer,
  SubmitButtonNf,
  Tab,
  Operadores,
} from './styles';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Description() {
  const [loading, setLoading] = useState('');
  const [bem, setBem] = useState([]);
  const [msg, setMsg] = useState('');
  const [tipo, setTipo] = useState('');

  const url_string = window.location.href;
  const url = new URL(url_string);
  const c = url.pathname.replace('/description/', '');

  useEffect(() => {
    async function loadBem() {
      const response = await api.get('relatorio/');
      const data = response.data.find((a) => a.patrimonio === c);
      setBem(data);
    }
    loadBem();
  }, []);

  // "id": 1,
  //   "tipo": 1,
  //   "body": "Está faltando placa patrimonial em uma cadeira",
  //   "data": "27/03/2020",
  //   "situacao": "aberta"

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('solicitacao/', {
      tipo,
      body: msg,
      patrimonio: bem.patrimonio,
      data: new Date(),
      situação: 'aberta',
    });
    setLoading(false);
    toast.success('Sua solicitação foi encaminhada para Adiministração.');
  }

  function handleOpenMsg(e) {
    e.preventDefault();
    // eslint-disable-next-line default-case
    switch (e.target.value) {
      case 'commit':
        setLoading('commit');
        setTipo(1);
        break;
      case 'low':
        setLoading('low');
        setTipo(2);
        break;
      case 'transfer':
        setLoading('transfer');
        setTipo(3);
        break;
    }
  }

  function handleClose() {
    setLoading('');
    setMsg('');
  }

  function handleSendMsg(e) {
    setMsg(e.target.value);
  }

  return (
    <Container>
      <ToastContainer />
      <List>
        <Owner loading={loading}>
          <Link to="/repository/1">Voltar para Lista patrimonial</Link>
          <img src={bem.url} alt="patrimonio" />
          <h1>{bem.descricao}</h1>
          <p>{`Data Cad: ${bem.dataCad}`}</p>
          <p>{`patrimonio: ${bem.patrimonio}`}</p>
          <div>
            {loading === 'commit' ? (
              <>
                <AiOutlineCloseCircle
                  onClick={handleClose}
                  color="black"
                  size={17}
                />
                <strong>Mensagem</strong>
                <form onSubmit={handleSubmit}>
                  <p>
                    Este campo é destinado para a retirada de duvidas e
                    solicitações, como por exemplo, uma nova placa patrimonial
                    ou informar alguma avaria, em relação a somente este bem.{' '}
                  </p>
                  <textarea onChange={handleSendMsg} type="text" />
                  <button type="submit">Enviar</button>
                </form>
              </>
            ) : (
              ''
            )}
            {loading === 'low' ? (
              <>
                <AiOutlineCloseCircle
                  onClick={handleClose}
                  color="black"
                  size={17}
                />
                <strong>Mensagem</strong>
                <form onSubmit={handleSubmit}>
                  <p>
                    Nos diga o motiva da baixa deste item, que iremos analisar
                    sua solicitação
                  </p>
                  <textarea onChange={handleSendMsg} type="text" />
                  <button type="submit">Enviar</button>
                </form>
              </>
            ) : (
              ''
            )}
            {loading === 'transfer' ? (
              <>
                <AiOutlineCloseCircle
                  onClick={handleClose}
                  color="black"
                  size={17}
                />
                <strong>Mensagem</strong>
                <form onSubmit={handleSubmit}>
                  <p>Para onde?</p>
                  <textarea onChange={handleSendMsg} type="text" />
                  <button type="submit">Enviar</button>
                </form>
              </>
            ) : (
              ''
            )}
          </div>
        </Owner>
        <Operadores>
          <Form loading={loading}>
            <SubmitButtonCommit
              value="commit"
              onClick={handleOpenMsg}
              loading={loading}
            >
              Comentar
            </SubmitButtonCommit>
            <SubmitButtonLow
              value="low"
              onClick={handleOpenMsg}
              loading={loading}
            >
              Baixar bem
            </SubmitButtonLow>
            <SubmitButtonTransfer
              value="transfer"
              onClick={handleOpenMsg}
              loading={loading}
            >
              Transferir
            </SubmitButtonTransfer>
            <SubmitButtonNf loading={loading}>Nota Fiscal</SubmitButtonNf>
          </Form>
        </Operadores>
        <h4>Hitórico Movimentação</h4>
        <Tab>
          <span>
            Transferencia realizada no dia 23/01/2015, destinação Setor Agricola
          </span>
          <Link to="/description">Detalhes</Link>
        </Tab>
        <Tab>
          <span>
            Transferencia realizada no dia 23/01/2015, destinação Setor Agricola
          </span>
          <Link to="/description">Detalhes</Link>
        </Tab>
      </List>
    </Container>
  );
}
