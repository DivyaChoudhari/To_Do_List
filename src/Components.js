import React,{useState,useEffect} from "react";
import { Button,Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import axios from "axios";



function Components(){
    
  const[task,setTask] = useState([]);
    
  const handleTaskChange = (event) =>{
      const value = event.target.value;
      setTask(value);
    }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Your entered task is : ${task}`);
  };

  useEffect(() => {
    const fetchData = async () =>{

      try {
        const data = await axios.get('http://localhost:8080/api/todos',{headers:{
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}});
        console.log("After fetch data ",data)
        setTask(data);
      } catch (error) {
        console.error(error.message);
      }

    }

    fetchData();
  }, []);

    return(
    <div>
      <div class="input-group">
      
      <textarea class="form-control" aria-label="With textarea" placeholder="Enter your task here!" onChange={handleTaskChange}></textarea>

      <br></br>
      </div>
      <br></br>
      <br></br>  
        <form onSubmit = {handleSubmit} >
          <Button type="submit" color="success" size="lg">
            Add task!
          </Button>
        </form>
      <br></br>
      <br></br>

    <Table>
  <thead>
    <tr>
      <th>No</th>
      <th>TO DO</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">
        1
      </th>
      <td>
        <input placeholder='To do something task 1'></input>     
      </td>
      <td>
      <Button color="danger" size="lg"  >
      delete    </Button>      </td>
      <td>
      <Button color="primary" size="lg" >
      edit    </Button>      </td>
    </tr>
  </tbody>
</Table>
</div>
    );
}

export default Components;