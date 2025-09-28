import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

import TableHeading from '@/Components/TableHeading';

export default function Index({ auth , users, queryParms = null, success = null}) {

    if(!queryParms) {
        queryParms = {};
    }

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParms[name] = value;
        } else {
            delete queryParms[name];
        }

        router.get(route('user.index', queryParms));
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

        router.get(route('user.index', queryParms));
    }

    const deleteUser = (ev, user) => {
        if(!confirm("Are you sure?")) {
            ev.preventDefault();
        }

        router.delete(route('user.destroy', user.id));
    }


    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User
                    </h2>
                    <Link
                        href={route('user.create')}
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Create New User
                    </Link>
                </div>
            }
        >
            <Head title="User" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div> )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {/* Table Responsive wrapper */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <TextInput
                                                    defaultValue={queryParms.name}
                                                    className="w-full"
                                                    placeholder="User Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                <TextInput
                                                    defaultValue={queryParms.email}
                                                    className="w-full"
                                                    placeholder="User Email"
                                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                                    onKeyPress={e => onKeyPress('email', e)}
                                                />
                                            </th>
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
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParms.sort_field}
                                                sort_direction={queryParms.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="email"
                                                sort_field={queryParms.sort_field}
                                                sort_direction={queryParms.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Email
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParms.sort_field}
                                                sort_direction={queryParms.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>
                                            <th className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="divide-x divide-gray-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline hover:text-indigo-600">
                                                    <Link href={route('user.show', user.id)}>
                                                    {user.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline hover:text-indigo-600">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.created_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex space-x-2">
                                                    <a href={route('user.edit', user.id)} className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                    {/* <a href={route('user.destroy', user.id)} className="text-red-600 hover:text-red-800">Delete</a> */}

                                                    <button onClick={ev => deleteUser(ev, user)} className="text-red-600 hover:text-red-800">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                <Pagination links={users.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
