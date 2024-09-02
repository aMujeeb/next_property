import Link from "next/link";

interface Props {
    page: number,
    pageSize: number,
    total: number
}

export default function Pagination({ page, pageSize, total }: Props) {
    return (
        < section className="container mx-auto flex justify-center items-center my-8" >
            {page > 1 ? (
                <Link href="#" className="mr-2 px-2 py-1 border border-gray-300 rounded">Previous</Link>
            ) : null}

            <span className="mx-2">Page 1 of 4</span>

            {page < total ? (
                <Link href="#" className="mr-2 px-2 py-1 border border-gray-300 rounded">Next</Link>
            ) : null}
        </section >
    )
}