import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoIosContact } from "react-icons/io";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  #iconContato{
    width: 25%;
    height: 25%;
    color: #fff;
  }

  #tituloContato{
    color: #fff;
  }
`;

const Title = styled.h2``;

function App() {
  const [contatos, setContatos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getContatos = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setContatos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getContatos();
  }, [setContatos]);

  return (
    <>
      <Container>
      <IoIosContact id="iconContato"/>
        <Title id="tituloContato">Contatos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getContatos={getContatos} />
        <Grid setOnEdit={setOnEdit} contatos={contatos} setContatos={setContatos} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;