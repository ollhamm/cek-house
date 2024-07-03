import countries from "world-countries";

const formattedCountry = countries.map((country) => ({
  value: country.cca3,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountry;

  const getByValue = (value: string) => {
    return formattedCountry.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
