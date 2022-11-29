import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import FormPeriksa from "./form/FormPeriksa";
import FormPendaftaran from "./form/FormPendaftaran";
import FormTrainee from "./form/FormTrainee";
import React from "react";
import axios from "axios";

export default function Pendaftaran() {
    const [periksa, setPeriksa] = React.useState(true);
    const [pendaftaran, setPendaftaran] = React.useState(false);
    const [trainee, setTrainee] = React.useState(false);
    const [anggota, setAnggota] = React.useState(0);

    const [dataDivisi, setDataDivisi] = React.useState();
    const [dataKeilmuan, setDataKeilmuan] = React.useState();
    React.useEffect(() => {
        const getDivision = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_HOST}/list_division_fields`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setDataDivisi(response.data.data);
                });
        };
        getDivision();

        const getKeilmuan = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_HOST}/study_fields`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setDataKeilmuan(response.data.study_field);
                });
        };
        getKeilmuan();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Cek Ajuan OJT/PKL</title>
            </Helmet>

            <Navbar active={"Pendaftaran"} />

            <div className="mt-16 px-32 flex flex-col items-center justify-center w-cover h-[520px] bg-screen bg-no-repeat" style={{ background: "url('/daftar-banner.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <b className="break-normal text-6xl text-white">Pendaftaran Calon Peserta PKL</b>
                <span className="mt-6 text-white">Silahkan ikuti dan lengkapi formulir pendaftaran di bawah ini dan pastikan data yang kalian isikan sudah benar</span>
            </div>

            {periksa ? <FormPeriksa dataKeilmuan={dataKeilmuan} dataDivisi={dataDivisi} showPendaftaran={setPendaftaran} showPeriksa={setPeriksa} /> : null}
            {pendaftaran ? <FormPendaftaran dataKeilmuan={dataKeilmuan} dataDivisi={dataDivisi} jumlahAnggota={anggota} showPendaftaran={setPendaftaran} showTrainee={setTrainee} setAnggota={setAnggota} /> : null}
            {trainee ? <FormTrainee jumlahAnggota={anggota} /> : null}

            <Footer />
        </div>
    )
}