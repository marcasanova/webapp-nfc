"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createAlbum, type CreateAlbumState } from "@/app/actions/albums";
import { ALBUM_EMOJIS, DEFAULT_ALBUM_EMOJI } from "@/lib/album-emojis";
import { COUNTRIES } from "@/lib/countries";

const initialState: CreateAlbumState = { error: null };

export function CreateAlbumLauncher() {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState(DEFAULT_ALBUM_EMOJI);
  const [state, formAction, pending] = useActionState(
    createAlbum,
    initialState,
  );
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pending]);

  function close() {
    if (!pending) setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-full bg-tierra px-6 text-base font-semibold text-blanco shadow-sm shadow-piedra/15 transition-transform duration-150 hover:scale-[1.02] active:scale-95 sm:w-auto sm:text-sm"
      >
        + Nuevo álbum
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="flex h-[min(92dvh,40rem)] w-full max-w-md flex-col overflow-hidden rounded-t-[1.75rem] border border-surface-border bg-blanco shadow-xl shadow-piedra/10 sm:h-auto sm:max-h-[min(90dvh,40rem)] sm:rounded-3xl"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 flex-col items-center border-b border-surface-border px-4 pb-3 pt-3 sm:px-6 sm:pt-5">
                <div
                  className="mb-3 h-1 w-10 rounded-full bg-borde sm:hidden"
                  aria-hidden
                />
                <div className="flex w-full items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2
                      id={titleId}
                      className="text-xl font-bold text-foreground"
                    >
                      Nuevo álbum
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Un emoji, un nombre y el país. Los tres.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    disabled={pending}
                    aria-label="Cerrar"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-surface-border text-lg leading-none text-muted-foreground transition-transform duration-150 hover:text-foreground active:scale-95 disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form
                action={formAction}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
                  <input type="hidden" name="emoji" value={emoji} />

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Emoji del álbum
                      </span>
                      <div className="grid grid-cols-5 gap-1.5 rounded-2xl border border-surface-border bg-arena p-2 sm:grid-cols-8 sm:gap-2 sm:p-2.5">
                        {ALBUM_EMOJIS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setEmoji(option)}
                            aria-label={`Emoji ${option}`}
                            aria-pressed={emoji === option}
                            className={`flex aspect-square min-h-[44px] w-full items-center justify-center rounded-xl text-xl transition-transform duration-150 active:scale-95 sm:text-2xl ${
                              emoji === option
                                ? "bg-tierra text-blanco shadow-sm shadow-tierra/25"
                                : "bg-blanco/60 hover:bg-borde/80"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Nombre del álbum
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={80}
                        autoComplete="off"
                        enterKeyHint="next"
                        placeholder="Ej. Verano en Kioto"
                        className="h-12 min-h-[44px] w-full rounded-xl border border-surface-border bg-arena px-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-tierra"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="country_code"
                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        País
                      </label>
                      <select
                        id="country_code"
                        name="country_code"
                        required
                        defaultValue=""
                        className="h-12 min-h-[44px] w-full appearance-none rounded-xl border border-surface-border bg-arena bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 text-base text-foreground outline-none focus:border-tierra"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%237d766f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="" disabled>
                          Selecciona un país
                        </option>
                        {COUNTRIES.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {state.error ? (
                      <p className="text-sm text-lust" role="alert">
                        {state.error}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="shrink-0 border-t border-surface-border bg-blanco px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-5">
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={close}
                      disabled={pending}
                      className="inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-full px-5 text-base font-medium text-muted-foreground transition-transform duration-150 hover:bg-arena hover:text-foreground active:scale-95 disabled:opacity-50 sm:w-auto sm:text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-full bg-tierra px-6 text-base font-semibold text-blanco transition-transform duration-150 hover:opacity-90 active:scale-95 disabled:opacity-60 sm:w-auto sm:text-sm"
                    >
                      {pending ? "Creando…" : "Crear álbum"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
