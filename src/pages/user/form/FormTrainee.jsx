import React from 'react';
import axios from "axios";
import Button from '../../../components/Button';
import { useNavigate } from "react-router-dom";

const FormTrainee = () => {
    const codeSubmission = localStorage.getItem('code_submission');
    const jumlahAnggota = localStorage.getItem('jumlah_anggota');

    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        name: '',
        trainee_student_id: '',
        email: '',
        jurusan: '',
        gender: '',
        phone: '',
    });

    React.useEffect(() => {
        const getLeader = async () => {
            try {

                await axios.get(
                    `${process.env.REACT_APP_API_HOST}/submissions/${codeSubmission}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                    .then((response) => {
                        setValues(v => { return ({ ...v, name: response.data.submission.name, email: response.data.submission.email }) });
                    });
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        };

        getLeader();
    }, []);

    const [next, setNext] = React.useState(true);
    const [submit, setSubmit] = React.useState(false);

    const count = React.useRef(1);
    const clickedButton = async (event) => {
        if (count.current <= jumlahAnggota) {

            await axios.post(
                `${process.env.REACT_APP_API_HOST}/trainees/${codeSubmission}`,
                {
                    name: values.name,
                    trainee_student_id: values.trainee_student_id,
                    email: values.email,
                    jurusan: values.jurusan,
                    gender: values.gender,
                    phone: values.phone
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(function (response) {
                    // handle success
                    console.log('axios', response);
                    count.current = count.current + 1;
                    if (count.current == jumlahAnggota) { setNext(false); setSubmit(true); }
                    setValues(v => {
                        return ({
                            ...v,
                            name: '',
                            trainee_student_id: '',
                            email: '',
                            jurusan: '',
                            gender: '',
                            phone: '',
                        })
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    }

    const handleSubmit = async () => {
        // axios when clicked submit
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('trainee_student_id', values.trainee_student_id);
        formData.append('email', values.email);
        formData.append('jurusan', values.jurusan);
        formData.append('gender', values.gender);
        formData.append('phone', values.phone);

        await axios.post(
            `${process.env.REACT_APP_API_HOST}/trainees/${codeSubmission}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(function (response) {
                // handle success
                console.log('axios', response);
                navigate("/cekajuan");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (

        <div className="mt-12 mb-24 flex flex-col items-center">

            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                <input value={values.name} onChange={handleChange('name')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">NIM</label>
                <input value={values.trainee_student_id} onChange={handleChange('trainee_student_id')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input value={values.email} onChange={handleChange('email')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jurusan</label>
                <input value={values.jurusan} onChange={handleChange('jurusan')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                <select onChange={handleChange('gender')} value={values.gender} id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                    <option value="">Choose Option</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                <input value={values.phone} onChange={handleChange('phone')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <br /><br />

            {next ? <Button text={"Selanjutnya"} onClick={clickedButton} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" /> : null}
            {submit ? <Button text={"Submit"} onClick={handleSubmit} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" /> : null}
        </div>
    );
}

export default FormTrainee;
