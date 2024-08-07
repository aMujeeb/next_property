export default function PropertyPage({ params }: {
    params: { id: string }
}) {
    return (
        <div>Property id is {params.id}</div>
    )
}