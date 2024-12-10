export function validation(errors, serverError, type) {

  return errors?.[type] ? errors[type].message : serverError?.[type] &&serverError?.[type] ? serverError[type][0] : null;
}
