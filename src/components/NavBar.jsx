import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase";

const initialUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const NavBar = () => {
  const auth = getAuth(app);
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          navigate("/login");
        } else if (user && pathname === "/login") {
          console.log("logindgsagina");
          navigate("/");
        }

        return () => {
          unsubscribe();
        };
      },
      [pathname]
    );

    return () => {};
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");
        setUserData(null);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUserData(res.user);
        localStorage.setItem("userData", JSON.stringify(res.user));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt="Poke Logo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/login" ? (
        <Login onClick={handleAuth}>LOGIN</Login>
      ) : (
        <SignOut>
          {userData?.photoURL && (
            <UserImg src={userData.photoURL} alt="user photo" />
          )}
          <Dropdown>
            <span onClick={handleLogout}>LOGOUT</span>
          </Dropdown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const UserImg = styled.img`
  border-radius: 50%;
  width: 80%;
  height: 80%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  background: rgba(255, 246, 194, 1);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(255 246 194 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: #333333;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
const Login = styled.a`
  background-color: rgba(255, 246, 194, 0.5);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 3px solid #333333;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: #333333;

  &:hover {
    background-color: rgba(255, 246, 194, 0.5);
    color: #333333;
    border-color: transparent;
  }
`;

const Image = styled.img``;

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;

  img {
    width: 100%;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
  background-color: ${(props) =>
    props.show ? "rgba(255,246,194,0.5)" : "#fff6c2"};
`;

export default NavBar;
