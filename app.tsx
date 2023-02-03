import { useState,ChangeEvent,FC } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 
}));


interface ITask {
  name:string;
  task: string;
}

interface Props {
  taskDetails: ITask;
  completeTask(taskNameToDelete: string): void;
  editTask: (name: string, task: string) => void;
}

const TodoTask = ({ taskDetails,completeTask,editTask}: Props):any => {
  const deleteTask=()=>{
    completeTask(taskDetails.name);
  }
  return (
    <>
    <StyledTableCell>{taskDetails.name}</StyledTableCell>
    <StyledTableCell>{taskDetails.task}</StyledTableCell>
    <StyledTableCell><button onClick={deleteTask}>X</button></StyledTableCell>
    <StyledTableCell><button
          onClick={() => {
            editTask(taskDetails.name, taskDetails.task);
          }}
        >
          Edit
        </button></StyledTableCell>
    
    </>
  );
};

const App: FC = ()=>{
  const [name, setName] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [editIndex,setEditIndex]=useState<any>()

  const [show,setShow]=useState<any>(true)

  const changeName=(event: ChangeEvent<HTMLInputElement>): void =>{
    setName(event.target.value);
  }
   const changeTask=(event: ChangeEvent<HTMLInputElement>): void =>{
    setTask(event.target.value);
  }
  const addSubmit=()=>{
    const newTask = { name:name,task: task};
    setTodoList([...todoList, newTask]);
    setName(" ")
      setTask(" ")
    //console.log(todoList)
  }
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.name !== taskNameToDelete;
      })
    );
  };
  const editTask=(name:string,task:string):any=>{
    setName(name)
    setTask(task)
    setShow(false)
    
  };
  const addUpdate=():any=>{
    const newTask = {
        name,
        task
      };
  
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].name === name) {
          todoList.splice(i, 1, newTask);
          break;
        }
      }
      console.log(todoList,"k")
        setShow(true)
        setName("")
        setTask("")
  }
return(
  <div>
    <input type="text" placeholder="entername" value={name} onChange={changeName}/><br/><br/>
    <input type="text" placeholder="task" value={task} onChange={changeTask}/><br/><br/>
    {show?<button type="submit" onClick={addSubmit}>Submit</button>:
    <button type="submit" onClick={addUpdate}>Update</button>}
    <div style={{backgroundColor:"white",color:"red"}}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Task</StyledTableCell>
            <StyledTableCell >Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {todoList.map((eachTask: ITask) => (
          <StyledTableRow><TodoTask taskDetails={eachTask}  completeTask={completeTask} editTask={editTask}/></StyledTableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </div>  
)
}
export default App;
