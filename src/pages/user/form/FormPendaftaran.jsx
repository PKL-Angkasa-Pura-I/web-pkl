import React from 'react';
import Button from '../../../components/Button';
import axios from 'axios';

const FormPendaftaran = props => {
    // const nextSection = () => {
    //     props.showPendaftaran(false);
    //     props.showTrainee(true);
    // }

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        school_origin: '',
        total_trainee: 0,
        division_id: 0,
        study_field_id: 0,
        start_date: '',
        end_date: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [file, setFile] = React.useState();
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const date_start = values.start_date + 'T00:00:00Z';
        const date_end = values.end_date + 'T00:00:00Z';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('school_origin', values.school_origin);
        formData.append('total_trainee', values.total_trainee);
        formData.append('division_id', values.division_id);
        formData.append('study_field_id', values.study_field_id);
        formData.append('start_date', date_start);
        formData.append('end_date', date_end);
        await axios.post(
            `${process.env.REACT_APP_API_HOST}/submissions`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then(function (response) {
                // handle success
                console.log('axios', response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    return (
        <div className="mt-12 mb-24 flex flex-col items-center">
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                    <input onChange={handleChange('name')} value={values.name} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input onChange={handleChange('email')} value={values.email} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Asal Sekolah</label>
                    <input onChange={handleChange('school_origin')} value={values.school_origin} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Anggota</label>
                    <input type="text" onChange={handleChange('total_trainee')} value={values.total_trainee} id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Divisi</label>
                    <select id="countries" onChange={handleChange('division_id')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        {props.dataDivisi?.map((val, index) => (
                            <option key={index} value={val.id}>{val.division_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Bidang Keilmuan</label>
                    <select id="countries" onChange={handleChange('study_field_id')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        {props.dataKeilmuan?.map((val, index) => (
                            <option key={index} value={val.id}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Mulai</label>
                    <input type="date" onChange={handleChange('start_date')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Selesai</label>
                    <input type="date" onChange={handleChange('end_date')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>

                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Upload Surat Pengantar</label>
                    <input type="file" onChange={handleChangeFile} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" id="file" />
                </div>

                <Button text={"Submit"} type={"submit"} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
            </form>

        </div>
    );
}

export default FormPendaftaran;
