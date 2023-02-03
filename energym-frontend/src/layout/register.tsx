import React from "react";
import Register from "../components/registerform";
import { RegisterForm } from "../utils/types";

type Props = {};

const register = (register: RegisterForm) => {
  return (
    <div>
      <Register register={register} />
    </div>
  );
};

export default register;
