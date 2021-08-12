import React, {useEffect, useContext} from 'react';
import ToDoContext from './context';
import { makeStyles } from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {Button, Grid, Table, TableBody, TableCell, TableRow,TableHead,Snackbar
  ,FormControl, Paper,FormHelperText, Dialog,FormControlLabel, Switch,TextField,IconButton,Select,MenuItem } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AddTask from "./AddTask";

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
  helperText:{
    marginTop:"-62px"
  },
  font:{
    fontWeight:'600'
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

const Content =  () => {
  const [open, setOpen] = React.useState(false);
  const {todoContext, state} = useContext(ToDoContext)
  useEffect( () => {
    
      fetch("api/todos", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }})
        .then((response) => response.json())
        .then((json) => todoContext.listTodo(json.todos)) 
  }, [state.isLoading])

  useEffect( () => {
    fetch("api/users", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then((response) => response.json())
      .then((json) => todoContext.listUser(json.users))
  },[] )

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectUser = (e) => {
    todoContext.setSelectedUser(e.target.value)
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const statusHandler = (e) => {
    if (e.target.checked === true){
      todoContext.statusTodo(true)
    }
    else {
      todoContext.statusTodo(false)
    } 
    // todoContext.statusTodo(e.target.value)
  }

  const classes = useStyles();   
  const lsp = Object.values(state.todosFcontext);
  console.log("list",lsp)
return (
<div>
<Grid>
  <Paper className={classes.paper}> 
    <div className={classes.header}>
          <span>List</span>
    </div>
    <Grid container spacing={2} style={{ margin: "25px"}}>
       <Grid item xs={4}>
        <FormControl>
                  <TextField
                      // label="Project Name" 
                      variant="outlined"
                      value={state.editFcontext.name}
                      fullWidth
                      size= "small" /> 
                      <FormHelperText className={classes.helperText}>Project Name</FormHelperText>    
        </FormControl>
        </Grid>
        <Grid item xs={4}>
            {/* <Autocomplete
                    id="user-field"
                    value={state.editFcontext.userId}
                    // freeSolo
                    // options={state.userFcontext.map((user,key) => user.firstName + user.lastName ) }
                    options={state.userFcontext}
                     getOptionLabel={(option) => option.firstName + option.lastName}
                    renderInput={(params) => (
                      <TextField {...params} 
                          label="User" 
                          variant="outlined"
                          
                          fullWidth
                          size= "small" />
                    )}
                  /> */}
                          

                  <Select
                    labelId="user-field"
                    id="demo-simple-select"
                    value={state.selectedUser}
                    onChange={handleSelectUser}
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={{ height: 38}}
                  >
                    
                   {state.userFcontext.map((user,key) => 
                   <MenuItem style={{width:"none"}} value={user.id}>{user.firstName+ " " + user.lastName}</MenuItem> ) }
                  </Select>
                  <FormHelperText className={classes.helperText}>User</FormHelperText>
                  </Grid>
                  <Grid item xs={4}>
                              <FormControlLabel
                                          value="true"
                                          size= "small" 
                                          control={<Switch 
                                          onChange={statusHandler}
                                          checked={state.statusFcontext}
                                          color="primary" />}
                                />
                              <FormHelperText className={classes.helperText} style={{marginLeft: "114px"}}>Completed</FormHelperText>      
                              </Grid>
                              {/* <p>{state.statusFcontext ? "true" : "false"}</p> */}
    </Grid>
    <Paper style={{margin:"85px 25px 22px", border: "1px solid black"}}>
        <Table>
            <TableHead>
              <TableRow >
                <TableCell className={classes.font}>Name </TableCell>
                <TableCell className={classes.font}>User</TableCell>
                <TableCell className={classes.font}>completed</TableCell>
                <TableCell className={classes.font}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lsp.map(row =>
                      <TableRow >
                        <TableCell>{row.name} </TableCell>
                        <TableCell>{row.user} </TableCell>
                        <TableCell align='center'>{(row.isComplete === true) ? <CheckCircleOutlineIcon/> : <HighlightOffIcon/> }</TableCell>
                        <TableCell><IconButton onClick={()=>todoContext.deleteTodo(row.id)}><CancelIcon/></IconButton><IconButton  onClick={()=>todoContext.editTodo(row.id)}><EditIcon/></IconButton></TableCell> 
                      </TableRow>
              )}  
            </TableBody>
          </Table>
  
    </Paper>
    <Grid container
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
  <Snackbar open={state.deleteFcontext} autoHideDuration={6000} onClose={todoContext.closeDeleteSnackbar}>
        <Alert onClose={todoContext.closeDeleteSnackbar} severity="success">
          This list has been deleted !!
        </Alert>
      </Snackbar>
  <Dialog aria-labelledby="max-width-dialog-title" open={open}
              style={{ backgroundColor: '#aef1eb54' }}
              PaperProps={{ classes: { root: classes.dialog } }}
              // onClose={handleClose}
        >
          <AddTask handleClose={handleClose}/>
      </Dialog>  
  </Grid>
</div>
);
}
export default Content;