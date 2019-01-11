const cookie = {
  setCookie: (c_name, value, exDays) => {
    const exDate = new Date();
    exDate.setDate(exDate.getDate() + (exDays || 3));
    document.cookie = c_name + "=" + escape(value) + ((exDays == null) ? "" : ";expires=" + exDate.toGMTString() + ";path=/");
  },
  delCookie: (c_name) => {
    let date = new Date();
    date.setTime(date.getTime() - 30000);
    document.cookie = c_name + "=v; expires =" + date.toGMTString() + ";path=/";
  },
  getCookie: (c_name) => {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
  }
}
export default cookie
