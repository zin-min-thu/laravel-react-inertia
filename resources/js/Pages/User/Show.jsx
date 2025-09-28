import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({user }) {
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {`User: ${user.name}`}
                        </h2>
                    }
        >
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">User ID</h2>
                                    <p>{user.id}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">User Name</h2>
                                    <p>{user.name}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">User Email</h2>
                                    <p>{user.email}</p>
                                </div>
                                <div className="...">
                                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Created Date</h2>
                                    <p>{user.created_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}