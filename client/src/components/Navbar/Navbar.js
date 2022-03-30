import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp*1000 < new Date().getTime())  
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null);
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src="/images/memories-Text.png" alt="icon" height="45px" />
        <img className={classes.image} src="/images/memories-Logo.png" alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
          {user ? (
              <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>              
              </div>
          ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
