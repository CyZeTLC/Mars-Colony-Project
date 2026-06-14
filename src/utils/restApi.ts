export async function fetchCsrfToken(): Promise<string> {
  const url = 'https://hsbi.cyzetlc.de/dev/api/restApi.php?action=generate_csrf';

  const res = await fetch(url, {
    credentials: 'include'
  });

  const data = await res.json();

  localStorage.setItem('csrfToken', data.csrf);
  return data.csrf;
}

/**
 * Holt Daten von einem definierten API-Endpunkt und stellt die Rückgabe typisiert bereit.
 * @template T Der erwartete Typ der zurückgegebenen Daten (z.B. User[]).
 * @param {string} endpoint Der relative Pfad zum API-Endpunkt
 * @returns {Promise<T>} Ein Promise, das mit den typisierten JSON-Daten aufgelöst wird.
 */
export async function apiFetch<T>(endpoint: string): Promise<T> {
  let csrf = localStorage.getItem('csrfToken');

  if (!csrf) {
    await fetchCsrfToken();
  }

  var url = `https://hsbi.cyzetlc.de/api/${endpoint}/`;

  if (endpoint === 'vehicles') {
    url = `https://hsbi.cyzetlc.de/api/${endpoint}/`;
  } else {
    url = `https://hsbi.cyzetlc.de/dev/api/restApi.php?action=${endpoint}`;
  }

  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'X-CSRF-Token': csrf!
      }
    });

    if (response.status === 403) {
      csrf = await fetchCsrfToken();

      const retry = await fetch(url, {
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrf!
        }
      });

      if (!retry.ok) {
        throw new Error(`HTTP Error (retry)! Status: ${retry.status}`);
      }

      return retry.json();
    }

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

export async function apiFetchFile(endpoint: string) : Promise<string> {
  return apiFetch<string>(`get_sql_result&file=${endpoint}`);
}