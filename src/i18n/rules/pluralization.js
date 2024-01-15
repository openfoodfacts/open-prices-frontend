function getPluralizationRules(locale) {
  return new Intl.PluralRules(locale, { type: 'cardinal' });
}

function ruPluralizationRules(choice, choicesLength) {
  const pluralRules = getPluralizationRules('ru');
  
  switch (pluralRules.select(choice)) {
    case 'zero':
      return 0;
    case 'one':
      return 1;
    case 'two':
    case 'few':
      return 2;
    default:
      return 3;
  }
}

function frPluralizationRules(choice, choicesLength) {
  const pluralRules = getPluralizationRules('fr');
  
  switch (pluralRules.select(choice)) {
    case 'zero':
      return 0;
    case 'one':
      return 1;
    case 'two':
      return 2;
    case 'few':
      return 3;
    case 'many':
      return 4;
    default:
      return 5;
  }
}

function esPluralizationRules(choice, choicesLength) {
  const pluralRules = getPluralizationRules('es');
  
  switch (pluralRules.select(choice)) {
    case 'one':
      return 1;
    default:
      return 5;
  }
}

function dePluralizationRules(choice, choicesLength) {
  const pluralRules = getPluralizationRules('de');
  
  switch (pluralRules.select(choice)) {
    case 'zero':
      return 0;
    case 'one':
      return 1;
    default:
      return 5;
  }
}

export default {
  ru: ruPluralizationRules,
  fr: frPluralizationRules,
  es: esPluralizationRules,
  de: dePluralizationRules,
};