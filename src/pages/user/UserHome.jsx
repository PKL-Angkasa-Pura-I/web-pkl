import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";

export default function userHome () {

    return (
        <div>
            <Helmet>
                <title>Web Penerimaan OJT/PKL Angkasa Pura 1 Bandar Juanda Surabaya</title>
            </Helmet>

            <Navbar active={"Beranda"} />
        </div>
    )
}