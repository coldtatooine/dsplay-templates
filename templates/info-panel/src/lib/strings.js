// The few words the template writes itself (labels and the "days until" phrase); everything else is data. Six languages, `en` for any other.
const STRINGS = {
  en: { news: 'News', holiday: 'Next holiday', countdown: 'Countdown', countup: 'Count up', joke: 'Joke of the day', daysTo: 'days until', days: 'days', logo: 'YOUR LOGO', humidity: 'Humidity', wind: 'Wind', sunrise: 'Sunrise', sunset: 'Sunset', today: 'Today', in: 'in', holidays: 'Next holidays', clock: 'Time', weather: 'Weather' },
  pt: { news: 'Notícias', holiday: 'Próximo feriado', countdown: 'Contagem regressiva', countup: 'Contagem progressiva', joke: 'Piada do dia', daysTo: 'dias para', days: 'dias', logo: 'SEU LOGO', humidity: 'Umidade', wind: 'Vento', sunrise: 'Nascer do sol', sunset: 'Pôr do sol', today: 'Hoje', in: 'em', holidays: 'Próximos feriados', clock: 'Hora certa', weather: 'Clima' },
  es: { news: 'Noticias', holiday: 'Próximo festivo', countdown: 'Cuenta regresiva', countup: 'Cuenta progresiva', joke: 'Chiste del día', daysTo: 'días para', days: 'días', logo: 'SU LOGO', humidity: 'Humedad', wind: 'Viento', sunrise: 'Amanecer', sunset: 'Atardecer', today: 'Hoy', in: 'en', holidays: 'Próximos festivos', clock: 'Hora', weather: 'Clima' },
  it: { news: 'Notizie', holiday: 'Prossima festività', countdown: 'Conto alla rovescia', countup: 'Conteggio progressivo', joke: 'Barzelletta del giorno', daysTo: 'giorni a', days: 'giorni', logo: 'IL TUO LOGO', humidity: 'Umidità', wind: 'Vento', sunrise: 'Alba', sunset: 'Tramonto', today: 'Oggi', in: 'tra', holidays: 'Prossime festività', clock: 'Ora', weather: 'Meteo' },
  de: { news: 'Nachrichten', holiday: 'Nächster Feiertag', countdown: 'Countdown', countup: 'Zähler', joke: 'Witz des Tages', daysTo: 'Tage bis', days: 'Tage', logo: 'IHR LOGO', humidity: 'Feuchte', wind: 'Wind', sunrise: 'Sonnenaufgang', sunset: 'Sonnenuntergang', today: 'Heute', in: 'in', holidays: 'Nächste Feiertage', clock: 'Uhrzeit', weather: 'Wetter' },
  nl: { news: 'Nieuws', holiday: 'Volgende feestdag', countdown: 'Aftellen', countup: 'Optellen', joke: 'Mop van de dag', daysTo: 'dagen tot', days: 'dagen', logo: 'UW LOGO', humidity: 'Vochtigheid', wind: 'Wind', sunrise: 'Zonsopkomst', sunset: 'Zonsondergang', today: 'Vandaag', in: 'over', holidays: 'Volgende feestdagen', clock: 'Tijd', weather: 'Weer' },
};

/** The language of the screen from the player's locale ("pt_br" -> "pt"). */
export const lngOf = (locale) => String(locale || 'en').split(/[_-]/)[0].toLowerCase() || 'en';

/** The strings of a language, `en` when it is not one of the six. */
export const stringsOf = (lng) => STRINGS[lng] || STRINGS.en;
