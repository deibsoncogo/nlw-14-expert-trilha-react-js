export function NoteCard() {
  return (
    <button type="button" className="relative space-y-3 overflow-hidden rounded-md bg-slate-800 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-600">
      <span className="text-sm leading-6 text-slate-300">
        há 2 dias
      </span>

      <p className="text-sm leading-6 text-slate-400">
        Hoje foi um dia agitado e cheio de tarefas importantes
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  )
}
