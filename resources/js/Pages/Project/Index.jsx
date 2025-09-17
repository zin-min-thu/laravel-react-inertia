import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Index({ auth , projects, queryParms = null }) {

    if(!queryParms) {
        queryParms = {};
    }

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParms[name] = value;
        } else {
            delete queryParms[name];
        }

        router.get(route('project.index', queryParms));
    }

    const onKeyPress = (name, e) => {

        if(e.key !== 'Enter') {
            return;
        }

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(queryParms.sort_field === name) {
            queryParms.sort_direction = queryParms.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParms.sort_field = name;
            queryParms.sort_direction = 'asc';
        }

        router.get(route('project.index', queryParms));
    }


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
                            
                            {/* Table Responsive wrapper */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <TextInput
                                                    defaultValue={queryParms.name}
                                                    className="w-full"
                                                    placeholder="Project Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <SelectInput
                                                    defaultValue={queryParms.status}
                                                    className="w-full"
                                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                        </tr>
                                        <tr className="divide-x divide-gray-200">
                                            <th onClick={e => sortChanged('id')}>
                                                <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                                                    ID
                                                    <div>
                                                        <ChevronUpIcon className="w-4" />
                                                        <ChevronDownIcon className="w-4 -mt-1" />
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Image</th>
                                            <th onClick={e => sortChanged('name')}>
                                                <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                                                    Name
                                                    <div>
                                                        <ChevronUpIcon className="w-4" />
                                                        <ChevronDownIcon className="w-4 -mt-1" />
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={e => sortChanged('status')}>
                                                <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                                                    Status
                                                    <div>
                                                        <ChevronUpIcon className="w-4" />
                                                        <ChevronDownIcon className="w-4 -mt-1" />
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={e => sortChanged('created_at')} className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                                                    Created Date
                                                    <div>
                                                        <ChevronUpIcon className="w-4" />
                                                        <ChevronDownIcon className="w-4 -mt-1" />
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={e => sortChanged('due_date')} className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                                                    Due Date
                                                    <div>
                                                        <ChevronUpIcon className="w-4" />
                                                        <ChevronDownIcon className="w-4 -mt-1" />
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Created By</th>
                                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr key={project.id} className="divide-x divide-gray-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <img className="h-10 w-10 rounded-full" src={project.image_path} alt={project.name} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.created_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.due_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.createdBy.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex space-x-2">
                                                    <a href={route('project.edit', project.id)} className="text-indigo-600 hover:text-indigo-900">View</a>
                                                    <a href={route('project.destroy', project.id)} className="text-red-600 hover:text-red-800">Edit</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
