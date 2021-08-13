
import React, { useState, useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField, FormControl,FormHelperText, Grid, List, ListItem, Paper, Button, Switch} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ToDoContext from './context';

const useStyles = makeStyles(theme => ({ 
paper: {
    width:'500px',
    textAlign: 'center',
    borderRadius: '10pt 10pt 4pt 4pt' 
 },
header:{
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 6px #00000029',
    padding: '20px 24px 15px',
    // border: '1px solid #eeeeee',
    fontWeight: '600', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px 10px 0px 0px'
  },
grids:{
    padding: '0px 7px 0px 0',
    lineHeight: 2
  },
button: {
    minWidth: "150px",
    fontWeight: 600,
    border: 2,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '6px',
    margin: "33px"
  },
helperText:{
    marginTop:"-65px"
  },  
selectForm: {
    width: '100%'
  },
gridField: {
    margin: '15px',
  },
  
}));

const AddTask = ({todos, setTodos, handleClose} ) => {
  const {todoContext, state} = useContext(ToDoContext)
  const [inputText, setInputText] = useState("");
  const [user,setUser]= useState("")
  const [todoStatus, setTodoStatus]= useState(false);
  const classes = useStyles();
  
 const handleSubmit = (e) => {
    e.preventDefault();
    todoContext.addTodo({name:inputText, isComplete: todoStatus, user:user});
    todoContext.setIsLoading(state.isLoading+1);
    setInputText(" ");
    handleClose();
}

const inputTextHandler = (e) => {
   console.log(e.target.value)
   setInputText(e.target.value);
};
const inputUserHandler = (e) => {
  console.log(e.target.value)
  setUser(e.target.value);
};


const statusHandler = (e) => {
  if (todoStatus){
    setTodoStatus(false)
  }
  else {
    setTodoStatus(true)
  }
  
}

  return (
    <Grid> 
      <Paper  className={classes.paper}>
      <div className={classes.header}>
            <span>Add Task</span>
            </div>
          <List>
            <ListItem>
               
                    <Grid item xs={12} className={classes.gridField}>
                        <FormControl className={classes.selectForm}>
                          <TextField id="outlined-basic"
                            size="small" 
                             value={inputText}
                            onChange={inputTextHandler}
                            variant="outlined" />
                        </FormControl>
                        <FormHelperText className={classes.helperText}>Project Name</FormHelperText>
                    </Grid>                
               
            </ListItem>
            <ListItem> 
             <Grid item xs={12} md={6} className={classes.gridField} style={{marginTop:"77px"}}>
                  <FormControl className={classes.selectForm}>
                  <Autocomplete
                    id="user-field"
                    freeSolo
                    value={user}
                    options={state.userFcontext.map((user,key) => user.firstName +" "+ user.lastName ) }
                    renderInput={(params) => (
                      <TextField {...params} 
                          // label="User" 
                          onChange={inputUserHandler}
                          variant="outlined"
                          fullWidth
                          size= "small" />
                    )}
                  />
                  </FormControl>
                  <FormHelperText className={classes.helperText}>User</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} style={{marginTop:"90px"}}>
                    <FormControlLabel
                                value="completed"
                                size= "small"
                                onChange={statusHandler}
                                control={<Switch color="primary" />}
                                />
                    <FormHelperText className={classes.helperText}>Completed</FormHelperText>      
              </Grid>
          </ListItem>
          </List> 
          <div>
              <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
              >
                  Save
              </Button>
          </div>
          {/* {todos.map((todo) => <div>{todo.text}</div>

          )} */}
      </Paper>
    </Grid>  
  );
};
export default AddTask;
