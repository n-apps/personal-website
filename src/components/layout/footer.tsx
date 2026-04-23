import { useEffect, useState, useRef, useCallback } from "react";

const WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&lang=us&appid=063c51f5bd4cc4f176c67724ff4cd230";

interface WeatherData {
  temp: number;
  icon: string;
  description: string;
}

function weatherIconToSvg(iconCode: string) {
  // Map OpenWeatherMap icon codes to simple SVG weather icons
  const isNight = iconCode.endsWith("n");
  const code = iconCode.replace(/[dn]$/, "");

  switch (code) {
    case "01": // clear
      return isNight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "02": // few clouds
    case "03": // scattered clouds
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          {!isNight && <line x1="1" y1="8" x2="3" y2="8" opacity="0.5" />}
          {!isNight && <line x1="4" y1="3" x2="5.5" y2="4.5" opacity="0.5" />}
          {!isNight && <line x1="9" y1="1" x2="9" y2="3" opacity="0.5" />}
        </svg>
      );
    case "04": // broken/overcast clouds
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "09": // shower rain
    case "10": // rain
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16" y1="13" x2="16" y2="21" />
          <line x1="8" y1="13" x2="8" y2="21" />
          <line x1="12" y1="15" x2="12" y2="23" />
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
        </svg>
      );
    case "11": // thunderstorm
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
          <polyline points="13 11 9 17 15 17 11 23" />
        </svg>
      );
    case "13": // snow
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <line x1="8" y1="16" x2="8.01" y2="16" />
          <line x1="8" y1="20" x2="8.01" y2="20" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
          <line x1="12" y1="22" x2="12.01" y2="22" />
          <line x1="16" y1="16" x2="16.01" y2="16" />
          <line x1="16" y1="20" x2="16.01" y2="20" />
        </svg>
      );
    case "50": // mist/fog
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="8" x2="21" y2="8" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="3" y1="16" x2="21" y2="16" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
  }
}

function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      try {
        const res = await fetch(WEATHER_API_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setWeather({
          temp: Math.round(data.main.temp),
          icon: data.weather?.[0]?.icon ?? "04d",
          description: data.weather?.[0]?.description ?? "clouds",
        });
      } catch {
        // silently fail — weather is decorative
      }
    }
    fetchWeather();
    // Refresh every 10 minutes
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return weather;
}

function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Kiev",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// Original phrases from romamakes.com
const phrases = ["Ship fast.", "Iterate.", "Repeat."];

function useTypewriter() {
  const [text, setText] = useState("");
  const phraseIndexRef = useRef(0);
  const cancelRef = useRef(false);

  const typeWriter = useCallback(
    (phrase: string, index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (cancelRef.current) return;
        if (index <= phrase.length) {
          setText(phrase.substring(0, index));
          setTimeout(() => {
            resolve(typeWriter(phrase, index + 1));
          }, 100); // Typing speed: 100ms (matches original)
        } else {
          // Pause before deleting: 2000ms
          setTimeout(resolve, 2000);
        }
      });
    },
    []
  );

  const deleteText = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (cancelRef.current) return;
      setText((prev) => {
        if (prev.length > 0) {
          const next = prev.substring(0, prev.length - 1);
          // Random delay 30–80ms + 10% chance of extra 0–200ms pause (matches original)
          const randomDelay = Math.floor(Math.random() * 50) + 30;
          const extraDelay = Math.random() < 0.1 ? Math.random() * 200 : 0;
          setTimeout(() => {
            resolve(deleteText());
          }, randomDelay + extraDelay);
          return next;
        } else {
          resolve();
          return prev;
        }
      });
    });
  }, []);

  const startLoop = useCallback(async () => {
    while (!cancelRef.current) {
      const currentPhrase = phrases[phraseIndexRef.current];
      await typeWriter(currentPhrase, 0);
      if (cancelRef.current) break;
      await deleteText();
      if (cancelRef.current) break;
      phraseIndexRef.current =
        (phraseIndexRef.current + 1) % phrases.length;
    }
  }, [typeWriter, deleteText]);

  useEffect(() => {
    cancelRef.current = false;
    startLoop();
    return () => {
      cancelRef.current = true;
    };
  }, [startLoop]);

  return text;
}

export function Footer() {
  const time = useCurrentTime();
  const typewriterText = useTypewriter();
  const weather = useWeather();

  return (
    <footer className="pt-16 pb-6 sm:pt-20 sm:pb-10">
      <div className="flex justify-center items-center gap-1 pb-10">
        <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
        <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
        <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
      </div>
      <div className="grid grid-cols-3 items-end w-full">
        <span
          className="whitespace-nowrap text-muted-foreground"
          style={{
            fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          It{"\u00a0"}is{"\u00a0"}{time || "00:00"} in{"\u00a0"}Kyiv
        </span>
        <div className="flex items-center justify-center gap-1">
          {weather ? (
            <>
              <span className="flex items-center text-muted-foreground" style={{ lineHeight: 1 }}>
                {weatherIconToSvg(weather.icon)}
              </span>
              <span
                className="text-muted-foreground"
                style={{
                  fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)",
                  lineHeight: 1,
                }}
              >
                {weather.temp}°C
              </span>
            </>
          ) : (
            <span
              className="text-foreground"
              style={{
                fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)",
                lineHeight: 1,
              }}
            >
              {"\u{1F1FA}\u{1F1E6}"}
            </span>
          )}
        </div>
        <span
          className="text-muted-foreground text-right"
          style={{
            fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 1rem)",
            lineHeight: 1,
          }}
        >
          {typewriterText}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </footer>
  );
}