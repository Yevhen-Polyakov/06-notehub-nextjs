import axios from "axios";
import { NewNote, Note } from "@/types/notes";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? process.env.NEXT_PUBLIC_NOTEHUB_TOKE ?? "";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export async function fetchNotes(query: string, page: number): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}