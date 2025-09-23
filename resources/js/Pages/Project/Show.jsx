import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from '../Task/TasksTable';

export default function Show({ auth, project, tasks, queryParms = null  }) {
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {`Project: ${project.name}`}
                        </h2>
                    }
        >
            <Head title={`Project: ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1">
                                <div className="...">
                                    <img className="w-full h-64 object-cover" src={project.image_path}></img>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Project ID</h2>
                                    <p>{project.id}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Due Date</h2>
                                    <p>{project.due_date}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Project Name</h2>
                                    <p>{project.name}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Created Date</h2>
                                    <p>{project.created_at}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Project Status</h2>
                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </span>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Updated By</h2>
                                    <p>{project.created_at}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Created By</h2>
                                    <p>{project.createdBy.name}</p>
                                </div>
                                <div className="...">
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Project Description</h2>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable
                                tasks={tasks}
                                queryParms={queryParms}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}