import React from "react";

export default function Register() {
  return (
    <div className="main-from">
      <div className="background">
        <div className="shape-register"></div>
        <div className="shape-register"></div>
      </div>
      <form className="form-register">
        <h3>Register Here</h3>

        <label className="label-register" htmlFor="username">
          Username
        </label>
        <input
          className="input-register"
          type="text"
          placeholder="Enter Username"
          id="username"
        />
        <label className="label-register" htmlFor="email">
          Email
        </label>
        <input
          className="input-register"
          type="text"
          placeholder="Enter Email"
          id="email"
        />

        <label className="label-register" htmlFor="password">
          Password
        </label>
        <input
          className="input-register"
          type="password"
          placeholder="Enter Password"
          id="password"
        />
        <label className="label-register" htmlFor="confirmPassword">
          Confirm Pasword
        </label>
        <input
          className="input-register"
          type="text"
          placeholder="Enter confirm password"
          id="confirmPassword"
        />
        <div className="links">
          {/* 'Forgot Password' link */}
          <div className="forgot-password">
            <a href="#">Are have an account? Login here.</a>
          </div>
        </div>

        <button className="button-register" type="submit">
          Register 
        </button>
      </form>
    </div>
  );
}
