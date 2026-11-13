/** Événement envoyé par le lien « Contact » de la navigation : le pied de page y répond. */
export const CONTACT_CALL_EVENT = 'contact:call';

export function callContact(): void {
  window.dispatchEvent(new Event(CONTACT_CALL_EVENT));
}
