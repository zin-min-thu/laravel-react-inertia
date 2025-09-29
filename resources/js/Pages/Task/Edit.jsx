import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({task, projects, users}) {

    const{data, setData, post, errors, reset} = useForm({
        image: null,
        name: task.name || '',
        description: task.description || '',
        due_date: task.due_date || '',
        status: task.status || '',
        priority: task.priority || '',
        project_id: task.project_id || '',
        assigned_user_id: task.assigned_user_id || '',
        _method: 'PUT',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.update', task.id), {
            forceFormData: true
        });
    }

    return (
        <AuthenticatedLayout 
            header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Task {task.name}
                    </h2>
                }
        >
        <Head title="Edit Task" />
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2>Create Task Form</h2>
                        <form 
                            onSubmit={onSubmit}
                            encType="multipart/form-data"
                            className="mt-4 space-y-6"
                        >
                            {task.image_path && (
                                <div className="mb-4 flex justify-start">
                                    <img
                                        src={task.image_path}
                                        alt={task.name}
                                        className="w-48 h-auto rounded border"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}

                            <div>
                                <InputLabel htmlFor="task_project_id" value="Project" />
                                <SelectInput 
                                    id="task_project_id"
                                    name="project_id"
                                    value={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('project_id', e.target.value) }
                                >
                                    <option value="">Select Project</option>
                                    {projects.data.map( (project) => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ) )}

                                </SelectInput>
                                {errors.project_id && <InputError message={errors.project_id} className="mt-2" />}
                            </div>

                            <div>
                                <InputLabel htmlFor="project_image_path" value="Task Image" />
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
                                <InputLabel htmlFor="task_name" value="Task Name" />
                                <TextInput 
                                    id="task_name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="task_name"
                                    isFocused={true}
                                    onChange={ (e) => setData('name', e.target.value) }
                                />
                                {errors.name && <InputError message={errors.name} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_description" value="Task Description" />
                                <TextAreaInput 
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="task_description"
                                    onChange={ (e) => setData('description', e.target.value) }
                                />
                                {errors.description && <InputError message={errors.description} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_due_date" value="Task Due Date" />
                                <TextInput 
                                    id="task_due_date"
                                    name="due_date"
                                    type="date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    autoComplete="task_due_date"
                                    onChange={ (e) => setData('due_date', e.target.value) }
                                />
                                {errors.due_date && <InputError message={errors.due_date} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status" />
                                <SelectInput 
                                    id="task_status"
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
                            <div className="mt-4">
                                <InputLabel htmlFor="task_priority" value="Task Priority" />
                                <SelectInput 
                                    id="task_priority"
                                    name="priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('priority', e.target.value) }
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>

                                </SelectInput>
                                {errors.priority && <InputError message={errors.priority} className="mt-2" />}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="assigned_user_id" value="Assigned User" />
                                <SelectInput 
                                    id="assigned_user_id"
                                    name="assigned_user_id"
                                    value={data.assigned_user_id}
                                    className="mt-1 block w-full"
                                    onChange={ (e) => setData('assigned_user_id', e.target.value) }
                                >
                                    <option value="">Select User</option>
                                    {users.data.map( (user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ) )}

                                </SelectInput>
                                {errors.assigned_user_id && <InputError message={errors.assigned_user_id} className="mt-2" />}
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route('task.index')}
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