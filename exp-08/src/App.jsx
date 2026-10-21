
import {useState} from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import "./App.css";

function Home(){
  return <div className="card">
    <h2>Welcome to RoboPulse</h2>
    <p>Explore Artificial Intelligence and Robotics.</p>
    <Link className="btn" to="/register">Join Community</Link>
  </div>;
}

function Register(){
  const [form,setForm]=useState({
    name:"",email:"",password:"",age:"",mobile:"",gender:"",state:""
  });
  const [done,setDone]=useState(false);

  const update=e=>{
    setForm({...form,[e.target.name]:e.target.value});
    setDone(false);
  };

  const errors={
    name:!/^[A-Za-z ]+$/.test(form.name.trim()),
    email:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password:!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age:!/^\d+$/.test(form.age)||+form.age<18||+form.age>30,
    mobile:!/^\d{10}$/.test(form.mobile)
  };

  const valid=form.name.trim()&&!errors.name&&
    !errors.email&&!errors.password&&!errors.age&&
    !errors.mobile&&form.gender&&form.state;

  const submit=e=>{
    e.preventDefault();
    if(valid)setDone(true);
  };

  return <div className="card">
    <h2>Join RoboPulse</h2>
    <form onSubmit={submit} noValidate>
      <label>Full Name</label>
      <input name="name" placeholder="Your name" value={form.name} onChange={update} required/>
      {form.name&&errors.name&&<small>Use letters and spaces only.</small>}

      <label>Email</label>
      <input name="email" placeholder="Email address" value={form.email} onChange={update} required/>
      {form.email&&errors.email&&<small>Enter a valid email.</small>}

      <label>Password</label>
      <input name="password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={update} required/>
      {form.password&&errors.password&&<small>Use uppercase, lowercase and a number.</small>}

      <label>Age (18–30)</label>
      <input name="age" type="number" value={form.age} onChange={update} required/>
      {form.age&&errors.age&&<small>Age must be 18–30.</small>}

      <label>Mobile Number</label>
      <input name="mobile" value={form.mobile} onChange={update} placeholder="10-digit number" required/>
      {form.mobile&&errors.mobile&&<small>Enter exactly 10 digits.</small>}

      <label>Gender</label>
      <select name="gender" value={form.gender} onChange={update} required>
        <option value="">Select gender</option>
        <option>Male</option><option>Female</option><option>Other</option>
      </select>

      <label>State</label>
      <select name="state" value={form.state} onChange={update} required>
        <option value="">Select state</option>
        <option>Tamil Nadu</option><option>Kerala</option>
        <option>Karnataka</option><option>Andhra Pradesh</option>
      </select>

      <button disabled={!valid}>Register</button>
      {done&&<p className="success">Welcome to RoboPulse! Registration successful.</p>}
    </form>
  </div>;
}

function App(){
  return <BrowserRouter basename="/web-tech-lab/exp-08">
    <header>
      <h1>RoboPulse</h1>
      <p>AI & Robotics Community</p>
      <nav><Link to="/">Home</Link><Link to="/register">Registration</Link></nav>
    </header>
    <main><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes></main>
    <footer>© 2026 RoboPulse | AI & Robotics</footer>
  </BrowserRouter>;
}
export default App;
