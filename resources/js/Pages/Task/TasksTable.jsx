import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants.jsx';
import { router } from '@inertiajs/react';
export default function TasksTable({tasks, queryParms, projectId = null}) {

    queryParms = queryParms || {};

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParms[name] = value;
        } else {
            delete queryParms[name];
        }

        if(projectId) {
            router.get(route('project.show', [projectId, queryParms]));
        } else {
            router.get(route('task.index', queryParms));
        }
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

        if(projectId) {
            router.get(route('project.show', [projectId, queryParms]));
        } else {
            router.get(route('task.index', queryParms));
        }
    }


    return (
        <>
            {/* Table Responsive wrapper */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                            {!projectId && (<th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>)}
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                <TextInput
                                    defaultValue={queryParms.name}
                                    className="w-full"
                                    placeholder="Task Name"
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
                            <TableHeading
                                name="id"
                                sort_field={queryParms.sort_field}
                                sort_direction={queryParms.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <TableHeading sortable = {false}>
                                Image
                            </TableHeading>
                            {!projectId && (
                                <TableHeading sortable = {false}>
                                    Project Name
                                </TableHeading>
                            )}
                            <TableHeading
                                name="name"
                                sort_field={queryParms.sort_field}
                                sort_direction={queryParms.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            <TableHeading
                                name="status"
                                sort_field={queryParms.sort_field}
                                sort_direction={queryParms.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParms.sort_field}
                                sort_direction={queryParms.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Created Date
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sort_field={queryParms.sort_field}
                                sort_direction={queryParms.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Created By</th>
                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => (
                            <tr key={task.id} className="divide-x divide-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <img className="h-10 w-10 rounded-sm" src={task.image_path} alt={task.name} />
                                </td>
                                {!projectId && (<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.project.name}</td>)}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[task.status]}`}>
                                        {PROJECT_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.created_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.due_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.createdBy.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex space-x-2">
                                    <a href={route('task.edit', task.id)} className="text-indigo-600 hover:text-indigo-900">View</a>
                                    <a href={route('task.destroy', task.id)} className="text-red-600 hover:text-red-800">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <Pagination links={tasks.meta.links} />
            </div>
        </>
    )
}