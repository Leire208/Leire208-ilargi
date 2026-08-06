export function getUpcomingEvents(events) {

  const now = new Date();

  return events

    .map(event => {

      const date = new Date(event.date);

      const [h, m] = event.startTime.split(":");

      date.setHours(Number(h));
      date.setMinutes(Number(m));
      date.setSeconds(0);

      return {

        ...event,

        eventDate: date

      };

    })

    .filter(event =>

      event.eventDate >= now

    )

    .sort(

      (a, b) =>

        a.eventDate - b.eventDate

    );

}

export function getNextEvent(events){

  const upcoming = getUpcomingEvents(events);

  return upcoming[0] || null;

}

export function getRelativeTime(event){

  if(!event) return "";

  const now = new Date();

  const diff = event.eventDate - now;

  const minutes = Math.floor(diff / 60000);

  if(minutes < 60){

    return `Empieza en ${minutes} min`;

  }

  const hours = Math.floor(minutes / 60);

  if(hours < 24){

    return `Empieza en ${hours} h ${minutes % 60} min`;

  }

  const days = Math.floor(hours / 24);

  if(days === 1){

    return "Mañana";

  }

  return `En ${days} días`;

}