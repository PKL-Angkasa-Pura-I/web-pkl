import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

export default function Pendaftaran() {

    return (
        <div>
            <Helmet>
                <title>Cek Ajuan OJT/PKL</title>
            </Helmet>

            <Navbar active={"Pendaftaran"} />

            <div className="mt-16 px-32 flex flex-col items-center justify-center w-cover h-[520px] bg-screen bg-no-repeat" style={{ background: "url('/daftar-banner.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <b className="break-normal text-6xl text-white">Pendaftaran Calon Peserta OJT / PKL</b>
                <span className="mt-6 text-white">Silahkan ikuti dan lengkapi formulir pendaftaran di bawah ini dan pastikan data yang kalian isikan sudah benar</span>
            </div>

            <div className="mt-12 mb-24 flex flex-col items-center">
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Bidang Keahlian</label>
                    <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        <option>Ilmu Komputer</option>
                        <option>Teknologi Informasi</option>
                        <option>Teknik Komputer</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Divisi</label>
                    <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        <option>Airport Technology Section</option>
                        <option>ITC</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Mulai</label>
                    <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" disabled>
                        <option>23/10/2022</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Selesai</label>
                    <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" disabled>
                        <option>23/11/2022</option>
                    </select>
                </div>

                <Button text={"Periksa"} onClick={() => { }} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
            </div>

            <Footer />
        </div>
    )
}