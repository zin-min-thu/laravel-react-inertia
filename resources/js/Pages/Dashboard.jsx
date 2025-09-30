import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants.jsx';

export default function Dashboard({ statusCounts, myStatusCounts, activeTasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {/* <pre>{JSON.stringify(myStatusCounts, null, 2)}</pre>
            <pre>{JSON.stringify(statusCounts, null, 2)} </pre> */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium leading-tight mb-2 text-yellow-600">Pending Tasks</h3>
                            <span className="mr-2">{myStatusCounts.pending}</span> / <span className="ml-2">{statusCounts.pending}</span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium leading-tight mb-2 text-blue-600">In Progress Tasks</h3>
                            <span className="mr-2">{myStatusCounts.in_progress}</span> / <span className="ml-2">{statusCounts.in_progress}</span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium leading-tight mb-2 text-green-600">Completed Tasks</h3>
                            <span className="mr-2">{myStatusCounts.completed}</span> / <span className="ml-2">{statusCounts.completed}</span>
                        </div>
                    </div>
                </div>

                {/* Active Tasks Card */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium leading-tight mb-4 text-gray-600">Active Tasks</h3>
                            <table className="min-w-full border border-gray-200 rounded">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b uppercase">ID</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b uppercase">Project Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b uppercase">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b uppercase">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks && activeTasks.length > 0 ? (
                                        activeTasks.map(task => (
                                            <tr key={task.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 border-b">{task.id}</td>
                                                <td className="px-4 py-2 border-b">
                                                    <Link href={route('project.show', task.project.id)} className="text-gray-600 hover:underline">
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <Link href={route('task.show', task.id)} className="text-gray-600 hover:underline">
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 border-b">{task.due_date}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-4 text-center text-gray-500">No active tasks found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
