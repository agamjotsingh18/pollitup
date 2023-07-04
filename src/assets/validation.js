const emailRegex = /^\w+(?:[\.-]\w+)*@(?:gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

const validation = {
  name: (value) => {
    return value.trim().length < 4
      ? {
          name: true,
          nameError: "Poll name must be atleast 4 characters long.",
        }
      : { name: false, nameError: false };
  },
  description: (value)=>{
    const words = value.trim().split(/\s+/);
    return (words.length < 10)? 
    {
        description: true,
        descriptionError: "Poll Description must contain atleast 10 words.",
      }:
      { description: false, descriptionError: false };
  },
  question: (value)=>{
    const words = value.trim().split(/\s+/);
    return (words.length < 4)? 
    {
        question: true,
        questionError: "Poll Question must contain atleast 4 words.",
      }:
      { question: false, questionError: false };
    },

    choice: (value)=>{
      return value.trim().length < 3
      ? true
      : false;
    },

    email: (value)=>{
      return emailRegex.test(value)
      ? {  email: false, emailError: false }
      : {  email: true,emailError: "Please enter valid email address" }
    },
    password: (value)=>{
      return passwordRegex.test(value)
      ? { password: false, passwordError: false }
      : {
          password: true,
          passwordError:
            "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9).",
        };
    },

    password2:  (value, password) => {
      return value === password
        ? { password2: false, password2Error: false }
        : {
          password2: true,
          password2Error: "Password does not match",
          };
    }
};

export default validation;
