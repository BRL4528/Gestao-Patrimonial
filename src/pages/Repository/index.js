/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  AiOutlineApartment,
  AiOutlineSearch,
  AiOutlineLoading,
  // AiFillEdit,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Menu from '../../components/Header';

import api from '../../services/api';

import Container from '../../components/Container';
import { List, Owner, Form, SubmitButton, Tab } from './styles';

export default function Repository() {
  const [detal, setDetal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patri, setPatrimonio] = useState('');
  const [novo, setNovo] = useState([]);

  const url_string = window.location.href;
  const url = new URL(url_string);
  const c = url.pathname.slice(-1);

  useEffect(() => {
    async function loadCorpo() {
      const response = await api.get('relatorio/');
      // eslint-disable-next-line array-callback-return
      const data = response.data.map((a) => {
        if (a.categoria === parseInt(c)) {
          return a;
        }
      });

      setDetal(data);
    }
    loadCorpo();
  }, [loading]);

  function handleInputChange(e) {
    setPatrimonio(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await api.get('relatorio/');
    // eslint-disable-next-line array-callback-return
    const data = response.data.find((a) => a.patrimonio === patri);
    if (data !== undefined) {
      if (data.tagConf === true) {
        toast.warn('Patrimonio já identificado');
        setLoading(false);
        return;
      }
      data.tagConf = true;
    } else {
      toast.error('Bem Não existe nos cadastro');
      setLoading(false);
      return;
    }
    toast.success('Bem Identificado');
    setNovo(data);
  }

  useEffect(() => {
    if (novo.id !== undefined) {
      // eslint-disable-next-line no-inner-declarations
      async function loadPatrimonio() {
        await api.put(`relatorio/${novo.id}`, {
          id: novo.id,
          patrimonio: novo.patrimonio,
          descricao: novo.descricao,
          danfe: '0000000',
          dataCad: '01/01/2020',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTl9MI5Fa3hrLrxzMDOxjyBLxFC2YajYasgG2c2ImJjzz6oSUj0&usqp=CAU',
          categoria: novo.categoria,
          tagConf: novo.tagConf,
        });
      }

      loadPatrimonio();
      setPatrimonio([novo.id]);
      setLoading(false);
    }
  }, [novo]);

  return (
    <>
      <Menu />
      <Container>
        <ToastContainer />
        <List>
          <Owner>
            <Link to="/">Voltar para mensagens</Link>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABYlBMVEX/////4gAUQ4oAgjcAnuL/4wD/4AAAAAAAl+AAm+EAfDkAmeEAnOH/5gAAeTr/6AAAOIUAO4YAezkAfzj54gIALYIAOobn2gnh1w0ANoQFPocAMYMAKYEALIFXcqbc3Ny5wxyQoMLw8PCZqMfS0tKurq6z2vPe5e729vYAmewAJoDm5uaRkZGEhISenp7w+f3H5PbGz+DOzs5ra2u7u7tgYGC3t7c1NTX//e/V6/n/7HtOsOf/+t7Q2OantM43W5l/krl0dHRJSUn/75X/5Tjl9Px/w+xetun/7Yf/+NKZzvD/9cBlnS2Gxu3/8qi8xtorKyv/6V///fKmuSH/6m2KrSdyoystijQ4qOX/9LhpgK4uVZZjfKxCQkKJuJKcwpGCuaXe1zux1t3/50vLyxa42dDF0GRnsbiHrCdMlDBtoSuzyXc7p8xxtLJSrMPQ1FLFz2enxYcAGH5LaaEACXgcHBx1WiD7AAAU6UlEQVR4nO1ci18axxZeEWQ3C4pRSGFBIgqugoCIGmJE1AAJqZq0aUPU3LY3vX3cvu6tzf9/z5zZx+zuLPJYY3p/+/XXVnZ2Z84358x5zD4EwYcPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz48xpMXZyePX7969er162cnb58/umt5PMWjt4+fTs3MTDGAX+9Pnt+1YN7gyclTKzmG5tSrsy/YcyuVdqNRrRY0VKuNdrtyV4IPibOnLuwMlq9eVBrVQq/T7fclWQTIDMhvKdjvnhaq7bumwsOjxzfQo3jwD3FdliKRSJAPaJEI+X6n8GnRfPR6KH6AaOgbUbTwkYz/skyBptT9dFg+G5Yfclz8dl1EEwWb7O/r6PeDEj0q6VwjstjvfQokX4xAj3L87p/gV3huBbxPtXDa7ZMlGaG6FPuFj87IhlejKJAiFDq5odN2tbcfESUJSEpi8E45Ph+ZHmLm/Rc3993o7YsyqDJylxzPRlegjifD9F8p7EMIAY77dxQrHS40GuLTiUadanw73BiVU1kmHKu3S4WP9w4iXz50UgHMffklh+JNi9FAD9xuUOzdJhU+HARD38/OLnIIhj6bnf3Mqd3hKVY6YuQOKDoITs39vHCPo6ypua8XFr6ecx4fnqJQBb8qfmR/4yQIqpqennYyCS3en56+v8hZojNnQw9X6QPFxi3yceAxV1XA5KGDSfTLe9PTXOVOzbwYfsQ+JAG3x8cBTphAVU0v/OxQYnQawTFToDhU0KDoR+SPthQr/+IIi6qannb4lOhDwpynXKQ4/KhtMRK5PU6WkTrrPI+pqWrhc5uy5t7QhjdcJU69Hn7gnvxRnE27K67/wFFH9OE9ymT2gaUVQoh2/Hu+EkdYikGpe3vENDS6oiT/yNPG3BvwM0RdC19Zmuc+J8ffcJSrY/jRC7LV13i/LEF/kAmLPMePqrr//U9AZ4H1mqEHs8SRkjV6/wE/p3s8vACiyOanvXWPUznMLILB9W94fh9VNT1H+TAnzBHO96KLwHDhJ25KN4o/7Vh02PF4WZ6KtFzb52lCU1UU0hqrT9GoUaIuefn7MSXqe8qwgOUolDHVZzwhKYPFkGasBhUMIeB7Qg7ljqdEFhVR9G6Po9EXsRTdh7yJK2ToPlHVHI0NTNSf012MZsV8Jb4aS6ie7F147Jj8hDOeiLqqtKBhRP0QifYYJuzK9UCJQanjEb9CBMvsPnVcXBHnzFAfJd5UryTIslygy9KmXCuejSFWVfSoKq5ghJD1rZLnvH0LU1XA8CugOEsDClYbWrpGz+GUiYgxBOt7lIhXSX0tmdUnp6agqtI9aGhxlkR99Clz/2YWH8nquGXi1GiJjYaCKHviSbsiMdCuGWd58mmq0hwlFlEY9ZGs4UBxrXLLxKmRslMNUkTygF87KBEDZcyda6RUVXokQL73CF80WINTCEPjV/yAMbKZdiQvdjUKsAIj4il76ISnQlSVKbphs6EFi11S5bqY6Yg3GKuiF6uwAxYqBa07B869C7uqSGCgfocGDjMZNZXLwfD7GQQVKeiBI92XIcm2RxyecNF7NheiBQZHfHCkdAxGC/r9yOR1FNn5icj2eXrCWYY02rNhQIv/JMZbisKQ4wiDUYTrykFx0k3wSiQSlPuOXt5yROOEctTqV587NDbnXibODHEjQ0dHntxG21LEaaEC19Hoq87CkKzM6QXHqjOTOyfD4V0N+Aer+xsDFclli/k1R4WcxYWVBG7a2NwKpnQ/8ZQ4fMwHgvKki7ASdNtgdtkGdpRFtJJwRj9U7j1u1B/WmQJBaX9CgiTjc7Hzp04Vfm3ft0DedPtp1s5lQJk45A4/OBmpPynBrvv+uWPycRuYk6ig7XKyUEumasFQ5QXx8JMT7InunsohV9Rli4nu5DsDA1ttWDHMflQ7GPGAYFsccJPHIRcWhv+eC9lBdfg5v4FbJg7BkGSRk69BoS/J7qWzQ1UP8abLAwe0dfj9Z3Y8wPKRUybezJBkkRN7UZynAWZgF4zu2N+bdeC+ts/txAJv53/q5nXY7pMsctI4CIhEBm1g2XypsWM/Kjgr9wZfWhAhi/Ri97Agy4OmyRYPtbA3Ojjed2A8rGAlLnlxh7QvDdyhs+Y0WBiOSdHOcGBOU8BHFTx54qQhSgMrZ1teGn1zb4EFyo64xwKPW47c/9nB0H1Dsb2PWyljlvQ9q/PtSYOrkre26im6yIA61kUH8Ph92zGHp3GtLXpkr0+KjGmhFdFqlPs3hBtefWjSpQyd0R8Zhlz2ETUsuoxYDeLzQmMHiZ6tRAredKd8kJAhypB//P5ggi6bbY19qsDxq0F7+iLdVFny9mk8YchzpeBBcbd9gs37tm1j/Oa7Oby9Ni8YchxNpYO38+T+JDGiINsYyeINVwxaiOMznHnqUGFFv1052a5ox+46uzf2N0DOMRnOTD1zKFDTHxjohDGwGxl5y4p7f3R8hkDPuUHT7ui3mye+A7ovjXwXdYCZjsyQSw8f90D9TbQANYAOR+7FuZExHsOZpye8NKaAd5tBf31Pbg52pMFJGg/2tGZIhrMsQ/KOEO99r/apJHvJjyRpkdGTBXcdfgbl3xtnPmY7PrP4mJ9lV7v0HQRYf549J9MQgzeFBye4N/IplcUH3N1e8/jMzKszford7gXRPIFf18vHSCOR0c10QMAIuSSfeHwGVp7bxjZ5JD+Cr8lIp94+lX8qBUe/k+q+El0B7B6/cKseql0ZvWfwNl6QqYjjPO7n7k757BYfv3V9j7TRiVB6Edlb89TRk8d4QHxgDWXX3bMX7m/JNk6DmnUS9d3SSyPuO/gDcDIExRkICSfPB9wzqxLtac4lcnp7D6m3xeAYWrzBTmem3j97O/A5pyqkxNrrabLcvd33YariGNuQjwZo7iZyQruwL8u69sTu7T/YXCBbyf0R81PHUyczhNvjsxtfTW+c9vGFNFL5ra///svYYo+CKj5UMmKdcjajYWpq8f3rZ2cvntx8m7pd6Jq2uS7++MtidLznLkcGPhgkyZ2R9PjoyfPnT548+mLY++9VU3mSuB789ofFaGjUp2gmAD5eCfnSLS35Rm9f1pRHbPPXb76Lkvf4xniabQIZgvRtTclrt12p9vZF+r4rVd5vvyzO0eTuoxIUyFOkyFESgx2PNNmu9rpBlp34u6Y86ps+/pckesiRkBT3J3pLvALcOn1JlPUXzyVimv/4A1Yek5l/JCdjBRTYWpySQZWFUQ0WmBV6nf2gjG/VGy/VE3bgV6xv0D4d4QkhT9Ewcw3y9YYg+UxFY2AcwXfoe6ed/b5EPxigcyPTtL7e//GbP0Jz9veDZ8Z57NkzVDtBfe0EoX7Eb3JI/f5+t9vpdE4pOp1ul34HQcYPeEgMMZ2b/Otv//3hQTTKqxnv/GMu5E14UWZlBqr4+QoTeMT2BQ8yHevr68Hff/vmP9+FCDnuA14jvAZ0m2gUOn1Z+06F26dIKHf8HMk6Yfbrj9/+9z/fwZJz4Yb83t+Ji3FDpUFch2aMls/JyNrXOyJBsN9O75cf/vgsOjc3iBrl9/TODdQF5JNAVfOTQAX4u9FoV0wfdMZ76dLB79Wnym8oPH88NbAwnpk6+ft/E+uFK8mZp87bL39TPKEf+zKIYt04aK/m74lHz1+cnRCcvR2mbvThw4cPHz58+PAxJNTz5Yurq1Zzzdm01myRppUD3nUHK62rqwvudYKwRcBpGXDRGspxsXyec7ZV9DZ1MBcechdxJTGfSs0n05fn1qbzw3SSNmXml+3XLSfiSdKWSKYPz+2NwvmfcYBiP9wMZPSL7INt6YMllPS1bUbXluJKjLTFlPgFd0IHoLkxH9CRyiwxLep1PGU0BZLKlkUeJWm2peKH9i25Q7zUeg0cVZiL0hfsYEsZZrDURou9rLXBtM1vOCZ7IFqZAIvEpdGSm5+3NAU2Vth5sbalFOvMrtH21JLl6HXMcpFiUnQMxrQJS4qt7XoEgitxFCSmKMkEVZXRcyClNylJOvxGU2/b0ggklXgyQc9LWhbPssYlzRJv4mCxtKJkFLxoQ1exmnIMljEGu6AE55PQSIWMWSduEOhUxwLNtcpak46yocl0gTImL0nTVisdYNvUOBX/6hwaz69RgnnLxCa06Y6xFoWWq6xAJ+rWZYpV8RKerxw213IwGO09rrWdp6mRLB/kKgcrCeQfbwpDAsc01Ia/5umvA+SutPSpCLAStZC9sciaaOkZxnOcE9JULeZBlYiq6GfhMtY80RaSSOtiH+CUJZvMZM0f6j50iV44pEs9ID2njMlXFWIof+LFS0S+WMs4NaeYSqygQBnT3zWR0KHZMV6NalJM3mvksrhutstKLJb8k/6iyjX1shUPgP8+ZPo23YNwjVphfMIgtMj8xE1JWxvJJRr61A2bAoRm0jA6/DPRYhpRxA1jzeVQW1uBgMXX4MQYvw8ulldWmrh4ca2kWCu/TF63mgcmIWY26USxlAcBZznAXGx0hGaWYBcRrj2qp6uUw4ckGbMC/5VEC0R3s2F6IOowlJY9fcCrFTY8MrHHrkLNQDaGevKgEjfXnQ0onGIRhVoH+evSrl86r2ZPyKRFjzK+ZpmG0Pl4esmSJF3Mu6+stYzdX2nzt8U9nXs116Jx0LhlnlrkUJpoRAk4Il2CtbOtjGZYaLwx86yUHrhTsUyqZRiB3ZRYoDElLenPlmIxmEE4cD91yVCYgRWi1gyIVclQFbFAteq2hNNDJLab35rCxPWEkdOkGD+1tmwiZ3RhUdha3KFWNwyYDDTJeSvDpOaW0GNYHI1VDeilUAK6dhltV5aYHBGCLT3KGsDWRkIHOtqmPqqNYcIThjHLIdShwZCnQ40hCpVBG3T6pLUWJOy6sSYoLVaHB2aGFjcZOnU4HEOq7tHW4RoNm4HUleX8BCMk0aemEpxDu0EdrCwpcS0129Iv0KfHzhDXoTLuOnQoQzVmG+nEnb4UPV6KURgF60sPaC6Phqb5FefQWh5IL2Gnc+uvdDqTSRoMD5wKcwYXdxC7Y2PN+V+HK5TkedKh3rhx8rXD9tjTW7YqwZDm4Ly5cmFM2poZ6FiR1TUCuiLICGomYE2XNC+YHq5KxGWSMc+9mk/F0inyW6t+mHNRDKrwFTO90XDIJB6KnaDua/5SkjEj0dVmApe6M6ehqw8Fu7TzwYQpkBiKIDVyM1BTWtSDYsdJk4WKFkdJoE2aGSb0EzeNEfsMpAyQXzSfO7T6Z7TNeXOC4mzmbjJEdTpyXpsrdwe1d33RIitNN1Roo0hTabWjWfQ1LRt0irQ00JLha1qE6Lg2+8Q8KamLhm5OUxwdLG1QPMDR4kyab1aELaYEGAK0JqVbH1u03MlUGLoBZYlordJMWipWzYbTy2jQF2nGn2ATO8MokGmMULyjcOcxZla0PY8MrlL1/DqdYoxkGXtIBHAPausQlcIUPTeBlp7z4LzitOxWdO+yRl1iKh6H7IMmlOYiolsD2KBktA0AugqxXGFLAZp0onqu6GDp1OFlhq5WRZvOnFbGw2DzaUULl1ppJVzSARTgrbWlXFI8Li6tWydJc71v2bZiQJ/mZVodbmJDM7FkwFYKYPCgvkaNabLr+alR88JZKVuHKWNbSA0kbE0JznajO5bYrag4m08fxGKWEVvsZSvs9lcgoWcdNFG2RBnKBfWxlkxYemTc8VrA4oNT6WtmpV1b+CuOjb0b0EzFcTMplVAStkRhWVFoEwQR5xZmOjmPjfNKvKWXPtdKMpm0uoGVDBzKaNNzoV+USmQurQVQM5CJEeVCkxK/so52brbFA0Pv0ZjYal3DoNctTppw3rqGlPPyaoW7H35xSK8zSzuo2wGW0yqWYxVyUSpwubTs3EY/WF4ig1k6tLXxLvPhw4eP/1+sbta966xYKnvXmUcolUredba7WRopi/kYKBc97Gx116OOaqWj7aPNLKeluOl6Ue4l9/CxRzIh3ul/rH6YqJ/NVUHI7oR5W897rjZSLG/yVkjdfUpGR9GYxFp4kn52gIV6XByxDzBGHnsH7ZGeL8ha7aK+Y4w2EUOivO2sNku1zc2iUN+Gv/JgtUc1PIhi54FT6TgPf+0eE0Vt0uGPyJEykM2VyGnbxI+u4mmI0qoxTv7YcEH1zc2ckNvJCrUdsjZqx0d4eHXnw+ZRXcgdHZOjxRKOU9wBFUzIMCuoLzU72Kxlw7naLvk7nBPKVNJ6Hk4RPtSEkpqHo6XaKhAqFcPEp+zmyf+gvV4uHsHE7AGj1XreWI17hg7LxWyYTphwBPOpquXjen73A4ywu5oL5+n0btdqQq4sbO/B0XLxuEycjbq3LRTfCRMAZCrnhWwYhwZphSKZsVwYrPAdipQTjmCOdwTiuMPFOh4rqcI2bdvZJG1ZOIOELuCrloSaERGNua/DoXfUNb5TSe9F4RjMBUYowmVHVL1oLNDvahiiKnQL1xwR5Qur25MwBLx8924nTFc2dA5WA93uCahHBCi4torShgW6VPayJU079bCwm4XfoOU6Mirn65SJuhf+AP9Qa34Jpx+jydaP9N7zOMI2XLpJzZpQqgG17J7wkppGmej4SKhPGGOzIIRKrBLG3gZ7yB+BdEfkmH5GuFgSVoGbukO1UvtgaAkuLBOdANUs/v/4yAyJuWPjLEF3/jsgNOmdOABymJj5Dp2ud6skYyDrgjTsgkiEM6zlScP+NukfFsnRplDa3cZBSuXyLri2nLZy9o6pxy7nVDgvX6yHqXsh+ADzAzZeg2P57F6utpcXVN2jZnVvSCawRjt7V4cBoHcyG9mXah06LGqeKZwrogfb1DpU6zsl8kuoTZRH5D8Q9yAch/NlsKgy9FcKb8JiB08X1n0icapq+LgEBrUTBhHV8N62niEQd5gLv9wV4KrVcEnIh3dMp2kEj70PJU3t2+Ft2juuiZJwFC7pw7zcLsOgRyWyUF/WSYf58CbpLDyRlWazuDyIwKt0RajwdzGnHUOgEanU86+q5t9GWzZHz8Z/GSs1h6npXlXvPWeMapyfwyiBo2ZVrTP85WUquONhYfBp4gMvPf2/Qlit3bUItws1/OkVZN4i62H56sOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fIyO/wHONej41er5FQAAAABJRU5ErkJggg=="
              alt="cooasgo"
            />
            <h1>
              <AiOutlineApartment />
              Quadro de Patrimônios
            </h1>
            <p>Departamento Agricola</p>
          </Owner>

          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite o numero do patrimonio"
              onChange={handleInputChange}
            />
            <SubmitButton loading={loading}>
              {loading ? (
                <AiOutlineLoading color="#FFF" size={14} />
              ) : (
                <AiOutlineSearch color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>
          {detal.map((t) => (
            <Tab key={t.id} tagConf={t.tagConf}>
              <span>{t.descricao}</span>
              <p>
                {t.tagConf ? 'Ok' : 'Atenção'}
                <label>
                  {t.tagConf
                    ? `Patrimonio: ${t.patrimonio}`
                    : 'Verificação Pendente'}
                </label>
              </p>
              <Link to={`/description/${encodeURIComponent(t.patrimonio)}`}>
                Detalhes
              </Link>
            </Tab>
          ))}
        </List>
      </Container>
    </>
  );
}
