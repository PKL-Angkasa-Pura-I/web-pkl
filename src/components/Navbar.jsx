import { Link, useHref } from "react-router-dom";
import apLogo from '../assets/ap-logo-primer-inv-rgb.png';

export default function Navbar({ active }) {

    const navbarContent = [
        {
            text: "Beranda",
            address: "/"
        },
        {
            text: "Pendaftaran",
            address: "/daftar"

        },
        {
            text: "Cek Ajuan",
            address: "/cekajuan"
        },
        {
            text: "FAQ",
            address: "/faq"
        },
    ]

    return (
        <div>
            <nav className="px-32 py-2.5 bg-[#35A5D9] fixed w-full z-20 top-0 left-0">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="/" className="flex items-center">
                        <img src={apLogo} className="mr-3 h-6 sm:h-9" alt="AP Logo" />
                    </a>

                    <div className="justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-sky-3000">

                            {
                                navbarContent.map((e, i) => {
                                    return (
                                        <li>
                                            <Link key={i} to={e.address} className={`px-3 py-2 text-white font-normal rounded ${active === e.text ? "text-bold bg-sky-200 text-sky-800" : ""}`}>{e.text}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}