
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import TasksTable from './TasksTable';

export default function Index({tasks, queryParms = null, success = null}) {

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task {success}
                    </h2>
                    <Link
                        href={route('task.create')}
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Create New Task
                    </Link>
                </div>
            }
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        
                            <TasksTable
                                tasks={tasks}
                                queryParms={queryParms}
                                success={success}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
