import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNoteById } from "@/app/lib/api"
import NoteDetailClient from "./NoteDetails.client"

interface NoteDetailsProps {
    params: Promise<{
        id: string
    }>
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id)
    })
    return (
        <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailClient noteId={id}/>
        </HydrationBoundary>
        </>
    )
}

export default NoteDetails