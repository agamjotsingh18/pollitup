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
    }
};

export default validation;
