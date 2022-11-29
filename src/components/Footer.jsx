import { Link, useHref } from "react-router-dom";
import apLogo from '../assets/ap-logo-primer-inv-rgb.png';

export default function Footer() {

    return (
        <footer className="mt-9 py-12 px-32 bg-[#35A5D9]">
            <div className="md:flex md:justify-between">
                <div className="mb-6 flex flex-col justify-center">
                    <a href="/" className="flex items-center">
                        <img src={apLogo} className="mr-3 h-24" alt="AP Logo" />
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-32">
                    <div className="flex flex-col">
                        <span className="text-white">Bandar Udara Internasional Juanda</span>
                        <span className="text-white">Jalan Ir. Haji Juanda</span>
                        <span className="text-white">Surabaya 61253</span>

                        <div className="mt-8 flex flex-col">
                            <span className="text-white">Telephone:</span>
                            <span className="text-white">T1 (+6231) 2986200</span>
                            <span className="text-white">T2 (+6231) 2986700</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-6 text-lg font-bold text-white uppercase">Layanan</h2>
                        <ul className="text-white">
                            <li className="mb-1">
                                <Link to="/" className={'hover:underline'}>Beranda</Link>
                            </li>
                            <li>
                                <Link to="/daftar" className={'hover:underline'}>Pendaftaran</Link>
                            </li>
                            <li>
                                <Link to="/cekajuan" className={'hover:underline'}>Cek Ajuan</Link>
                            </li>
                            <li>
                                <Link to="/faq" className={'hover:underline'}>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}