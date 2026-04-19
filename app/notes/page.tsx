import { dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import css from "./NotesClient.module.css"
import { fetchNotes } from "../lib/api"
import NoteClient from "./Notes.client"

const Notes = async () => {
     const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notes", ""],
        queryFn: () =>  fetchNotes("", 1),
    })
    return(
        
         <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteClient/>
            </HydrationBoundary>
      
        </div>
        
    )
}

export default Notes