/**
 * Holt Daten von einem definierten API-Endpunkt und stellt die Rückgabe typisiert bereit.
 * @template T Der erwartete Typ der zurückgegebenen Daten (z.B. User[]).
 * @param {string} endpoint Der relative Pfad zum API-Endpunkt
 * @returns {Promise<T>} Ein Promise, das mit den typisierten JSON-Daten aufgelöst wird.
 */
export async function apiFetch<T>(endpoint: string): Promise<T> {
  const url = 'https://hsbi.cyzetlc.de/api/' + endpoint + "/"; 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} for ${url}`);
    }

    const data: T = await response.json();
    return data;
    
  } catch (error) {
    console.error(`Fetch-Fehler bei ${url}:`, error);
    throw error; 
  }
}