import {
  createFormTemplate
} from './view/flight-form.js';
import {
  createFlightTemplate
} from './view/flight-card.js';
import {
  createShowMoreButtonTemplate
} from './view/show-more.js';
import {
  mockFlights
} from './mock/mock.js';

const FIRST_SCREEN_FLIGHTS_COUNT = 2;
const FLIGHTS_COUNT_PER_STEP = 2;
const ONE_FLIGHT_TRANSFER = 1;
const MIN_PRICE = '0';
const MAX_PRICE = '10000';
const POLISH_AIRLINES_NAME = 'LOT Polish Airlines';
const RUSSIAN_AIRLINES_NAME = 'Аэрофлот - российские авиалинии';

const mockFlightsList = mockFlights.result.flights.sort((a, b) => {
  return a.flight.price.total.amount - b.flight.price.total.amount;
});

const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteFilterSectionElement = document.querySelector('.page-body__filter');
const siteFlightsSectionElement = document.querySelector('.flight__container');
const showMoreButtonContainer = document.querySelector('.show-more__button-container');

renderTemplate(siteFilterSectionElement, createFormTemplate());

for (let i = 0; i < FIRST_SCREEN_FLIGHTS_COUNT; i++) {
  renderTemplate(siteFlightsSectionElement, createFlightTemplate(mockFlightsList[i]));
}

if (mockFlightsList.length > FLIGHTS_COUNT_PER_STEP) {
  let renderedFlightsCount = FLIGHTS_COUNT_PER_STEP;

  renderTemplate(showMoreButtonContainer, createShowMoreButtonTemplate());

  const loadMoreFlightsButton = showMoreButtonContainer.querySelector('.flight__show-more');
  loadMoreFlightsButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    mockFlightsList
      .slice(renderedFlightsCount, renderedFlightsCount + FLIGHTS_COUNT_PER_STEP)
      .forEach((flight) => renderTemplate(showMoreButtonContainer, createFlightTemplate(flight), 'beforebegin'));

    renderedFlightsCount += FLIGHTS_COUNT_PER_STEP;

    if (renderedFlightsCount >= mockFlightsList.length) {
      loadMoreFlightsButton.remove();
    }
  });
}

// filter

const form = document.querySelector('.form');
const sortPriceIncrease = document.querySelector('#price-increase');
const sortPriceDecrease = document.querySelector('#price-decrease');
const priceTime = document.querySelector('#time');
const oneTranfer = document.querySelector('#one-transfer');
const noTransfer = document.querySelector('#no-transfer');
const minPrice = document.querySelector('#price-min');
const maxPrice = document.querySelector('#price-max');
const polishAirlines = document.querySelector('#polish-airlines');
const russianAirlines = document.querySelector('#aeroflot');

form.addEventListener('change', () => {

  const customArr = mockFlightsList.slice();

  siteFlightsSectionElement.innerHTML = '';
  showMoreButtonContainer.innerHTML = '';

  const sortFilters = (customArr) => {
    if (sortPriceIncrease.checked) {
      customArr = mockFlights.result.flights.sort((a, b) => {
        return a.flight.price.total.amount - b.flight.price.total.amount;
      });
    } else if (sortPriceDecrease.checked) {
      customArr = mockFlights.result.flights.sort((a, b) => {
        return b.flight.price.total.amount - a.flight.price.total.amount;
      });
    } else if (priceTime.checked) {
      customArr = mockFlights.result.flights.sort((a, b) => {
        return (a.flight.legs[0].segments.length === 1 ? a.flight.legs[0].segments[0].travelDuration : a.flight.legs[0].segments[0].travelDuration + a.flight.legs[0].segments[1].travelDuration) - (b.flight.legs[0].segments.length === 1 ? b.flight.legs[0].segments[0].travelDuration : b.flight.legs[0].segments[0].travelDuration + b.flight.legs[0].segments[1].travelDuration);
      });
    }
    return customArr;
  };

  const legsFilter = (customArr) => {
    if (oneTranfer.checked) {
      return customArr.filter((flight) => flight.flight.legs[0].segments.length === FLIGHTS_COUNT_PER_STEP);
    } else if (noTransfer.checked) {
      return customArr.filter((flight) => flight.flight.legs[0].segments.length === ONE_FLIGHT_TRANSFER);
    }
    return customArr;
  };

  const priceFilter = (customArr) => {
    if (minPrice.value === MIN_PRICE && maxPrice.value === MAX_PRICE) {
      return customArr;
    } else if (minPrice.value !== MIN_PRICE || maxPrice.value !== MAX_PRICE) {
      return customArr.filter((flight) => +flight.flight.price.total.amount >= +minPrice.value && +flight.flight.price.total.amount <= +maxPrice.value);
    }
    return customArr;
  };

  const operatingAirlineFilter = (customArr) => {
    if (polishAirlines.checked) {
      return customArr.filter((flight) => flight.flight.carrier.caption === POLISH_AIRLINES_NAME);
    } else if (russianAirlines.checked) {
      return customArr.filter((flight) => flight.flight.carrier.caption === RUSSIAN_AIRLINES_NAME);
    }
    return customArr;
  };

  const finalFilter = (mockFlightsList) => {
    return operatingAirlineFilter(priceFilter(legsFilter(sortFilters(mockFlightsList))));
  };

  for (let i = 0; i < FIRST_SCREEN_FLIGHTS_COUNT; i++) {
    renderTemplate(siteFlightsSectionElement, createFlightTemplate(finalFilter(customArr)[i]));
  }

  if (mockFlightsList.length > FLIGHTS_COUNT_PER_STEP) {
    let customArrPlus = FLIGHTS_COUNT_PER_STEP;

    renderTemplate(showMoreButtonContainer, createShowMoreButtonTemplate());

    const loadMoreFlightsFilterButton = showMoreButtonContainer.querySelector('.flight__show-more');
    loadMoreFlightsFilterButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      finalFilter(customArr)
        .slice(customArrPlus, customArrPlus + FLIGHTS_COUNT_PER_STEP)
        .forEach((flight) => renderTemplate(siteFlightsSectionElement, createFlightTemplate(flight)));

      customArrPlus += FLIGHTS_COUNT_PER_STEP;
    });
  }
});
