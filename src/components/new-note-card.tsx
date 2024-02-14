import { ChangeEvent, FormEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { toast } from "sonner"

export function NewNoteCard() {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [content, setContent] = useState("")

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === "") setShouldShowOnBoarding(true)
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    console.log("content =>", content)
    toast.success("Nota criada com sucesso")
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-500 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece {" "}

                  <button type="button" className="font-medium text-lime-400 hover:underline">
                    gravando uma nota
                  </button>

                  {" "} em áudio ou se preferir {" "}

                  <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline">
                    utilize apenas texto
                  </button>
                </p>
              ) : (
                <textarea autoFocus onChange={handleContentChanged} className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none" />
              )}
            </div>

            <button type="button" onClick={handleSaveNote} className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none hover:bg-lime-500">
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
