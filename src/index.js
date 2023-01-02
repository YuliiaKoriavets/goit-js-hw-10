import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import createOneCountryInfo from './templates/one-country-info.hbs';
import createCountryList from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const oneCountryInfoEl = document.querySelector('.country-info');

const handleSearchCountry = event => {
  let searchQuery = event.target.value.trim();
  countryListEl.innerHTML = '';
  oneCountryInfoEl.innerHTML = '';

  if (searchQuery === "") {
    return
  }

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (data.length >= 2 && data.length <= 10) {
        countryListEl.innerHTML = createCountryList(data);
      }

      if (data.length === 1) {
        oneCountryInfoEl.innerHTML = createOneCountryInfo(data);
      }
    })
    .catch(error => {
      Notify.failure(error.message);
    });
};

inputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);
