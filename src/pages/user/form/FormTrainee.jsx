import React from 'react';
import Button from '../../../components/Button';

const FormTrainee = props => {
    const RenderForm = () => {
        return (
            <>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                    <input value="" type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">NIM</label>
                    <input value="" type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input value="" type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jurusan</label>
                    <input value="" type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                    <select id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                    <input value="" type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <br /><br />
            </>
        );
    }

    return (
        <div className="mt-12 mb-24 flex flex-col items-center">
            {(function (rows, i, len) {
                while (++i <= len) {
                    rows.push(<RenderForm key={i} />);
                }
                return rows;
            })([], 0, props.jumlahAnggota)}

            <Button text={"Submit"} onClick={() => { }} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
        </div>
    );
}

export default FormTrainee;
