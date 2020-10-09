import React, { useEffect, useState } from "react";
import "./App.css";
import BookTable from "./components/table/table";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Navbar,
} from "reactstrap";
import { SearchBox } from "./components/search-box/search-box";
import Loader from "react-loader-spinner";

function App() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [saveForm, setSaveForm] = useState({
    title: '',
    author: '',
    gender: '',
    year: '',
  });
  const [saveModal, setSaveModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeForm = (key, value) => {
    let form = { ...saveForm };
    form[key] = value;
    setSaveForm(form);
  };
  const saveBook = async () => {
    try {
      if (isEdit) {
        setLoading(true);
        const book = {
          title: saveForm.title,
          author: saveForm.author,
          gender: saveForm.gender,
          year: saveForm.year,
        };
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        };
        fetch(
          `https://library-arthur.herokuapp.com/books/${saveForm.id}`,
          requestOptions
        )
          .then((response) => response.text())
          .then();
        setIsEdit(false);
        setSaveModal(false);
        clearForm();
        setTimeout(() => {
          findAll();
          setLoading(false);
        }, 500);
      } else {
        setLoading(true);
        const book = {
          title: saveForm.title,
          author: saveForm.author,
          gender: saveForm.gender,
          year: saveForm.year,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        };
        fetch("https://library-arthur.herokuapp.com/books", requestOptions)
          .then((response) => response.text())
          .then();
        setSaveModal(false);
        clearForm();
        setTimeout(() => {
          findAll();
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const onToggle = () => {
    setSaveModal(!saveModal);
    setIsEdit(false);
  };

  const clearForm = async () => {
    setSaveForm({
      id: '',
      title: '',
      author: '',
      gender: '',
      year: '',
    });
  }

  const findAll = async () => {
    fetch("https://library-arthur.herokuapp.com/books")
      .then((res) => res.json())
      .then(
        (result) => {
          setBooks([...result]);
          setAllBooks(result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  const deleteBook = async (id) => {
    setLoading(true);
    fetch(`https://library-arthur.herokuapp.com/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then();
    setTimeout(() => {
      findAll();
      setLoading(false);
    }, 500);
  };

  const editRow = (book) => {
    setSaveModal(true);
    setIsEdit(true);
    setSaveForm({
      id: book.id,
      title: book.title,
      author: book.author,
      gender: book.gender,
      year: book.year,
    });
  };

  let searchField = "";
  const handleChange = (e) => {
    searchField = e.target.value;
    const filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchField.toLowerCase())
    );
    if (searchField && searchField !== "") {
      setBooks(filteredBooks);
    } else {
      findAll();
    }
  };

  useEffect(() => {
    findAll();
  }, []);

  return (
    <div>
      <Container>
        <Navbar className="navbar text-white">{"Biblioteca"}</Navbar>
        <Row>
          <Col>
            <SearchBox
              placeholder="Procurar Livro"
              handleChange={handleChange}
            ></SearchBox>
          </Col>
          <Col className="text-right btnSave">
            <Button
              color="secondary"
              size="sm"
              onClick={() => setSaveModal(true)}
            >
              {"Novo Livro"}
            </Button>
          </Col>
        </Row>
        <BookTable books={books} deleteBook={deleteBook} editRow={editRow} />
      </Container>
      <Modal isOpen={saveModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>{"Salvar Livro"}</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Título</label>
              <input
                className="form-control"
                type="text"
                placeholder="Título"
                value={saveForm.title}
                onChange={(e) => changeForm("title", e.target.value)}
              />
              <label>Autor</label>
              <input
                className="form-control"
                type="text"
                placeholder="Autor"
                value={saveForm.author}
                onChange={(e) => changeForm("author", e.target.value)}
              />
              <label>Gênero</label>
              <input
                className="form-control"
                type="text"
                placeholder="Gênero"
                value={saveForm.gender}
                onChange={(e) => changeForm("gender", e.target.value)}
              />
              <label>Ano</label>
              <input
                className="form-control"
                type="number"
                placeholder="Ano"
                value={saveForm.year}
                onChange={(e) => changeForm("year", e.target.value)}
              />
            </div>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={saveBook}>
            Salvar
          </Button>
          <Button color="secondary" onClick={onToggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader
            type="ThreeDots"
            color="rgb(58, 70, 99);"
            height="50"
            width="50"
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;