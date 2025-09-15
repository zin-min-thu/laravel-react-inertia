import { Link } from '@inertiajs/react'

export default function Pagination({links}) {
    return (
        <nav className="text-center mt-4">
            {links.map((link, i) => (
                <Link
                    preserveScroll
                    key={i}
                    href={link.url || '#'}
                    className={"inline-block py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700" + 
                        (link.active ? ' bg-gray-100 text-gray-700 ' : ' ') +
                        (link.url === null ? ' pointer-events-none opacity-50 ' : ' ')}
                    dangerouslySetInnerHTML={{__html: link.label}}
                >
                
                </Link>
            ))}
        </nav>
    )
}