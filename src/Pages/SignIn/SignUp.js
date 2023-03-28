import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/login.jpg'
import useToken from '../../Hookes/useToken/useToken';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const { signUpWithEmail, updateName, signInWithGoogle } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [name, setName] = useState(null)
    const token = useToken(email, role, name)
    if (token) {
        navigate("/")
    }

    const onSubmit = data => {
        signUpWithEmail(data?.email, data?.password)
            .then(result => {
                console.log(result.user)
                const profile = {
                    displayName: data.name,
                }
                updateUser(profile, data?.email, data?.role, data?.name)

            })
            .catch(er => console.log(er))

        console.log(data)

    }

    const updateUser = (profile, email, role) => {
        updateName(profile)
            .then(() => {
                setEmail(email)
                setRole(role)
                setName(profile.displayName)
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
                        <h1 className="text-5xl font-bold text-center">Register now!</h1>
                        <img src={img} alt="" className='rounded-md mt-5'></img>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name', { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                            </div>
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
                                <input {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*\W)(?!.* )/i
                                })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && errors.password.type === "required" && <span className='text-sm text-red-600'>This is required</span>}
                                {errors.password && errors.password.type === "minLength" && <span className='text-sm text-red-600'>password should be 8 charcter long</span>}
                                {errors.password && errors.password.type === "pattern" && <span className='text-sm text-red-600'>Must conatains at least one uppercase letter,one number and one special character</span>}

                                <div className='flex my-2'>
                                    <label htmlFor='radio1' className='mr-2'>
                                        <input {...register("role")} type="radio" checked value="Buyer" />
                                        <span className='ml-2'>Buyer</span>
                                    </label>
                                    <label htmlFor='radio2'>
                                        <input id='radio2' {...register("role")} type="radio" value="Seller" />
                                        <span className='ml-2'>Seller</span>
                                    </label>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                                <p className='text-xs font-semibold'>Already have an account?<Link to="../signIn" className='text-primary font-bold'>SignIn</Link></p>
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

export default SignUp;