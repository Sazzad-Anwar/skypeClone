import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
        formState: { errors },
    } = useForm();

    let from = location.state?.from?.pathname || '/dashboard';

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
        <div className="dark:bg-gray-900 bg-white px-4 md:px-0 h-screen w-screen dark:text-white flex justify-center items-center lg:items-start lg:pt-56">
            <div>
                <div className="flex justify-center items-center mb-6">
                    <img
                        className=""
                        src="https://logincdn.msauth.net/shared/1.0/content/images/applogos/44_08ed657e48f1458641b5f879d82004cd.png"
                        alt="logo"
                    />
                </div>

                <div className="bg-white shadow-md px-11 lg:mx-0 w-full sm:w-96  py-12 border border-gray-200 dark:border-gray-900 dark:bg-gray-800 relative">
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
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="mt-6 mb-4">
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className={`focus:outline-none dark:bg-gray-800 ${
                                    errors.email
                                        ? 'focus:border-red-500 dark:focus:border-red-500'
                                        : 'focus:border-blue-500'
                                }  border-black dark:border-gray-400 transition duration-200 ease-in-out border-b w-full pb-2 text-sm`}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 my-2">Email is required</p>}
                        </div>

                        <div className="mb-4 relative">
                            <div className={`flex items-center justify-between  w-full pb-1`}>
                                <input
                                    {...register('password', { required: true })}
                                    type={showPass ? 'text' : 'password'}
                                    className={`focus:outline-none dark:bg-gray-800 pr-6 ${
                                        errors.password
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
                                <p className="text-red-500 my-2">Password is required</p>
                            )}
                        </div>
                        <div className="flex">
                            <p className="dark:text-white">No account?</p>
                            <Link
                                to="/registration"
                                className="ml-2 text-blue-500 hover:text-gray-600 dark:hover:text-white"
                            >
                                Create One
                            </Link>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="px-9 py-1.5 hover:bg-blue-900 bg-blue-800 transition duration-200 ease-in-out text-white "
                            >
                                Go
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
