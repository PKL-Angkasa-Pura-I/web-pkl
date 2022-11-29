import { Helmet } from "react-helmet"
import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login () {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        console.log(email)
        axios.post(`${process.env.REACT_APP_API_HOST}/admins/login`, {
            username: email.current.value,
            password: password.current.value
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("ap_data", JSON.stringify({
                token: response.data.token,
                isLoggedIn: true
            }))
            navigate("/admin");
        })
        .catch(console.error)
    }

    useEffect(() => {
        if(localStorage.ap_data) {
            if(JSON.parse(localStorage.ap_data).isLoggedIn) {
                navigate("/admin")
            }
        }
    }, [])

    return (
        <div>
            <Helmet>
                <title>Login - Angkasa Pura</title>
            </Helmet>
            <div className="bg-[#87C9E9] w-screen h-screen flex items-center justify-center ">
                <div className="bg-white w-[500px] h-[600px] flex flex-col items-center py-20 gap-6">
                    <img src="/AP-logo-1.png" alt="Logo" width={200} />
                    <div className="font-bold text-3xl text-center">
                        <b>Welcome to<br />Dashboard Admin</b>
                    </div>
                    <form className="flex flex-col gap-4" action={onSubmit}>
                        <div className="flex flex-col w-80">
                            <label htmlFor="Email">
                                Email 
                            </label>
                            <input className="outline outline-1 outline-gray-600 px-3 py-2 rounded-lg hover:outline-[#87C9E9] focus:outline-[#87C9E9] " type="email" id="Email" name="email" ref={email} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Password">
                                Password 
                            </label>
                            <input className="outline outline-1 outline-gray-600 px-3 py-2 rounded-lg hover:outline-[#87C9E9] focus:outline-[#87C9E9]" type="password" id="Password" name="password" ref={password} />
                        </div>
                        <div>
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg w-80 mt-10" onClick={onSubmit}>Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>        
    )
}