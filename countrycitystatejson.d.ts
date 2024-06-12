declare module 'countrycitystatejson' {
    export function getAllCountries(): any[];
    export function getStatesOfCountry(countryCode: string): any[];
    export function getCitiesOfState(stateCode: string): any[];
    // Agrega otras funciones según sea necesario
  }
  