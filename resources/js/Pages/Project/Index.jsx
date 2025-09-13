import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth , projects }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project
                </h2>
            }
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr className="divide-x divide-gray-200">
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>ID</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Image</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Name</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Status</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Created Date</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Due Date</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Created By</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:pl-6'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="divide-x divide-gray-200">
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.id}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>
                                                <img className='h-10 w-10 rounded-full' src={project.image_path} alt={project.name} />
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.name}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.status}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.created_at}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.due_date}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>{project.createdBy.name}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 sm:pl-6'>
                                                <a href={route('project.show', project.id)} className="text-indigo-600 hover:text-indigo-900">View</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}