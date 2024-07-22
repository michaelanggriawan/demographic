import './styles.css';
import data from './data.json';

interface Country {
    name: string;
    value: number;
}

interface DemographicData {
    total: number;
    countries: Country[];
}

interface Data {
    men: DemographicData;
    women: DemographicData;
    youth: DemographicData;
}

function createCountryElement(country: Country, category: string): HTMLElement {
    const countryElement = document.createElement('div');
    countryElement.className = 'country';

    const valueElement = document.createElement('div');
    valueElement.className = 'value';
    valueElement.textContent = `${country.value}M`;

    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = country.name;

    countryElement.appendChild(valueElement);
    countryElement.appendChild(nameElement);

    return countryElement;
}

function createCategoryElement(categoryName: string, demographicData: DemographicData): HTMLElement {
    const categoryElement = document.createElement('div');
    categoryElement.className = `category ${categoryName}`;

    const headerElement = document.createElement('h2');
    headerElement.textContent = `${demographicData.total}M ${categoryName.toUpperCase()}`;
    categoryElement.appendChild(headerElement);

    const countriesElement = document.createElement('div');
    countriesElement.className = 'countries';
    demographicData.countries.forEach(country => {
        const countryElement = createCountryElement(country, categoryName);
        countriesElement.appendChild(countryElement);
    });

    categoryElement.appendChild(countriesElement);

    return categoryElement;
}

function renderData(data: Data) {
    const dataContainer = document.getElementById('data-container');

    if (dataContainer) {
        dataContainer.innerHTML = ''; // Clear any existing content
        dataContainer.appendChild(createCategoryElement('men', data.men));
        dataContainer.appendChild(createCategoryElement('women', data.women));
        dataContainer.appendChild(createCategoryElement('youth', data.youth));
    }
}

renderData(data as Data);
