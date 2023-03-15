import { ref } from 'vue';

export function useErrorState() {
  
  let hasError = ref(false)
  let errorMessage = ref('Form Field Error')

  const setHasError = (boo) => {
    hasError.value = boo
  }

  const setErrorMessage = (val) => {
    console.log(val)
    errorMessage.value = val
  }

  const getErrorCode = (_val) => {
    let codes = {};
    codes['auth/user-not-found'] = "That User Account was not found."
    codes['auth/wrong-password'] = "That password did not match the email address provided."
    codes['auth/invalid-email'] = "The email address provided was not found."
    codes['auth/user-disabled'] = "It appears that User Account has been disabled. Please contact support."
    return codes[_val];
  }

  return {
    hasError,
    setHasError,
    errorMessage,
    setErrorMessage,
    getErrorCode
  }
}