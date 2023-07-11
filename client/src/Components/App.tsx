import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import uniqid from "uniqid";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styling/App.scss";
import { BsCheckLg } from "react-icons/bs";
import { HiArrowSmallRight } from "react-icons/hi2";

interface Post {
  title: string;
  text: string;
  category: string;
  author_id: {
    username: string;
  };
  timestamp: string;
}

interface SignUpData {
  full_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  [key: string]: string; // Index signature
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [signUp, setSignUp] = useState({
    full_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  //Get 6 blogs.
  useEffect(() => {
    fetch("http://localhost:3000/api/posts/6")
      .then((res) => res.json())
      .then((dat) => setPosts(dat))
      .catch((err) => console.log(err));
  }, []);

  //Submit user information
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signUp.password.length < 8 || signUp.confirmPassword.length < 8) {
      return;
    }

    if (signUp.password !== signUp.confirmPassword) {
      return;
    }

    axios
      .post("http://localhost:3000/user/create", {
        full_name: signUp.full_name,
        username: signUp.username,
        password: signUp.password,
        confirmPassword: signUp.confirmPassword,
        email: signUp.email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("SUBMITTED");
  };

  // Store input values
  function store(e: ChangeEvent<HTMLInputElement>) {
    const new_data: SignUpData = { ...signUp };
    new_data[e.target.name] = e.target.value;
    setSignUp(new_data);
  }

  return (
    <main>
      <header className="main-container">
        <section className="main-welcome">
          <h1 className="heading">Minified Blogs</h1>
          <p className="heading-desc">
            Read, Publish, Share minified blogs <br></br>
            it takes 2 minutes to read or create.
          </p>
        </section>

        <section>
          <form className="main-form" onSubmit={(e) => formSubmit(e)}>
            <p className="form-label">Sign Up</p>
            <input
              type="email"
              placeholder="Email address"
              required
              value={signUp.email}
              onChange={(e) => store(e)}
              name="email"
            ></input>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={signUp.full_name}
              onChange={(e) => store(e)}
              name="full_name"
            ></input>
            <input
              type="text"
              placeholder="Username"
              required
              value={signUp.username}
              onChange={(e) => store(e)}
              name="username"
            ></input>
            <input
              type="password"
              placeholder="Password"
              required
              minLength={8}
              maxLength={20}
              value={signUp.password}
              onChange={(e) => store(e)}
              name="password"
            ></input>
            <input
              type="password"
              placeholder="Confirm password"
              required
              minLength={8}
              maxLength={20}
              value={signUp.confirmPassword}
              onChange={(e) => store(e)}
              name="confirmPassword"
            ></input>

            <button type="submit" className="main-form-button">
              SUBMIT
            </button>
          </form>
        </section>
      </header>

      <section className="main-blogs">
        <p className="main-blogs-heading">Recent Blogs</p>
        <Link to="/blogs" className="blogs-item-more">
          View more blogs
          <HiArrowSmallRight />
        </Link>

        <article className="blogs-grid">
          {posts.map((post) => {
            let truncText = post.text;
            if (truncText.length > 100) {
              truncText = truncText.substring(0, 100) + "...";
            }

            const formattedDate = new Date(post.timestamp).toLocaleString();

            return (
              <div className="blogs-item" key={uniqid()}>
                <div className="blogs-flex">
                  <h2 className="blogs-item-title">{post.title}</h2>
                  <p className="blogs-item-category">{post.category}</p>
                </div>

                <p className="blogs-item-description">{truncText}</p>
                <div className="blogs-flex">
                  <p className="blogs-item-author">
                    By {post.author_id.username}
                  </p>
                  <p className="blogs-item-date">{formattedDate}</p>
                </div>
              </div>
            );
          })}
        </article>

        <div className="line"></div>
      </section>

      <section className="main-description">
        <p className="description-heading">How to get started</p>

        <section className="description-flex">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/jhFDyDgMVUI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>

          <ul className="description-points">
            <li>
              <BsCheckLg /> SHORT AND CONCISE BLOGS
            </li>
            <li>
              <BsCheckLg /> INCREASED ACCESSIBILITY
            </li>
            <li>
              <BsCheckLg /> FOCUS ON KEY INFORMATION
            </li>
            <li>
              <BsCheckLg /> TIME-EFFICIENT CONTENT
            </li>
          </ul>
        </section>
      </section>

      <footer className="main-message">
        <ul className="main-message-flex">
          <li>About</li>
          <li>FAQ</li>
          <li>Help</li>
          <li>Terms</li>
          <li>Privacy</li>
        </ul>
      </footer>
    </main>
  );
}

export default App;
