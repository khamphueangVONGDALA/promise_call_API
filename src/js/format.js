function format(dateFomat) {
    let date = new Date(dateFomat);
    let format_date =
      ((date.getMonth() + 1).toString().length > 1 ? "" : "0") +
      (date.getMonth() + 1) +
      "/" +
      ((date.getDate().toString().length > 1 ? "" : "0") + date.getDate()) +
      "/" +
      date.getFullYear();
  
    return format_date;
  }



  export default format;