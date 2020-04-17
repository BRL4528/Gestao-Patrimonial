import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Wrapper, Content } from '../_layouts/auth/styles';

// import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/img/2.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrogatória'),
});

export default function SingIn() {
  // const dispatch = useDispatch();
  // const loading = useSelector((state) => state.auth.loading);

  // function handleSubmit({ email, password }) {
  //   dispatch(signInRequest(email, password));
  // }
  return (
    <>
      <Wrapper>
        <Content>
          <img src={logo} alt="GoBarber" />

          <Form schema={schema} onSubmit={() => {}}>
            <Input name="email" type="email" placeholder="Seu e-mail" />
            <Input
              name="password"
              type="password"
              placeholder="Sua senha secreta"
            />

            <button type="submit">Acessar</button>
            <Link to="/dashboard">Criar conta gratuita</Link>
          </Form>
        </Content>
      </Wrapper>
    </>
  );
}
