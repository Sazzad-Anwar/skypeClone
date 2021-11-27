import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DarkModeToggler from '../Components/DarkModeToggler';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationAction } from '../Redux/Actions/LoginAction';

const Registration = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (user && user._id) {
            navigate(from);
        }
    }, [navigate, from, user]);

    const registration = (data) => {
        dispatch(registrationAction(data));
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="dark:bg-gray-900 overflow-hidden bg-white h-screen w-screen dark:text-white flex justify-center items-center lg:items-start lg:pt-40">
            <div>
                <div className="flex justify-center items-center mb-6">
                    <img
                        className=""
                        src="https://logincdn.msauth.net/shared/1.0/content/images/applogos/44_08ed657e48f1458641b5f879d82004cd.png"
                        alt="logo"
                    />
                </div>

                <div className="bg-white shadow-md px-11 mx-2 lg:mx-0 w-screen lg:w-96  py-12 border border-gray-200 dark:border-gray-900 dark:bg-gray-800 relative">
                    <div className="absolute right-2 top-2">
                        <DarkModeToggler />
                    </div>
                    <img
                        className="mb-4"
                        src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg"
                        alt="mircrosoft"
                    />
                    <h1 className="text-2xl font-semibold dark:text-white ">Sign in</h1>
                    <p>to continue to skype</p>
                    <form onSubmit={handleSubmit(registration)} autoComplete="off">
                        <div className="mt-6 mb-4">
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className={`focus:outline-none dark:bg-gray-800 ${
                                    errors.email ? 'focus:border-red-500' : 'focus:border-blue-500'
                                }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                placeholder="Name"
                            />
                            {errors.name && <p className="text-red-500 my-1">Name is required</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className={`focus:outline-none dark:bg-gray-800 ${
                                    errors.email ? 'focus:border-red-500' : 'focus:border-blue-500'
                                }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 my-1">Email is required</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                {...register('phone', { required: true })}
                                type="tel"
                                className={`focus:outline-none dark:bg-gray-800 ${
                                    errors.email ? 'focus:border-red-500' : 'focus:border-blue-500'
                                }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                placeholder="Phone Number"
                            />
                            {errors.phone && (
                                <p className="text-red-500 my-1">Phone number is required</p>
                            )}
                        </div>

                        <div className="mb-4 relative">
                            <div className={`flex items-center justify-between  w-full pb-1`}>
                                <input
                                    {...register('password', { required: true })}
                                    type={showPass ? 'text' : 'password'}
                                    onChange={(e) => setPass(e.target.value)}
                                    value={pass}
                                    className={`focus:outline-none dark:bg-gray-800 pr-6 ${
                                        errors.confirmPassword ||
                                        errors.confirmPassword !== errors.password
                                            ? 'focus:border-red-500 dark:focus:border-red-500'
                                            : 'focus:border-blue-500'
                                    }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                    placeholder="Password"
                                />
                                <div className="absolute right-0 cursor-pointer">
                                    <span
                                        className="material-icons-outlined mr-2"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? 'visibility_off' : 'visibility'}
                                    </span>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 my-1">Password is required</p>
                            )}
                            {!errors.confirmPassword && confPass !== pass && (
                                <p className="text-red-500 my-1">Password do not match</p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <div className={`flex items-center justify-between  w-full pb-1`}>
                                <input
                                    {...register('confirmPassword', { required: true })}
                                    onChange={(e) => setConfPass(e.target.value)}
                                    value={confPass}
                                    type={showConfirmPass ? 'text' : 'password'}
                                    className={`focus:outline-none dark:bg-gray-800 pr-6 ${
                                        errors.confirmPassword ||
                                        errors.confirmPassword !== errors.password
                                            ? 'focus:border-red-500 dark:focus:border-red-500'
                                            : 'focus:border-blue-500'
                                    }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                    placeholder="Password"
                                />
                                <div className="absolute right-0 cursor-pointer">
                                    <span
                                        className="material-icons-outlined mr-2"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                    >
                                        {showConfirmPass ? 'visibility_off' : 'visibility'}
                                    </span>
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 my-1">Password is required</p>
                            )}
                            {!errors.confirmPassword && confPass !== pass && (
                                <p className="text-red-500 my-1">Password do not match</p>
                            )}
                        </div>
                        <div className="flex">
                            <p className="dark:text-white">Already have account?</p>
                            <Link
                                to="/"
                                className="ml-2 text-blue-500 hover:text-gray-600 dark:hover:text-white"
                            >
                                Sign In
                            </Link>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="px-9 py-1.5 hover:bg-blue-900 bg-blue-800 transition duration-200 ease-in-out text-white "
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
