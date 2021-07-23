import React from 'react';
import {Card, CardContent,TextField, CardActions, Button, Grid }from "@material-ui/core";


const Header = () => {
    return (
     <Grid>
        <Card>
           
          <CardContent>
              <header>
                  <h1>To Do List</h1>
              </header>
            <Grid>
            <div>
              <TextField
                // required
                // label="Username"
                // value={username}
                // onChange={(event) => setUserName(event.target.value)}
              ></TextField>
            </div>
            <div>
              <TextField
                // required
                // InputProps={{
                //   required: true,
                // }}                
                // label="Password"
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
              ></TextField>
            </div>
            </Grid>
            <form >
            <input  type="text"  placeholder="Enter task..."/>
            <button>Submit</button>
        </form>
          </CardContent>
          <CardActions>
            <div>
              <Button
                variant="contained"
                color="primary"
                // onClick={(event) => authenticate(event)}
              >
                Log in
              </Button>
            </div>
          </CardActions>
          
        </Card>
        </Grid>
        
    );
};

export default Header;