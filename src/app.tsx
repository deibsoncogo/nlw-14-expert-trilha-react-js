import { ChangeEvent, useState } from "react"
import logo from "./assets/logo.svg"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState("")

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes")

    if (notesOnStorage) return JSON.parse(notesOnStorage)

    return []
  })

  const filteredNotes = search !== ""
    ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search))
    : notes

  function onNoteCreated(content: string) {
    const newNote = { id: crypto.randomUUID(), date: new Date(), content }

    const notesArray = [newNote, ...notes]

    setNotes([newNote, ...notes])

    localStorage.setItem("notes", JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value.toLocaleLowerCase())
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id
    })

    localStorage.setItem("notes", JSON.stringify(notesArray))
  }

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Busque em suas notas..."
          className="placeholder:text-state-500 w-full bg-transparent text-3xl font-semibold tracking-tight outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  )
}
