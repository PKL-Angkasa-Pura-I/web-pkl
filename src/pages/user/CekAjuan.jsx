import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import React from "react";
import axios from 'axios';

function formatDate(d) {
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

export default function CekAjuan() {
    const [registrationNumber, setRegistrationNumber] = React.useState('');
    const [submission, setSubmission] = React.useState();

    return (
        <div>
            <Helmet>
                <title>Cek Ajuan OJT/PKL</title>
            </Helmet>

            <Navbar active={"Cek Ajuan"} />

            <div className="mt-24 px-32 py-12 bg-white flex flex-col items-center justify-center">
                <b className="mt-5 text-4xl text-[#35A5D9]">Cek Ajuan Pendaftaranmu!</b>
                <span className="mt-7">Silahkan masukkan nomor registrasi pendaftaranmu untuk melakukan pengecekan status pengajuanmu</span>

                <div className="mt-16 flex flex-col items-center">
                    <div class="mb-6">
                        <label for="base-input" class="block mb-2 text-sm font-medium text-black">Nomor Registrasi</label>
                        <input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                    </div>
                    <Button text={"Periksa"} onClick={async () => {
                        const data = (await axios.get(`${process.env.REACT_APP_API_HOST}/submissions/${registrationNumber}`)).data;
                        setSubmission(data.submission)
                    }} className="mt-7 w-60 rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
                </div>
            </div>

            {submission &&
                <div className="flex flex-col items-center justify-center">
                    <table className='p-5 text-left'>
                        <tr>
                            <th className="w-64">Kode Registrasi</th>
                            <td>: {submission.code_submission}</td>
                        </tr>
                        <tr>
                            <th>Nama</th>
                            <td>: {submission.name}</td>
                        </tr>
                        <tr>
                            <th>Asal Sekolah</th>
                            <td>: {submission.school_origin}</td>
                        </tr>
                        <tr>
                            <th>Jumlah Peserta</th>
                            <td>: {submission.total_trainee}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Mulai</th>
                            <td>: {formatDate(new Date(submission.start_date))}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Selesai</th>
                            <td>: {formatDate(new Date(submission.end_date))}</td>
                        </tr>
                        <tr>
                            <th>Nama Divisi</th>
                            <td>: {submission.division.name}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>: {submission.status}</td>
                        </tr>
                    </table>
                </div>}

            {/* Menampilkan button download ketika diterima & ditolak */}
            {submission && (submission.status == 'Diterima' || submission.status == 'Ditolak') &&
                <div className="flex flex-col items-center justify-center">
                    <a href={`${process.env.REACT_APP_API_HOST}/${submission.respon_path_file.replace('../','')}`}>
                        <Button text={"Download Surat Balasan"} className="mt-7 w-60 rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
                    </a>
                </div>}

            {submission && submission.status == 'Diterima' &&
                <div className="mt-8 px-32 py-12 bg-[#F3FBFF] flex flex-col items-center justify-center">
                    <b className="mt-5 mb-5 text-4xl text-[#35A5D9]">Tata Cara Pengisian Formulir PKL</b>
                    <span className="text-center px-32">Silahkan download berkas PKL melalui link <a className="text-[#35A5D9] hover:underline" href="https://drive.google.com/file/d/1OndKicGGXx7eTpa1UYvywZbJ5nAQ5lO1/view?usp=drivesdk">berikut</a>. Selanjutnya silahkan tonton video berikut untuk mengetahui tata cara pengisian formulir PKL di PT. Angkasa Pura I Bandara Juanda Surabaya : </span>
                    <iframe src="https://drive.google.com/file/d/136FaOdxqYUvULQWv-RHFbfKHLOiKIeyf/preview" width="640" height="480" allow="autoplay" className="mt-9"></iframe>
                </div>}

            <Footer />
        </div>
    )
}