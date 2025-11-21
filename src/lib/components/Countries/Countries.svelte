<script lang="ts">
  import moment from 'moment-timezone';

  import PHSVG from '$lib/assets/ph.svg';
  import USSVG from '$lib/assets/us.svg';
  import JPSVG from '$lib/assets/jp.svg';
  import ESSVG from '$lib/assets/es.svg';
  import ITSVG from '$lib/assets/it.svg';
  import FRSVG from '$lib/assets/fr.svg';
  import DESVG from '$lib/assets/de.svg';
  import GridSVG from '$lib/assets/grid.svg';

  import { onMount } from 'svelte';
	import { animate, createTimer } from 'animejs';

  const countries = [
    {
      name: 'Asia/Manila',
      svg: PHSVG,
      timezone: 'Asia/Manila',
      latitude: '12.88',
      longitude: '121.77'
    },
    {
      name: 'America/New_York',
      svg: USSVG,
      timezone: 'America/New_York',
      latitude: '37.09',
      longitude: '-95.71'
    },
    {
      name: 'Asia/Tokyo',
      svg: JPSVG,
      timezone: 'Asia/Tokyo',
      latitude: '35.69',
      longitude: '139.69'
    },
    {
      name: 'Europe/Madrid',
      svg: ESSVG,
      timezone: 'Europe/Madrid',
      latitude: '40.41',
      longitude: '-3.69'
    },
    {
      name: 'Europe/Rome',
      svg: ITSVG,
      timezone: 'Europe/Rome',
      latitude: '41.89',
      longitude: '12.49'
    },
    {
      name: 'Europe/Paris',
      svg: FRSVG,
      timezone: 'Europe/Paris',
      latitude: '48.86',
      longitude: '2.35'
    },
    {
      name: 'Europe/Berlin',
      svg: DESVG,
      timezone: 'Europe/Berlin',
      latitude: '51.05',
      longitude: '13.74'
    }
  ]

  const weatherBaseEndpoint = 'https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m';

  let currentCountry = countries[0];
  let countryIndex = 0;
  let timeText = '00:00:00';
  let weatherData: any = {};

  onMount(() => {
    const changeCountry = () => {
      countryIndex = (countryIndex + 1) % countries.length;
      currentCountry = countries[countryIndex];

      getCurrentWeather();
    }

    const getCurrentTime = () => {
      // base date on country timezone
      const date = moment().tz(currentCountry.timezone);

      const hours = date.hour();
      const minutes = date.minute();
      const seconds = date.second();

      timeText = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    const getCurrentWeather = () => {
      if (currentCountry && !Object.keys(weatherData).includes(currentCountry.name)) {
        fetch(weatherBaseEndpoint.replace('{latitude}', currentCountry.latitude).replace('{longitude}', currentCountry.longitude))
          .then(response => response.json())
          .then(data => {
            weatherData[currentCountry.name] = data;
          });
      }
    }

		animate('.sway', {
			rotateY: [0, 35, 0, -35],
			rotateX: [0, 10, -35],
			duration: 20000,
			loop: true,
			easing: 'linear',
			alternate: true,
      onLoop: changeCountry
		})

    createTimer({
      duration: 1000,
      loop: true,
      onLoop: getCurrentTime
    })

    getCurrentTime();
    getCurrentWeather();
	});
</script>

<div class="countries relative lg:min-h-[450px] min-h-[300px]">
  
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-auto z-0">
    <img class="sway opacity-50" src={GridSVG} alt="Grid"  id="random-grid">
  </div>
  
  <img class="sway relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-22" src={currentCountry.svg} alt="Placeholder" id="active-svg">

  <div class="sway country-data absolute top-0 left-0">
    <span class="country-name text-white space-mono">{currentCountry.name}</span>
    <span class="country-time text-primary-color space-mono">{timeText}</span>
    <span class="country-temp text-secondary-color space-mono">{weatherData[currentCountry.name]?.current.temperature_2m}°C</span>
  </div>
</div>

<style>
  .countries {
    width: 100%;
    height: 100%;
  }

  .country-data {
    display: flex;
    flex-direction: column;
  }

  .country-data .country-name {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
    text-transform: uppercase;
  }

  .country-data .country-time {
    font-weight: 200;
    font-size: 3rem;
    line-height: 1;
  }

  .country-data .country-temp {
    font-weight: 200;
    font-size: 1.5rem;
    line-height: 1;
  }
</style>