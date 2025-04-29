// src/pages/CreateAccount.jsx
import { useState } from 'react';

export default function CreateAccount() {
  const [form, setForm] = useState({
    firstName:'', lastName:'', username:'', jerseyNumber:''
  });
  const onChange = e=>
    setForm({...form, [e.target.name]: e.target.value});

  return (
    <form style={{maxWidth:'400px', margin:'0 auto'}}>
      <div style={{
        background:'#111 url(/assets/jersey-bg.jpg) center/cover',
        padding:'2rem', borderRadius:'1rem', textAlign:'center',
        marginBottom:'1.5rem'
      }}>
        <h2>RAFASYA 10</h2>
        <h3>FC 433 WANTS TO SIGN YOU</h3>
      </div>
      {['firstName','lastName','username','jerseyNumber'].map(name=>(
        <div key={name} style={{marginBottom:'1rem'}}>
          <label style={{display:'block', marginBottom:'.25rem', fontWeight:600}}>
            {name==='username'? 'Select Username*' :
             name==='jerseyNumber'? 'Jersey Number*' :
             name==='firstName'? 'First Name*' :
             'Last Name*'}
          </label>
          <input
            name={name}
            value={form[name]}
            onChange={onChange}
            style={{
              width:'100%', padding:'.5rem 1rem',
              borderRadius:'.5rem', border:'none',
              background:'#222', color:'#fff'
            }}
          />
        </div>
      ))}
      <button type="submit" style={{
        width:'100%', padding:'.75rem',
        background:'#ff0', color:'#000', border:'none',
        borderRadius:'1rem', fontWeight:700
      }}>
        Create Account
      </button>
    </form>
  );
}
