
'use strict';

const { useState } = React;
const { useEffect } = React;
const { Route } = ReactRouterDOM;
const { Switch } = ReactRouterDOM;
const { Link } = ReactRouterDOM;



// const { Routes } = ReactRouterDOM.Routes;


function form() {

    const [inputs, setInputs] = useState(
        {
            'firstName':'',
            'lastName':'',
            'email':'',
            'phone':'',
            'books':'',
            'os':''
        }
    );

    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name in Object.keys(inputs)){
            inputs[name] = value;
        }else{
            setInputs(values => ({...values, [name]: value}))
        }
      }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        var csvSubmission = Object.values(inputs).join(",");
        console.log(csvSubmission);

        await fetch("http://localhost:5001/record/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"submission": csvSubmission}),
        })
        .catch((err) => console.error(err));

        window.location.reload(false);
    };

        
    return (
        <div method="POST" >
            <h1>Register Form</h1>
            <p>Please fill in all fields and click Register</p>
            <h2>User Information</h2>
            First Name: 
            <input 
                type="text" 
                name="firstName"
                value={inputs.firstName || ""} 
                onChange={handleChange} 
            /><br/>
            
            
            Last Name: 
            <input 
                type="text" 
                name="lastName" 
                value={inputs.lastName || ""} 
                onChange={handleChange} 
            /><br/>
            
            Email: 
            <input 
                type="text" 
                name="email"
                value={inputs.email || ""} 
                onChange={handleChange}  
            /><br/>
            
            Phone: 
            <input 
                type="text" 
                name="phone" 
                placeholder="123-456-7890"
                value={inputs.phone || ""} 
                onChange={handleChange}  
            /><br/>
            
            <h2>Publications</h2>
            <p>Which book would you like Information about?</p>

            <select 
                name="books" 
                id="book-select"
                value={inputs.book}
                onChange={handleChange}
            >
                <option value="noSelection">--Select--Book--</option>
                <option value="Brave New World">Brave New World</option>
                <option value="The Martian">The Martian</option>
                <option value="Hitchhikers Guide To the Galaxy">Hitchhikers Guide To the Galaxy</option>
            </select>

            <h2>Operating System</h2>
            <p>Which operating system do you use?</p>
            
            <div onChange={handleChange}>
                Windows 
                <input 
                    type="radio"
                    value="windows" 
                    name="os"
                />

                Mac OS X 
                <input 
                    type="radio" 
                    value="macosx" 
                    name="os"
                />

                linux 
                <input 
                    type="radio"
                    value="linux"
                    name="os"
                />

                other 
                <input 
                    type="radio" 
                    value="other" 
                    name="os"
                /><br/>

                <button 
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

const Form = form;

var Data = () => {
    
    const [data,setData] = useState([]);

    useEffect(() => { 
        
        const getData = async () => {
            fetch("http://localhost:5001/record/data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(data => setData(data.record));
        }

        getData();
        return;
    },[]);

    // // const res = getData();

    // // console.log(res);
    const listItems = data.map((number,index) => <li key={index}>{number}</li>);
    return <div>
            <ul>
                {listItems}
            </ul>
        </div>; 

    
};

const App = () => {
    return <div>
                <Form/>
                <Data/>
            </div>;
}




const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>
);
