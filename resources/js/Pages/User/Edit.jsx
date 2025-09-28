import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({user}) {

    const{data, setData, post, errors, reset} = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        _method: 'PUT',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.update', user.id), {
            forceFormData: true
        });
    }

    return (
        <AuthenticatedLayout 
            header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit User {user.name}
                    </h2>
                }
        >
        <Head title="Edit User" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2>Create User Form</h2>
                        <form 
                            onSubmit={onSubmit}
                            encType="multipart/form-data"
                            className="mt-4 space-y-6"
                        >
                            <div className="mt-4">
                                <InputLabel htmlFor="user_name" value="User Name" />
                                <TextInput 
                                    id="user_name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="user_name"
                                    isFocused={true}
                                    onChange={ (e) => setData('name', e.target.value) }
                                />
                                {errors.name && <InputError message={errors.name} className="mt-2" />}
                            </div>
                
                            <div className="mt-4">
                                <InputLabel htmlFor="user_email" value="User Email" />
                                <TextInput 
                                    id="user_email"
                                    name="email"
                                    type="text"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('email', e.target.value) }
                                />
                                {errors.email && <InputError message={errors.email} className="mt-2" />}
                            </div>
                        
                            <div className="mt-4">
                                <InputLabel htmlFor="user_password" value="Password" />
                                <TextInput 
                                    id="user_password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('password', e.target.value) }
                                />
                                {errors.password && <InputError message={errors.password} className="mt-2" />}
                            </div>
                        
                            <div className="mt-4">
                                <InputLabel htmlFor="user_password_confirmation" value="Password Confirmation" />
                                <TextInput 
                                    id="user_password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('password_confirmation', e.target.value) }
                                />
                                {errors.password_confirmation && <InputError message={errors.password_confirmation} className="mt-2" />}
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route('user.index')}
                                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </Link>
                                
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}