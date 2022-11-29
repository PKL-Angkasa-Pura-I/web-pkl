import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from 'axios';

export default function UserHome() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(0);

    const maxPerPage = 6;

    React.useEffect(() => {

        async function getData() {
            const data = (await axios.get(`${process.env.REACT_APP_API_HOST}/list_division_fields`)).data;
            console.log('data', data.data);
            setData(data.data.map((item) => ({
                title: item.division_name,
                requirements: item.list_study_field
            })));
        }

        getData();

        // setData([
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        //     {
        //         title: "Airport Technology System",
        //         requirements: [
        //             "Ilmu Komputer",
        //             "Teknologi Informasi",
        //             "Teknik Komputer"
        //         ]
        //     },
        // ])

    }, []);

    return (
        <div>
            <Helmet>
                <title>Web Penerimaan PKL Angkasa Pura 1 Bandar Juanda Surabaya</title>
            </Helmet>

            <Navbar active={"Beranda"} />

            <div className="mt-16 px-32 flex flex-col justify-center w-cover h-[680px] bg-cover bg-no-repeat" style={{ background: "url('/home-banner.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <b className="break-normal text-6xl text-white">Penerimaan Online Siswa PKL</b>
                <span className="mt-6 text-white">Selamat datang di Website lingkungan PT.Angkasa Pura I (PERSERO) Cabang Bandar Udara Internasional Juanda Surabaya</span>
                <div className="flex flex-row">
                    <button text={"Daftar"} onClick={() => { navigate("/daftar") }} className="px-6 py-2 mt-12 mr-2 w-fit rounded-md bg-[#35A5D9] hover:bg-white hover:text-[#35A5D9] font-normal text-white">Daftar</button>
                    <a href="#mekanisme" className="px-6 py-2 mt-12 ml-2 w-fit rounded-md bg-white text-[#35A5D9] hover:bg-[#35A5D9] hover:text-white font-normal">Mekanisme</a>
                </div>
            </div>

            <div className="px-32 py-12 bg-[#F3FBFF] flex flex-col min-h-[100vh]">
                <b className="mt-5 text-4xl text-[#35A5D9]">Lowongan Divisi</b>
                <span className="mt-7">Sebelum melakukan pendaftaran silahkan cek kesesuaian  posisi yang ingin kalian lamar dengan ilmu keahlian kalian</span>

                <div className="mt-7 flex flex-row grid grid-cols-3 divide-x">
                    {
                        data.map((e, i) => {
                            if (i >= currentPage && i < currentPage + maxPerPage) return (
                                <div key={i} className="mt-5 bg-white rounded-xl p-16 w-fit h-48 flex flex-col justify-center min-w-[25vw]">
                                    <h2 class="mb-2 text-lg font-semibold text-[#35A5D9]">{e.title}</h2>
                                    <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500">
                                        {
                                            e.requirements &&
                                            e.requirements.map((f, j) => {
                                                return (
                                                    <li key={j}>{f}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex w-full items-end justify-end ">
                    <div className="flex gap-1">
                        <button className="border rounded w-6 h-6 flex items-center justify-center hover:bg-blue-500" onClick={() => {
                            if (currentPage >= maxPerPage) setCurrentPage(currentPage - maxPerPage)
                        }
                        }></button>
                        {
                            data.map((_e, i) => {

                                if (i % maxPerPage === 0) {

                                    let num = i === 0 ? 1 : i / maxPerPage + 1;
                                    return (
                                        <button className={`border rounded hover:bg-blue-500 ${currentPage === i ? "bg-blue-600 text-white" : ""} w-6 h-6 text-sm`} onClick={() => setCurrentPage(i)}>{num}</button>
                                    )
                                }

                            })
                        }
                        <button className="border rounded w-6 h-6 flex items-center justify-center hover:bg-blue-500" onClick={() => {
                            if (currentPage < data.length - 1) setCurrentPage(currentPage + maxPerPage)
                        }
                        }></button>
                    </div>
                </div>
            </div>

            <div className="px-32 py-12 bg-white flex flex-col items-center justify-center" id="mekanisme">
                <b className="mt-5 text-4xl text-[#35A5D9]">Mekanisme</b>

                <div className="mt-7">
                    <span>Berikut adalah tata cara pendaftaran siswa OJT (On the Job Training) / PKL : </span>
                    <ol class="mt-7 space-y-1 list-decimal list-inside">
                        <li>Calon peserta mendaftar secara online melalui internet dengan website <a href="/" className="text-[#35A5D9] hover:underline">https://pkl.angkasapura1.co.id</a></li>
                        <li>Sebelum mengisi form registrasi diwajibkan bagi calon peserta untuk melihat kesesuaian unit kerja, bidang keilmuan dan kuota yang tersedia melalui menu <b>Pendafataran</b> atau klik <a href="/" className="text-[#35A5D9] hover:underline">disini</a> (Pendaftaran paling lambat 1 bulan sebelum waktu mulai PKL)</li>
                        <li>Calon peserta mengisi form registrasi dengan lengkap dan mengunggah surat permohonan dari kampus yang ditujukan kepada General Manager PT Angkasa Pura I Bandar Udara Juanda - Surabaya</li>
                        <li>Setelah mendaftar, mohon simpan nomor registrasi yang muncul setelah data berhasil tersimpan dalam sistem.</li>
                        <li>Silahkan cek berkala pengajuan ada melalui menu <b>Cek Ajuan</b> atau klik <a href="/cekajuan" className="text-[#35A5D9] hover:underline">disini</a></li>
                    </ol>
                </div>
            </div>

            <div className="px-32 py-12 bg-white flex flex-col items-center justify-center">
                <b className="mt-5 text-4xl text-[#35A5D9]">Company Profile</b>

                <div className="mt-7">
                    <iframe width="720" height="480" src="https://www.youtube.com/embed/eeplXFdctXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className="mt-7">
                    <iframe src="https://drive.google.com/file/d/136FaOdxqYUvULQWv-RHFbfKHLOiKIeyf/preview" width="640" height="480" allow="autoplay"></iframe>
                </div>
            </div>

            <Footer />
        </div>
    )
}