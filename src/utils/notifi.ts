import { toast } from "react-toastify";

export const messageSuccess = (message: string) => {
  console.log("okfsa");

  toast.success(message, {
    hideProgressBar: true,
    theme: "colored",
  });
};

export const messageError = (error: any) => {
  let message = "";
  if (error.response.data.errors) {
    message = error.response.data.errors;
  } else {
    message = error.response.data.message;
  }
  toast.error(message, {
    hideProgressBar: true,
    theme: "colored",
  });
};

export const messageErrorLog = (message: string) => {
 
  toast.error(message, {
    hideProgressBar: true,
    theme: "colored",
  });
};

export const messageWaning = (message: string) => {
  toast.info(message, {
    hideProgressBar: true,
    theme: "colored",
  });
};