import React, { useEffect } from 'react'
import "./Contact.css"

function Contact() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='contact'>

      <h2>Contactez-nous</h2>
      <p>Nous vous répondrons dans les plus brefs délais</p>

      <div className="contact__container">
        <form>

          <label htmlFor='fname'>Prénom</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." />

          <label htmlFor='lname'>Nom</label>
          <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

          <label htmlFor='subject'>Sujet</label>
          <input type="text" id="subject" name="subject" placeholder="Write something.." />

          <label htmlFor='message'>Message</label>
          <textarea id="message" name="message" placeholder="Write something.." style={{ height: "200px" }}></textarea>

          <input type="submit" value="Envoyer" />

        </form>
      </div>

    </div>
  )
}

export default Contact