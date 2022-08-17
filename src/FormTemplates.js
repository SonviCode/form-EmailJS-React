import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const FormTemplates = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMess = document.querySelector('.form-message');

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE,
        process.env.REACT_APP_TEMPLATES,
        form.current,
        process.env.REACT_APP_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          formMess.innerHTML = "<p class='sucess'>Message envoyé !</p>";
          setTimeout(()=> {
            formMess.innerHTML ="";
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          formMess.innerHTML = "<p class='error'>Une erreur s'est produite, veuillez réessayer</p>";
          setTimeout(()=> {
            formMess.innerHTML ="";
          }, 2500);
        }
      );
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>

        <h1>Envoyez-moi un message !</h1>
        
        <input type="text" name="name" required autoComplete="off" placeholder="Nom"/>
        
        <input type="email" name="email" required autoComplete="off" placeholder="Email"/>
        
        <textarea name="message" required placeholder="Message"/>
        <input type="submit" value="Envoyer" />

      <div className="form-message">

      </div>
      </form>

    </div>
  );
};

export default FormTemplates;
