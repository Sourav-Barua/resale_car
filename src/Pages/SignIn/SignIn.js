import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/login.jpg'
import useToken from '../../Hookes/useToken/useToken';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const { signInWithEmail, signInWithGoogle } = useContext(AuthContext)
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [name, setName] = useState(null)
    const token = useToken(email, role, name)
    const navigate = useNavigate()
    if (token) {
        navigate(from, { replace: true });
    }
    const onSubmit = data => {
        signInWithEmail(data?.email, data?.password)
            .then(result => {
                console.log(result.user)
                setEmail(result.user?.email)


            })
            .catch(er => console.log(er))

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                setEmail(result.user?.email)
                setRole("Buyer")
                setName(result.user?.displayName)

            })
            .catch(er => console.log(er))
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Login now!</h1>
                        <img src={img} alt="" className='rounded-md mt-5'></img>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register('password', { required: true })} type="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                                <p className='text-xs font-semibold'>Not a member?<Link to="../signUp" className='text-primary font-bold'>SignUp</Link></p>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className='p-2'>
                            <p className='font-semibold'>Sign in with:</p>
                            <FcGoogle onClick={handleGoogleSignIn} className='text-center text-3xl mx-auto cursor-pointer'></FcGoogle>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;