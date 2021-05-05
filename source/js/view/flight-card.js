const dayjs = require('dayjs');
// eslint-disable-next-line no-unused-vars
const local_ru = require('dayjs/locale/ru');

export const createFlightTemplate = (mockFlights) => {
  const flightCost = +mockFlights.flight.price.passengerPrices[0].singlePassengerTotal.amount; // Стоимость на одного взрослого пассажира
  const flightSegmentsLengthTo = mockFlights.flight.legs[0].segments.length; // Полет туда. Если 2 сегмента, то есть пересадка
  const flightSegmentsLengthBack = mockFlights.flight.legs[1].segments.length; // Полет обратно. Если 2 сегмента, то есть пересадка

  const showLegsCountTO = flightSegmentsLengthTo === 1 ? 'visually-hidden' : 'flight__legs-position';
  const showLegsCountBack = flightSegmentsLengthBack === 1 ? 'visually-hidden' : 'flight__legs-position';

  const departureCityTO = mockFlights.flight.legs[0].segments[0].departureCity.caption; // Город из которого вылетели
  const departureAirportTO = mockFlights.flight.legs[0].segments[0].departureAirport.caption; // Город из которого вылетели
  const departureAirportUidTO = mockFlights.flight.legs[0].segments[0].departureAirport.uid; // Идентификатор аэропорта, из которого вылетели
  const arrivalCityTO = flightSegmentsLengthTo === 1 ? mockFlights.flight.legs[0].segments[0].arrivalCity.caption : mockFlights.flight.legs[0].segments[flightSegmentsLengthTo - 1].arrivalCity.caption; // Если пересадок нет, то берем место приземления из того же сегмента/ Если же нет, то из последнего сегмента
  const arrivalAirportTO = flightSegmentsLengthTo === 1 ? mockFlights.flight.legs[0].segments[0].arrivalAirport.caption : mockFlights.flight.legs[0].segments[flightSegmentsLengthTo - 1].arrivalAirport.caption; // Если пересадок нет, то берем аэропорт из того же сегмента/ Если же нет, то из последнего сегмента
  const arrivalAirportUidTO = flightSegmentsLengthTo === 1 ? mockFlights.flight.legs[0].segments[0].arrivalAirport.uid : mockFlights.flight.legs[0].segments[flightSegmentsLengthTo - 1].arrivalAirport.uid; // Если пересадок нет, то берем идентификатор аэропорта из того же сегмента/ Если же нет, то из последнего сегмента

  const departureTimeTO = mockFlights.flight.legs[0].segments[0].departureDate; // Город из которого вылетели
  const arrivalTimeTO = flightSegmentsLengthTo === 1 ? mockFlights.flight.legs[0].segments[0].arrivalDate : mockFlights.flight.legs[0].segments[flightSegmentsLengthTo - 1].arrivalDate;

  const departureTimeBack = mockFlights.flight.legs[1].segments[0].departureDate; // Город из которого вылетели
  const arrivalTimeBack = flightSegmentsLengthBack === 1 ? mockFlights.flight.legs[1].segments[0].arrivalDate : mockFlights.flight.legs[1].segments[flightSegmentsLengthBack - 1].arrivalDate;

  const departureCityBack = mockFlights.flight.legs[1].segments[0].departureCity.caption; // Город из которого вылетели
  const departureAirportBack = mockFlights.flight.legs[1].segments[0].departureAirport.caption; // Город из которого вылетели
  const departureAirportUidBack = mockFlights.flight.legs[1].segments[0].departureAirport.uid; // Идентификатор аэропорта, из которого вылетели
  const arrivalCityBack = flightSegmentsLengthBack === 1 ? mockFlights.flight.legs[1].segments[0].arrivalCity.caption : mockFlights.flight.legs[1].segments[flightSegmentsLengthBack - 1].arrivalCity.caption; // Если пересадок нет, то берем место приземления из того же сегмента/ Если же нет, то из последнего сегмента
  const arrivalAirportBack = flightSegmentsLengthBack === 1 ? mockFlights.flight.legs[1].segments[0].arrivalAirport.caption : mockFlights.flight.legs[1].segments[flightSegmentsLengthBack - 1].arrivalAirport.caption; // Если пересадок нет, то берем аэропорт из того же сегмента/ Если же нет, то из последнего сегмента
  const arrivalAirportUidBack = flightSegmentsLengthBack === 1 ? mockFlights.flight.legs[1].segments[0].arrivalAirport.uid : mockFlights.flight.legs[1].segments[flightSegmentsLengthBack - 1].arrivalAirport.uid; // Если пересадок нет, то берем идентификатор аэропорта из того же сегмента/ Если же нет, то из последнего сегмента

  const airlineCaptionTo = mockFlights.flight.legs[0].segments[0].airline.caption;
  const airlineCaptionBack = mockFlights.flight.legs[1].segments[0].airline.caption;

  const totalSecondsTO = dayjs(arrivalTimeTO).diff(dayjs(departureTimeTO), 'second');
  const totalHoursTO = Math.floor(totalSecondsTO/(60*60));
  const totalMinutesTO = Math.floor(totalSecondsTO/60) - totalHoursTO * 60;

  const totalSecondsBack = dayjs(arrivalTimeBack).diff(dayjs(departureTimeBack), 'second');
  const totalHoursBack = Math.floor(totalSecondsBack/(60*60));
  const totalMinutesBack = Math.floor(totalSecondsBack/60) - totalHoursBack * 60;

  return `<div class="flight__container-inner">
  <div class="flight__container-first">
    <div class="flight__header">
      <img class="flight__header-image" src="./img/${airlineCaptionTo === 'LOT Polish Airlines' ? 'polish-airlines' : 'aeroflot'}.svg" alt="Польские авиалинии">
      <div class="flight__price">
        <p class="flight__price-exact">${flightCost} &#8381;</p>
        <p class="flight__price-description">Стоимость для одного взрослого пассажира</p>
      </div>
    </div>
    <div class="flight__direction">
      <div class="flight__city departure">
        <p class="departure__city">${departureCityTO},</p>
        <p class="departure__airport">${departureAirportTO}</p>
        <span class="departure__iata departure__iata--color">${departureAirportUidTO}</span>
      </div>
      <div class="flight__city arrival">
        <p class="arrival__city">${arrivalCityTO},</p>
        <p class="arrival__airport">${arrivalAirportTO}</p>
        <span class="arrival__iata arrival__iata--color">${arrivalAirportUidTO}</span>
      </div>
    </div>
    <div class="flight__time">
      <div class="flight__time-container">
        <p class="flight__time-departure">${dayjs(departureTimeTO).format('HH:mm')}</p>
        <p class="flight__time-date">${(dayjs(departureTimeTO).locale('ru').format('D MMM dd')).toLowerCase()}</p>
      </div>
      <div>
        <p class="flight__time-total">${totalHoursTO} ч ${totalMinutesTO} мин</p>
      </div>
      <div class="flight__time-container">
        <p class="flight__time-date">${(dayjs(arrivalTimeTO).locale('ru').format('D MMM dd')).toLowerCase()}</p>
        <p class="flight__time-arrival">${dayjs(arrivalTimeTO).format('HH:mm')}</p>
      </div>
    </div>
    <hr class="flight__time-underline" />
    <span class="flight__legs ${showLegsCountTO}">${flightSegmentsLengthTo - 1} пересадка</span>
    <div class="flight__carrier carrier">
      <p class="carrier__name">Рейс выполняет: ${airlineCaptionTo}</p>
    </div>
  </div>
  <div class="flight__container-second">
    <div class="flight__direction">
      <div class="flight__city departure">
        <p class="departure__city">${departureCityBack},</p>
        <p class="departure__airport">${departureAirportBack}</p>
        <span class="departure__iata departure__iata--color">${departureAirportUidBack}</span>
      </div>
      <div class="flight__city arrival">
        <p class="arrival__city">${arrivalCityBack},</p>
        <p class="arrival__airport">${arrivalAirportBack}</p>
        <span class="arrival__iata arrival__iata--color">${arrivalAirportUidBack}</span>
      </div>
    </div>
    <div class="flight__time">
      <div class="flight__time-container">
        <p class="flight__time-departure">${dayjs(departureTimeBack).format('HH:mm')}</p>
        <p class="flight__time-date">${(dayjs(departureTimeBack).locale('ru').format('D MMM dd')).toLowerCase()}</p>
      </div>
      <div class="flight__city-time departure-time">
        <p class="flight__time-total">${totalHoursBack} ч ${totalMinutesBack} мин</p>
      </div>
      <div class="flight__time-container">
        <p class="flight__time-date">${(dayjs(arrivalTimeBack).locale('ru').format('D MMM dd')).toLowerCase()}</p>
        <p class="flight__time-arrival">${dayjs(arrivalTimeBack).format('HH:mm')}</p>
      </div>
    </div>
    <hr class="flight__time-underline" />
    <span class="flight__legs ${showLegsCountBack}">${flightSegmentsLengthBack - 1} пересадка</span>
    <div class="flight__carrier carrier">
      <p class="carrier__name">Рейс выполняет: ${airlineCaptionBack}</p>
    </div>
  </div>
  <a href="#" class="flight__button">Выбрать</a>
</div>`;
};
