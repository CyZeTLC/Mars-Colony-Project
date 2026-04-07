export async function fetchCsrfToken(): Promise<string> {
  const url = 'https://hsbi.cyzetlc.de/dev/api/restApi.php?action=generate_csrf&csrf=init';

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
  const csrf = localStorage.getItem('csrfToken');

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

export async function apiFetchFile(endpoint: string) {
  const csrf = localStorage.getItem('csrfToken');

  if (!csrf) {
    await fetchCsrfToken();
  }

  const url = `https://hsbi.cyzetlc.de/dev/api/restApi.php?action=${endpoint}`;

  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'X-CSRF-Token': csrf!
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} for ${url}`);
    }
    return response.text();

  } catch (error) {
    console.error(`Fetch-Fehler bei ${url}:`, error);
    throw error;
  }
}