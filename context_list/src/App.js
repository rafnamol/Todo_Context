import React, {useMemo,useReducer } from 'react';
import './App.css'
import Content from "./Content";
 import {makeServer} from "./server.js";
import ToDoContext from './context'

function App() {
  makeServer();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "LIST":
          return {
            ...prevState,
            todosFcontext: action.value,
          };
        case "USER":
        return {
          ...prevState,
          userFcontext: action.value,
        };
        case "STATUS":
          return{
            ...prevState,
            statusFcontext: action.value,
        };
        case "LOADING":
        return {
          ...prevState,
          isLoading: action.value,
        };
        case "EDIT":
        return {
          ...prevState,
          editFcontext: action.value,
        };
        case "SELECT USER":
        return {
          ...prevState,
          selectedUser: action.value,
        };
        case "DELETE":
        return {
          ...prevState,
          deleteFcontext: action.value,
        };  
        default:
      
      }
    },
    
    {
      isLoading: 0,
      todosFcontext: {},
      userFcontext:[],
      editFcontext:{},
      selectedUser:" ",
      deleteFcontext:false,
      statusFcontext:false,
    }
  );
  
  const todoContext = useMemo(
    () => ({
      addTodo: async (data) => {
        await fetch(
            "api/todo/create",
            {
              method: "POST",
              body: JSON.stringify(
                {name:data.name, isComplete:data.isComplete}),
            }
          )
          // dispatch({type: "LOADING"});
      },

      listTodo: async (data) => {
      
          dispatch({ type: "LIST", value:data });
          console.log(state.todosFcontext)
      },

      listUser: async (data) => {
      
        dispatch({ type: "USER", value:data });
        console.log(state.userFcontext)
      },

      setIsLoading: async (data) => {

       dispatch({type: "LOADING", value:data});
      },
      editTodo: async (id) => {
        await fetch("api/todo/"+id, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }})
            .then((response) => response.json())
            .then((json) => dispatch({type: "EDIT", value:json.todo}, dispatch({type: "SELECT USER", value:json.todo.userId}, dispatch({type: "STATUS", value:json.todo.isComplete}))))
      },

      setSelectedUser: async (data) => {

        dispatch({type: "SELECT USER", value:data});
       },

      statusTodo: async (data) => {
        dispatch({type: "STATUS", value:data});
      } ,

      deleteTodo: async (id) => {
        await fetch("api/todo/"+id+"/delete", {
          method: "DELETE"
        }
        )
            .then((response) => response.json())
            .then((json) => dispatch({type: "DELETE", value:true}))
      },

      closeDeleteSnackbar: async () => {
        dispatch({type: "DELETE", value:false});
      }
    }),
    [state.todosFcontext,state.userFcontext]
  );
  

  return (
    <div className="App">
      <header className="App-header">
  <ToDoContext.Provider value={{todoContext, state, dispatch}}><Content /></ToDoContext.Provider>  
      
      </header>
    </div>
  );
}

export default App;
