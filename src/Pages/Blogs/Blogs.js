import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
// import useTitle from '../../hooks/useTitle';

const Blogs = () => {
    //update title
    // useTitle("blogs")
    const { setDrawer } = useContext(AuthContext)
    setDrawer(false)
    return (
        <div className='flex flex-col gap-4 my-10 md:mx-20'>
            <div className="card w-full bg-slate-300 shadow-xl border-2 border-primary">
                <div className="card-body">
                    <h2 className="card-title"> What are the different ways to manage a state in a React application?</h2>
                    <div>
                        <div>
                            <p>
                                When we talk about state in our applications, it’s important to be clear about what types of state actually matter.

                                There are four main types of state you need to properly manage in your React apps:
                            </p>
                            <ul>
                                <li className='py-2'>Local state</li>
                                <li className='py-2'>Global state</li>
                                <li className='py-2'>Server state</li>
                                <li className='py-2'>URL state</li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className="card w-full bg-slate-300 border-2  shadow-xl  border-primary">
                <div className="card-body">
                    <h2 className="card-title border 2 p-2 rounded-md">How does prototypical inheritance work??</h2>
                    <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
                </div>
            </div>


            <div className="card w-full bg-slate-300 border-2 border-primary  shadow-xl  border-primary">
                <div className="card-body">
                    <h2 className="card-title border 2 p-2 rounded-md">What is a unit test? Why should we write unit tests?</h2>
                    <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                </div>
            </div>
            <div className="card w-full border-2 border-primary bg-slate-300  shadow-xl">
                <div className="card-body">
                    <h2 className="card-title border-2 p-2 rounded-md">What is a unit test? Why should we write unit tests?</h2>
                    <p><span className='text-primary font-bold'>Angular</span>, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name – AngularJS). Angular 2+ is known as just Angular. Although AngularJS (version 1) still gets updates, we will focus the discussion on Angular.<br></br>
                        <span className='text-primary font-bold'>Vue</span>, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it doesn’t have the backing of a large company. The most current version is always announced on the official Vue website on their releases page. Contributors for Vue are supported by Patreon. It should be noted that Vue also has its own GitHub repo, and functions using TypeScript.
                        <br></br>
                        <span className='text-primary font-bold'>React</span>, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). Similar to Vue, the React developers also announce their newest version on the blog section of the React website.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Blogs;