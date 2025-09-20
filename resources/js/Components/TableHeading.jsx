import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function TableHeading({ name, sortable = true, sort_field = null, sort_direction = null, sortChanged = () => {}, children }) {
    return (
        <th onClick={e => sortChanged(name)}>
            <div className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4" + 
                                (
                                    sort_field === name &&
                                    sort_direction === 'asc'
                                    ? ' text-blue-700'
                                    : ' text-gray-500'
                                )
                        } />
                        <ChevronDownIcon 
                            className={
                                "w-4 -mt-1" +
                                (
                                    sort_field === name &&
                                    sort_direction === 'desc'
                                    ? ' text-blue-700'
                                    : ' text-gray-500'
                                )
                            } />
                    </div>
                )}
            </div>
        </th>
    );
}