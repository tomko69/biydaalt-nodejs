import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo"><span>Т</span>Блог</Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="create">Шинэ нийтлэл оруулах</Link>
            <a className="logout" onClick={logout}>Гарах ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login" >Нэвтрэх</Link>
            <Link to="/register" className="register" >Бүртгүүлэх</Link>
          </>
        )}
      </nav>
    </header>
  );
}
