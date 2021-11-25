import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DarkModeToggler from '../Components/DarkModeToggler';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/LoginAction';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    let from = location.state?.from?.pathname || '/dashboard';

    console.log(user && user.details);

    useEffect(() => {
        if (user && user.details) {
            navigate(from);
        }
    }, [navigate, from, user]);

    const onSubmit = (data) => {
        dispatch(login(data));
        navigate(from);
    };

    return (
        <div className="dark:bg-gray-900 bg-white h-screen w-screen dark:text-white flex justify-center items-center">
            <div className="mx-2 lg:mx-0 bg-white lg:w-96 shadow-2xl p-9 border border-gray-200 dark:border-gray-900 rounded-xl dark:bg-gray-800">
                <div className="flex justify-end items-center">
                    <DarkModeToggler />
                </div>
                <div className="flex justify-center items-center mb-6">
                    <img className="h-20" src="/logo.png" alt="logo" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Controller
                        {...register('email', { required: true })}
                        control={control}
                        render={({ field }) => (
                            <div
                                className={`flex px-2 h-11 items-center border ${
                                    errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-400 dark:border-gray-900'
                                } rounded-lg mt-4 mb-2`}
                            >
                                <span className="material-icons-outlined mr-2">email</span>
                                <input
                                    type="email"
                                    {...field}
                                    className="dark:text-white w-full dark:bg-gray-800 focus:outline-none"
                                    placeholder="Your Email"
                                />
                            </div>
                        )}
                    />
                    {errors.email && <p className="text-red-500 mb-2">Email is required</p>}

                    <Controller
                        {...register('password', { required: true, min: 6 })}
                        control={control}
                        render={({ field }) => (
                            <div
                                className={`flex px-2 h-11 items-center border ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-400 dark:border-gray-900'
                                } rounded-lg mt-4 mb-2`}
                            >
                                <span className="material-icons-outlined mr-2">vpn_key</span>
                                <input
                                    {...field}
                                    type={showPass ? 'text' : 'password'}
                                    className="dark:text-white w-full dark:bg-gray-800 focus:outline-none"
                                    placeholder="Password"
                                />
                                <span
                                    className="material-icons-outlined mr-2 cursor-pointer"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? 'visibility_off' : 'visibility'}
                                </span>
                            </div>
                        )}
                    />
                    {errors.password && <p className="text-red-500 mb-2">Password is required</p>}

                    <button
                        className="h-11 border hover:text-white border-gray-400 dark:border-gray-900 rounded-lg w-full hover:bg-gray-900 transition-all ease-in-out"
                        type="submit"
                    >
                        Login
                    </button>

                    <div className="flex justify-between items-center my-4">
                        <p>Not have account?</p>
                        <Link
                            to="/registration"
                            className="hover:text-gray-600 dark:hover:text-gray-300 dark:text-white transition-all ease-in-out"
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
