
export default function getResponseJSON(values, isError = false){
  return {
    error: isError,
    result: values
  };
}