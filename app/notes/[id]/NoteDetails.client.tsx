"use client"
import { useQuery } from "@tanstack/react-query"
import css from "./NoteDetails.module.css"
import { fetchNoteById } from "@/lib/api"

interface NoteDetailClientProps {
    noteId: string
}

const NoteDetailClient = ({ noteId }: NoteDetailClientProps) => {
    const {data: note, isLoading, error} = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
    })

    if (isLoading) {
        return <p>Loading, please wait...</p>
    }

    if (error) {
        return <p>Something went wrong.</p>
    }

    if (!note) {
        return <p>Note not found.</p>
    }

    return(
        
       <div className={css.container}>
	        <div className={css.item}>
	            <div className={css.header}>
	                <h2>{note.title}</h2>
	            </div>
                <p className={css.tag}>{note.tag}</p>
	            <p className={css.content}>{note.content}</p>
	            <p className={css.date}>{note.createdAt}</p>
	        </div>
        </div>

    )
}

export default NoteDetailClient