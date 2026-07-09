import { apiFetch } from './restApi';

type NumericDatabaseValue = number | string;

export interface ProcedureResponse<T> {
    result: T[];
}

export interface Nachschubanforderung {
    NACHSCHUBANFORDERUNG_ID: string;
    RESSOURCE_ID: NumericDatabaseValue;
    RESSOURCE_TYP: string;
    LAGER_ID: NumericDatabaseValue | null;
    LAGERTYP: string | null;
    AKTUELLE_MENGE: NumericDatabaseValue;
    MENGE_EINHEIT: string | null;
    MIN_SCHWELLENWERT: NumericDatabaseValue | null;
    VERBRAUCH_PRO_SOL: NumericDatabaseValue | null;
    SICHERHEITSPUFFER_7_SOL: NumericDatabaseValue;
    ANFORDERUNGSMENGE: NumericDatabaseValue;
    INTERN_VERFUEGBARE_MENGE: NumericDatabaseValue;
    ANFORDERUNGSGRUND: string;
    ANFORDERUNGSPRIORITAET: 'HOCH' | 'MITTEL' | 'NIEDRIG';
    EMPFOHLENE_MASSNAHME:
        | 'BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN'
        | 'INTERNE_UMLAGERUNG_PRUEFEN'
        | 'EXTERNEN_NACHSCHUB_ANFORDERN';
}

/**
 * Ruft die vorbereitete BP1-Action typisiert auf.
 *
 * Die Funktion wird erst in einer Seite verwendet, nachdem die Procedure
 * in der Präsentationsdatenbank importiert und der API-Endpunkt getestet ist.
 */
export function getBp1ReplenishmentRequirements(): Promise<
    ProcedureResponse<Nachschubanforderung>
> {
    return apiFetch<ProcedureResponse<Nachschubanforderung>>(
        'get_bp1_replenishment_requirements',
    );
}
