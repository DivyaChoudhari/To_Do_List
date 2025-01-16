import React,{useState,useEffect} from "react";
import { Button,Table,Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import axios from "axios";



function Components(){
   
  const[task,setTask] = useState([]);
  const[text,setText] = useState('');
  const[edit,setEdit] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
   
  const handleTaskChange = (event) =>{
      const value = event.target.value;
      setText(value);
    }
 
  const handleSubmit = (event) => {
      event.preventDefault();
      // const value = event.target.value;
       insertTask(text);
      console.log(`Your entered task is : ${task}`);
  };

  const insertTask = async (task) => {
    if (task == null || task === "" || task.length >= 100) {
      console.log("task is empty")
      setAlertVisible(true);
      return;
    }
 
    try {
      console.log("task----------->",task);
      const data = await axios.post('http://localhost:8080/api/todos', {
        "task": task
      });
      console.log("data--",data.data)
      setTask((task) => [...task, data.data]); // Correct state update
      //  setTask([...task]);
    } catch (error) {
      console.error(error.message);
  }
  setAlertVisible(false);
}
  const deleteTask = async (id) => {
    console.log("id",id)  
    const data = await axios.delete('http://localhost:8080/api/todos', {data:{
      "id":id}
    });
    setTask(task.filter((task) => task.id !== id));
    console.log("task after deletion",task)
  }

const saveTask = async (id) => {
  console.log("id",id)
  console.log("task",task)
  const data = await axios.put('http://localhost:8080/api/todos', {
    "task": edit,"id":id
  }).catch((error) => {
    console.error(error.message);
  });
 
}
  useEffect(() => {
    const fetchData = async () =>{
     
      try {
        const data = await axios.get('http://localhost:8080/api/todos',{headers:{
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}});
        console.log("After fetch data ",data.data)
        setTask(data.data);
        console.log("data--",task)
      } catch (error) {
        console.error(error.message);
      }

    }
    fetchData();
  }, []);

    return(
    <div>
      <div class="input-group">
     
      <textarea class="form-control" aria-label="With textarea" onChange={handleTaskChange} placeholder="Enter your task here!" ></textarea>

      <br></br>
      </div>
      <br></br>
      <Alert color="danger" isOpen={alertVisible} toggle={() => setAlertVisible(false)}>
        Hey! Text cannot be empty and cannot be more than 100 characters.
      </Alert>
      <br></br>  
        <form onSubmit = { handleSubmit}>
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
  {task.map((task) => {
     
          return (
            <tr>
            <td >
              {task.id}
            </td>
            <td>
              <input defaultValue={task.task} readOnly = {false} onChange={ (event) => { setEdit(event.target.value); console.log("Edited text ")}}></input>    
            </td>
            <td>
            <Button color="danger" size="lg" key={task.id} onClick={()=>{deleteTask(task.id)}}  >
            delete    </Button>      </td>
            <td>
            <Button color="primary" size="lg" key={task.id} onClick={()=>{saveTask(task.id)}}  >
            save    </Button>    
             </td>
          </tr>
          );
        })}
       
  </tbody>
</Table>
</div>
    );
}

export default Components;