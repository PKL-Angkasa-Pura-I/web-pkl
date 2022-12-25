import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"
import axios from "axios";

export default function ChangePassword() {

    const [ error, setError ] = useState([]);

    const password = useRef();
    const new_password = useRef();
    const confirm_new_password = useRef();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        if(new_password.current.value !== confirm_new_password.current.value) {
            setError([
                ...error,
                "Password baru dan konfirmasi password baru harus sama!"
            ])
            return
        } else setError([]);

        axios.post(`${process.env.REACT_APP_API_HOST}/admins/login`, {
            old_password: password.current.value,
            new_password: new_password.current.value
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("ap_data", JSON.stringify({
                token: response.data.token,
                isLoggedIn: true
            }))
            navigate("/admin");
        })
        .catch((err)=> {
            console.error(err)
            setError([
                ...error,
                "Gagal mengubah password!"
            ]);
        })
    }

    return (
        <div>
            <Helmet>
                <title>Ubah Kata Sandi - Angkasa Pura</title>
            </Helmet>
            <div className="bg-[#87C9E9] w-screen h-screen flex items-center justify-center ">
                <div className="bg-white w-[500px] h-[600px] flex flex-col items-center py-20 gap-6">
                    <img src="/AP logo 1.png" alt="Logo" width={200} />
                    <div className="font-bold text-3xl text-center">
                        <b>Ubah Kata Sandi</b>
                    </div>
                    <form className="flex flex-col gap-4" action={onSubmit}>
                        <div className="flex flex-col gap-1 w-80 text-sm">
                        {
                            error.map((e, i) => {
                                return (
                                    <div key={i} className="bg-red-500 text-white px-3 py-1 w-full rounded-lg">{e}</div>
                                )
                            })
                        }
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Password">
                                Password Lama
                            </label>
                            <input className="outline outline-1 outline-gray-600 px-3 py-2 rounded-lg hover:outline-[#87C9E9] focus:outline-[#87C9E9]" type="password" id="Password" name="password" ref={password} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="NewPassword">
                                Password Baru
                            </label>
                            <input className="outline outline-1 outline-gray-600 px-3 py-2 rounded-lg hover:outline-[#87C9E9] focus:outline-[#87C9E9]" type="password" id="NewPassword" name="newpassword" ref={new_password} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="ConfirmNewPassword">
                                Konfirmasi Password Baru
                            </label>
                            <input className="outline outline-1 outline-gray-600 px-3 py-2 rounded-lg hover:outline-[#87C9E9] focus:outline-[#87C9E9]" type="password" id="ConfirmNewPassword" name="confirmnewpassword" ref={confirm_new_password} />
                        </div>
                        <div>
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg w-80 mt-10" onClick={onSubmit}>Ubah Password</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>        
    )
}