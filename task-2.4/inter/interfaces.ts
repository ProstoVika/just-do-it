export interface WeatherInterface {
    current: {
        clouds: number;
        dew_point: number;
        feels_like: string;
        humidity: number;
        pressure: number;
        sunrise: number;
        sunset: number;
        temp: symbol;
        uvi: number;
        visibility: number;
        weather: WeatherCurrentInterface[];
    }
    daily: DayWeatherInterface[];
    timezone: string;
}

interface WeatherCurrentInterface {
    description: string;
    icon: string;
    main: string;
    id: number;
}

export interface CoordObjectInterface {
    lat: string;
    lon: string;
    name: string;
    unit?: string;
}

export interface DayWeatherInterface {
    dt: number;
    weather: WeatherCurrentInterface[];
    temp: {
        max: string;
        min: string;
    }
}

export interface PointerEvent {
    type: string;
}

export interface IGetResInterface {
    sys: {
        country: string;
    }
    coord: {
        lat: string;
        lon: string;
    }
    cod: number;
    name: string;
    message: string;
}