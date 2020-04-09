import React, { Component } from 'react';

import { AiOutlineApartment } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar dados do local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do local storage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <AiOutlineApartment />
          Gestão Patrimonial
        </h1>
        <p>Departamento Agricola</p>
        <List>
          <li>
            <span>Conferência de Imobilizado Mensal</span>
            <Link to="/repository">Abrir</Link>
          </li>
          <li>
            <span>Patrimônio 2345 Ajustado</span>
            <Link to="/repository">Abrir</Link>
          </li>
          <li>
            <span>Transferencia do item 2345 Concluida</span>
            <Link to="/repository">Abrir</Link>
          </li>

          {/* {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))} */}
        </List>
      </Container>
    );
  }
}
