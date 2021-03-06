import findCountryCode from './findCountryCode.js';

export default function createHitFormatter({formatAutocompleteSuggestion, formatInputValue}) {
  return hit => {
    let suggestion = {
      administrative: hit.administrative && hit.administrative[0],
      city: hit.city && hit.city[0],
      country: hit.country,
      countryCode: findCountryCode(hit._tags),
      isCity: hit.is_city,
      lat: hit._geoloc[0].lat,
      lng: hit._geoloc[0].lng,
      name: hit.locale_names[0].trim() // trim should be done in data, waiting for a fix in Places API,
    };

    // this is the value to put inside the input.value
    // autocomplete.js automatically takes hit.value as the underlying
    // input value when a suggestion is validated with enter or selected with the mouse
    suggestion._inputValue = formatInputValue(suggestion);

    // this is the value shown in suggestions, we highlight the name
    suggestion._dropdownHTMLFormatted = formatAutocompleteSuggestion({
      ...suggestion,
      name: hit._highlightResult.locale_names[0].value.trim()
    });

    return suggestion;
  };
}
