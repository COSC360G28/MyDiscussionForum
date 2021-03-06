import "./App.scss";
import { useEffect, useState } from "react";
import { NewPost, Main, Login, Post, User, SignUp, Logout, ForgotPassword } from "./pages/";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./Contexts.js";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/account`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
        console.log("User not logged in");
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={[user, setUser]}>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/post/:id" exact>
              <Post />
            </Route>
            <Route path="/user/:id" exact>
              <User />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <Route path="/newPost" exact>
              <NewPost />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
