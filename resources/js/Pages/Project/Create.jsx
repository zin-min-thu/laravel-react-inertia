import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {

    const{data, setData, post, errors, reset} = useForm({
        name: '',
        description: '',
        due_date: '',
        status: '',
        image: null,
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('project.store'));
    }

    return (
        <AuthenticatedLayout 
            header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create Project
                    </h2>
                }
        >
        <Head title="Create Project" />
        
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2>Create Project Form</h2>
                        <form 
                            onSubmit={onSubmit}
                            encType="multipart/form-data"
                            className="mt-4 space-y-6"
                        >
                            <div>
                                <InputLabel htmlFor="project_image_path" value="Project Image" />
                                <TextInput 
                                    id="project_image_path"
                                    name="image"
                                    type="file"
                                    className="mt-1 block w-full"
                                    autoComplete="project_image_path"
                                    onChange={ (e) => setData('image', e.target.files[0]) }
                                />
                                {errors.image && <InputError message={errors.image} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_name" value="Project Name" />
                                <TextInput 
                                    id="project_name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="project_name"
                                    isFocused={true}
                                    onChange={ (e) => setData('name', e.target.value) }
                                />
                                {errors.name && <InputError message={errors.name} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_description" value="Project Description" />
                                <TextAreaInput 
                                    id="project_description"
                                    name="name"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="project_description"
                                    onChange={ (e) => setData('description', e.target.value) }
                                />
                                {errors.description && <InputError message={errors.description} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                                <TextInput 
                                    id="project_due_date"
                                    name="due_date"
                                    type="date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    autoComplete="project_due_date"
                                    onChange={ (e) => setData('due_date', e.target.value) }
                                />
                                {errors.due_date && <InputError message={errors.due_date} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_status" value="Project Status" />
                                <SelectInput 
                                    id="project_status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('status', e.target.value) }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>

                                </SelectInput>
                                {errors.status && <InputError message={errors.status} className="mt-2" />}
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route('project.index')}
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