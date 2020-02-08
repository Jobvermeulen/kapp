export interface ICarIssue {
    kenteken: string;
    soort_erkenning_keuringsinstantie: string;
    meld_datum_door_keuringsinstantie: number;
    meld_tijd_door_keuringsinstantie: number;
    gebrek_identificatie: string;
    gebrek_identificatie_text?: string;
    soort_erkenning_omschrijving: string;
    aantal_gebreken_geconstateerd: string;
}
