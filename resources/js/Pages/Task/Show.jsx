import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constants.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from '../Task/TasksTable';

export default function Show({task}) {
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {`Task: ${task.name}`}
                        </h2>
                    }
        >
            <Head title={`Task: ${task.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1">
                                <div className="...">
                                    <img className="w-full h-64 object-cover border-2" src={task.image_path}></img>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Task ID</h2>
                                    <p>{task.id}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Due Date</h2>
                                    <p>{task.due_date}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Task Name</h2>
                                    <p>{task.name}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Created Date</h2>
                                    <p>{task.created_at}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Task Status</h2>
                                    <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Task Priority</h2>
                                    <span className={`px-2 py-1 rounded text-white ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}>
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Updated By</h2>
                                    <p>{task.created_at}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Project</h2>
                                    <p>
                                        <Link href={route('project.show', task.project.id)} className="text-indigo-600 hover:text-indigo-900">
                                            {task.project.name}
                                        </Link>
                                    </p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Created By</h2>
                                    <p>{task.createdBy.name}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Assigned User</h2>
                                    <p>{task.assignedUser.name}</p>
                                </div>
                                <div className="...">
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Task Description</h2>
                                    <p>{task.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}