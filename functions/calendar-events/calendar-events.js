const util = require('util');
const ical = require('node-ical');

const fromURL = util.promisify(ical.fromURL);

const { ICAL_URL } = process.env;
const EVENT_COUNT = 5;

async function getEvents() {
  const data = await fromURL(ICAL_URL, {});
  return Object.keys(data)
    .filter((id) => {
      if (!id) {
        return false;
      }
      return data[id] && data[id].type === 'VEVENT';
    })
    .map((id) => {
      const event = data[id];

      return {
        id: event.uid,
        isFuture: new Date(event.start) > new Date(),
        startDate: new Date(event.start),
        endDate: new Date(event.end),
        summary: event.summary,
        location: event.location,
        description: event.description,
      };
    });
}

exports.handler = async () => {
  try {
    const allEvents = await getEvents();

    const futurEvents = allEvents.filter((event) => {
      return event.isFuture;
    });
    // Sort ASC
    futurEvents.sort((eventA, eventB) => {
      return eventA.startDate - eventB.startDate;
    });

    const events = futurEvents.slice(0, EVENT_COUNT);

    // Add old events if there is not enough future events
    if (events.length < EVENT_COUNT) {
      const oldEvents = allEvents.filter((event) => {
        return !event.isFuture;
      });
      // Sort ASC
      oldEvents.sort((eventA, eventB) => {
        return eventA.startDate - eventB.startDate;
      });
      events.unshift(
        ...oldEvents.slice(
          -Math.min(oldEvents.length, EVENT_COUNT - futurEvents.length)
        )
      );
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Cache-Control': 'public, s-maxage=1800',
      },
      body: JSON.stringify({
        events,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
