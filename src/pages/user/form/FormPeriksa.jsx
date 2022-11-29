import React from 'react';
import Button from '../../../components/Button';

const FormPeriksa = props => {
    const nextSection = () => {
        props.showPeriksa(false);
        props.showPendaftaran(true);
    }
    const [values, setValues] = React.useState({
        nik: 0,
        name: '',
        phone: '',
        address: '',
        email: '',
    });

    return (
        <div className="mt-12 mb-24 flex flex-col items-center">
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Bidang Keilmuan</label>
                <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                {props.dataKeilmuan?.map((val, index) => (
                        <option key={index} value={val.id}>{val.name}</option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Divisi</label>
                <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                    {props.dataDivisi?.map((val, index) => (
                        <option key={index} value={val.id}>{val.division_name}</option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Mulai</label>
                <input type="date" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Selesai</label>
                <input type="date" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>

            <Button text={"Submit"} onClick={() => nextSection()} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
        </div>
    );
}

export default FormPeriksa;
