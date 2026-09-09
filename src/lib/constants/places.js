/**
 * Places shown on the /v3 hero globe.
 *
 * Same idea as the original <Countries /> widget — a country map, its local
 * time and its current temperature — but here each one is a pickable point on
 * a 3D globe, so latitude/longitude are load-bearing (they position the
 * marker) as well as being the weather lookup.
 *
 * Coordinates are the city the timezone actually refers to, so the temperature
 * matches the clock instead of a country centroid.
 */

import PHSVG from '$lib/assets/ph.svg';
import USSVG from '$lib/assets/us.svg';
import JPSVG from '$lib/assets/jp.svg';
import ESSVG from '$lib/assets/es.svg';
import ITSVG from '$lib/assets/it.svg';
import FRSVG from '$lib/assets/fr.svg';
import DESVG from '$lib/assets/de.svg';

export const places = [
	{
		id: 'ph',
		country: 'Philippines',
		city: 'Cagayan de Oro',
		tz: 'Asia/Manila',
		lat: 8.48,
		lon: 124.65,
		map: PHSVG,
		home: true
	},
	{
		id: 'us',
		country: 'United States',
		city: 'New York',
		tz: 'America/New_York',
		lat: 40.71,
		lon: -74.01,
		map: USSVG
	},
	{
		id: 'jp',
		country: 'Japan',
		city: 'Tokyo',
		tz: 'Asia/Tokyo',
		lat: 35.69,
		lon: 139.69,
		map: JPSVG
	},
	{
		id: 'es',
		country: 'Spain',
		city: 'Madrid',
		tz: 'Europe/Madrid',
		lat: 40.41,
		lon: -3.69,
		map: ESSVG
	},
	{
		id: 'it',
		country: 'Italy',
		city: 'Rome',
		tz: 'Europe/Rome',
		lat: 41.89,
		lon: 12.49,
		map: ITSVG
	},
	{
		id: 'fr',
		country: 'France',
		city: 'Paris',
		tz: 'Europe/Paris',
		lat: 48.86,
		lon: 2.35,
		map: FRSVG
	},
	{
		id: 'de',
		country: 'Germany',
		city: 'Berlin',
		tz: 'Europe/Berlin',
		lat: 52.52,
		lon: 13.4,
		map: DESVG
	}
];

/**
 * Open-Meteo current temperature for one place.
 * @param {{ lat: number, lon: number }} place
 */
export const weatherUrl = (place) =>
	`https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m`;
