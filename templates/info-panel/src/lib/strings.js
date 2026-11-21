// The few words the template writes itself (labels and the "days until" phrase); everything else is data. Six languages, `en` for any other.
const STRINGS = {
  en: { news: 'News', holiday: 'Next holiday', countdown: 'Countdown', countup: 'Count up', joke: 'Joke of the day', daysTo: 'days until', days: 'days', logo: 'YOUR LOGO' },
  pt: { news: 'Notícias', holiday: 'Próximo feriado', countdown: 'Contagem regressiva', countup: 'Contagem progressiva', joke: 'Piada do dia', daysTo: 'dias para', days: 'dias', logo: 'SEU LOGO' },
  es: { news: 'Noticias', holiday: 'Próximo festivo', countdown: 'Cuenta regresiva', countup: 'Cuenta progresiva', joke: 'Chiste del día', daysTo: 'días para', days: 'días', logo: 'SU LOGO' },
  it: { news: 'Notizie', holiday: 'Prossima festività', countdown: 'Conto alla rovescia', countup: 'Conteggio progressivo', joke: 'Barzelletta del giorno', daysTo: 'giorni a', days: 'giorni', logo: 'IL TUO LOGO' },
  de: { news: 'Nachrichten', holiday: 'Nächster Feiertag', countdown: 'Countdown', countup: 'Zähler', joke: 'Witz des Tages', daysTo: 'Tage bis', days: 'Tage', logo: 'IHR LOGO' },
  nl: { news: 'Nieuws', holiday: 'Volgende feestdag', countdown: 'Aftellen', countup: 'Optellen', joke: 'Mop van de dag', daysTo: 'dagen tot', days: 'dagen', logo: 'UW LOGO' },
};

/** The language of the screen from the player's locale ("pt_br" -> "pt"). */
export const lngOf = (locale) => String(locale || 'en').split(/[_-]/)[0].toLowerCase() || 'en';

/** The strings of a language, `en` when it is not one of the six. */
export const stringsOf = (lng) => STRINGS[lng] || STRINGS.en;
