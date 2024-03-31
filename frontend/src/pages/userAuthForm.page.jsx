import React from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px] ">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          {type === "sign-in" ? "Welcome back" : "Join us today"}
        </h1>

        {type != "sign-in" ? (
          <InputBox
            name="fullname"
            type="text"
            id="name"
            placeholder="Full Name"
            icon="fi-rr-user"
          />
        ) : (
          ""
        )}

        <InputBox
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          icon="fi-rr-envelope"
        />

        <InputBox
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          icon="fi-rr-lock"
        />

        <button className="btn-dark center mt-14 px-14">
          {type.replace("-", " ")}
        </button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black"></hr>
          <p>or</p>
          <hr className="w-1/2 border-black"></hr>
        </div>

        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
          <img src={googleIcon} alt="Google Icon" className="w-5" />
          Continue with Google
        </button>

        {type == "sign-in" ? (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black text-xl ml-1">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Already have an account?
            <Link to="/signin" className="underline text-black text-xl ml-1">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
