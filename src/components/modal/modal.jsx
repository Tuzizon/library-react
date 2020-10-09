// ARQUIVO DO MODAL

import React, {useState} from 'react';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const initialSaveForm = {
  title: undefined,
  author: undefined,
  gender: undefined,
  year: undefined,
};

const ModalSave = props => {


  const [saveForm, setSaveForm] = useState (initialSaveForm);
  const [saveModal, setSaveModal] = useState (false);
  const [isEdit, setIsEdit] = useState (false);



  const changeForm = (key, value) => {
    let form = {...saveForm};
    form[key] = value;
    setSaveForm (form);
  };
  const saveBook = async () => {    
      try {
        if (isEdit) {
          const book = {
            title: saveForm.title,
            author: saveForm.author,
            gender: saveForm.gender,
            year: saveForm.year,
          };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            };
            fetch('https://library-arthur.herokuapp.com/books', requestOptions)
                .then(response => response.json())
                .then(console.log('ok'));
            setIsEdit (false);
        } else {
            debugger
            const book = {
                title: saveForm.title,
                author: saveForm.author,
                gender: saveForm.gender,
                year: saveForm.year,
              };
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book)
                };
                fetch('https://library-arthur.herokuapp.com/books', requestOptions)
                    .then(response => response.json())
                    .then(console.log('ok'));
          setSaveModal (false);
        }
      } catch (err) {
        console.log ('error:', err);
      }
  };

  const onToggle = () => {
    setSaveModal (!saveModal);
    setSaveForm (initialSaveForm);
    setIsEdit (false);
  };

//   const onOpenUpdate = () => {
//     setSaveForm ({
//       name: props.currentScreen.name,
//       tags: props.currentScreen.tags.map (tag => {
//         return {id: tag, text: tag};
//       }),
//       asBookmark: false,
//       description: props.currentScreen.description,
//       shareWithCompany: props.currentScreen.companyId ? true : false,
//     });
//     setSaveModal (true);
//     setIsEdit (true);
//   };

  return (
    <div>
      

    </div>
  );
};

export default ModalSave