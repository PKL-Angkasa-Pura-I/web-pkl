
export function loginCheck() {
    
    if(!localStorage.ap_data || !JSON.parse(localStorage.ap_data).isLoggedIn) {
      window.location.href = "/login"
    }
    return true
  }