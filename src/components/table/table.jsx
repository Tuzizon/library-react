import React from 'react'
import { Table } from 'reactstrap';
import {Edit, Trash} from 'react-feather';

const BookTable = props => (
  <Table hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Título</th>
        <th>Autor</th>
        <th>Gênero</th>
        <th>Ano</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {props.books.length > 0 ? (
        props.books.map(book => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.gender}</td>
            <td>{book.year}</td>
            <td>
              <Edit
                onClick={() => {
                  props.editRow(book)
                }}
                className="button muted-button"
                style={{cursor: "pointer"}}
              />
              <Trash
                onClick={() => props.deleteBook(book.id)}
                className="button muted-button"
                style={{cursor: "pointer"}}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>Nenhum livro encontrado</td>
        </tr>
      )}
    </tbody>
  </Table>
)

export default BookTable