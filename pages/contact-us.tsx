import { useState } from 'react'
import axios from 'axios'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleSend = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = formData;
    try {
      const data = await axios.post('/api/send-grid-api', {
        firstName,
        lastName,
        email,
        message,
      });

      console.log('----data----', data);
    } catch (err) {
      console.log('===err===', err);
    }
  
  }

  return (
    <div>
      <form>
        <input 
          type='text'
          placeholder='First Name'
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        />
        <input 
          type='text'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
        />
        <input 
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="textarea"
          placeholder='Message'
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
         />
         <input type='submit' onClick={handleSend} />
      </form>
    </div>
  )
}