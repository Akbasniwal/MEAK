import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext({});

export function AuthState(props) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  // const HOST = "https://meak-server-akbasniwal.vercel.app";
  const HOST = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${HOST}/user`).then((response) => {
      setId(response.data._id);
      setUser(response.data.username);
    });
  }, [id, user]);

  const registerUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(e.target.files);
    return 0;

    axios
      .post(`${HOST}/register`, {
        username,
        email,
        password,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.error) {
          return response.data;
        }
        setUser(response.data.username);
        setId(response.data.id);
        // console.log(user, id, response.data);
        navigate("/");
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email);
    axios
      .post(`${HOST}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.error) {
          return response.data;
        }
        // console.log(response);
        setUser(response.data.username);
        setId(response.data.id);
        navigate("/");
      });
  };

  const logout = async () => {
    axios.post(`${HOST}/logout`).then((response) => {
      setUser(null);
      setId(null);
      navigate("/");
    });
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, id, user, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
