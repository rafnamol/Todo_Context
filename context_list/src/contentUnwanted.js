// import React from 'react';
import React, { useState , useEffect, useContext,} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Button, Grid, Typography, List, ListItem, Paper,FormHelperText, Dialog,FormControlLabel, Switch,TextField,IconButton } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AddTask from "./AddTask";
import ToDoContext from './context';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 1000,
    textAlign: 'center',
    borderRadius: '10pt 10pt 4pt 4pt' 
 },
  header:{
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 6px #00000029',
    padding: '20px 24px 15px',
    fontWeight: '600', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px 10px 0px 0px'
  },
  // grids:{
  //   lineHeight: 2
  // },
  helperText:{
    marginTop:"-62px"
  },
  button: {
    minWidth: "150px",
    fontWeight: 600,
    border: 2,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '6px',
    margin: "21px"
  },
}));

const Content = () => {

  const [open, setOpen] = React.useState(false);
   const [ todos, setTodos] = useState([]);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleFilter = () => {
  //   let filtered = todos.filter(task => {
  //     return !task.complete;
  //   });
  //   setTodos(filtered);
  // }
 
  const {addTodo, listTodo, state} = useContext(ToDoContext)
  useEffect(() => {
    fetch("api/todos", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then((response) => response.json())
      .then((json) => console.log("hi"))
      
  }, [])




  function deleteUser()
  {
    fetch("api/todo/:id/delete",
    {
      method:'DELETE'
    }).then((result)=>{
      result.json().then((resp)=>{
        console.warn(resp)
      })
    })
  }
  return (
     <Grid>
          <Paper className={classes.paper}> 
                <div className={classes.header}>
                  <span>List</span>
                </div>
                <Grid container spacing={2} style={{ margin: "25px"}}>
                    <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                fullWidth
                                size= "small"
                                // value= {todos}
                                variant="outlined" />  
                                <FormHelperText className={classes.helperText}>Project Name</FormHelperText>     
                    </Grid> 

                    <Grid item xs={3}>
                    <TextField
                                id="standard-select-currency-native"
                                select
                                fullWidth
                                size= "small"
                                labelPlacement="top"
                                variant="outlined"
                                SelectProps={{
                                    native: true,
                                }}
                                >
                                {state.todosFcontext.map((todo) => (
                                    <div key={todo.value} value={todo.value}>
                                    </div>
                                ))}
                            </TextField>
                            <FormHelperText className={classes.helperText}>User</FormHelperText>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControlLabel
                                value="completed"
                                size= "small"
                                control={<Switch color="primary" />}
                                />
                    <FormHelperText className={classes.helperText}>Completed</FormHelperText>      
                    </Grid>
                </Grid>

              <Paper style={{margin:"85px 25px 22px", border: "1px solid black"}}>
              <List component="nav" aria-label="Locations">
                <ListItem>
                    <Grid item container direction="row"
                              justify="space-between"
                              alignItems="center">
                          <Grid item xs={3}>
                            <Typography>Name</Typography>
                            {todos.map((todo) => <div>{todo.text}</div>

                                )}
                          </Grid>
                          <Grid item  xs={3}>
                            <Typography>User</Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography>Completed</Typography>
                          </Grid>
                          <Grid item  xs={3}>
                            <Typography>Actions</Typography>
                          </Grid>
                    </Grid>
                  </ListItem>
                  
                  <ListItem>
                    <Grid container item >
                      <Grid item direction="column" xs={3}>
                        <Grid item className={classes.grids}>
                        </Grid>
                      </Grid>
                      <Grid item direction="column" xs={3}>
                        <Grid item className={classes.grids}>
                        </Grid>
                      </Grid>
                      <Grid item  direction="column" justify="center" xs={3}>
                        <Grid item className={classes.grids}>
                          <IconButton onClick={()=>deleteUser()}><CheckCircleOutlineIcon/></IconButton>
                          
                        </Grid>
                      </Grid>
                      <Grid item  direction="column" justify="center" xs={3}>
                        <Grid item className={classes.grids}>
                            <IconButton ><CancelIcon/></IconButton>
                            <IconButton><EditIcon/></IconButton> 
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
              </List>
        </Paper>
        <Grid  container
                direction="row"
                justify="flex-end"
                alignItems="flex-end">
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Task
            </Button>
          </Grid>
			</Paper>  
      <Dialog aria-labelledby="max-width-dialog-title" open={open}
              style={{ backgroundColor: '#aef1eb54' }}
              PaperProps={{ classes: { root: classes.dialog } }}
              // onClose={handleClose}
        >
          <AddTask todos={todos}  handleClose={handleClose}/>
      </Dialog> 
		  </Grid>
  );
};

export default Content;
// const submitTodoHandler = (e) => {
//   e.preventDefault();
//   setTodos([
//       ...todos,
//       {text: inputText, completed: false, id: Math.random() * 1000}
//   ]);
//   setInputText(" ");
//   handleClose();
// }