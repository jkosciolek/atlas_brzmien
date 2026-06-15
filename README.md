# Atlas Brzmień

Projekt na przedmiot Techniki Programowania Frontendowego — **Atlas Brzmień** to interaktywna, jednostronicowa aplikacja webowa, prezentująca tradycje muzyczne z całego świata za pomocą interaktywnej mapy wektorowej. Projekt umożliwia płynne odkrywanie regionalnych brzmień, instrumentów i playlist bez przerywania odtwarzania muzyki w tle.
Aplikacja oferuje zapisywanie utworów na listach ulubionych oraz oznaczenie "odwiedzonych" już krajów.

---

## Główne Funkcjonalności

Kluczowe funkcjonalności aplikacji to:

1. **Interaktywna Mapa Świata**:
   - Stworzona z wykorzystaniem grafiki wektorowej (SVG).
   - Wspiera przybliżanie (zoom scroll) oraz przesuwanie.
   - Posiada interaktywne etykiety (tooltips) wyświetlające nazwy krajów po najechaniu myszką.
   - Pozwala na kliknięcie dowolnego kraju w celu otwarcia jego profilu muzycznego.

2. **Panel Szczegółów Kraju (Country Panel)**:
   - Wyświetla opis kultury muzycznej danego regionu.
   - Wskazuje znaczące muzycznie regiony wybranego kraju.
   - Prezentuje tradycyjne instrumenty (np. *Bodhrán* dla Irlandii, *Balalaika* dla Rosji, *Berimbau* dla Brazylii).
   - Zawiera playlistę reprezentatywnych utworów.

3. **Odtwarzacz Muzyczny (Player Bar)**:
   - Umieszczony na stałe na dole ekranu.
   - Umożliwia odtwarzanie, pauzowanie oraz przewijanie utworów (w przód/w tył o 15 sekund).
   - Zawiera wskaźnik postępu (seek bar) oraz regulację głośności.
   - Wyświetla informacje o aktualnie odtwarzanym utworze (tytuł, wykonawca, okładka albumu).

4. **Wyszukiwarka Krajów**:
   - Autouzupełniająca wyszukiwarka w nagłówku strony.
   - Wspiera nawigację klawiaturą (strzałki góra/dół, wybór klawiszem Enter, zamykanie klawiszem Escape).

5. **Paszport Muzyczny (Profil Użytkownika)**:
   - Wizualizuje postęp w odkrywaniu świata muzyki (procent odkrytych krajów, pieczątki w paszporcie).
   - Śledzi liczbę odnalezionych instrumentów oraz zapisanych ulubionych utworów.
   - Poziomy podróżnika (np. *Wanderer*).

6. **Lista Ulubionych**:
   - Możliwość dodawania krajów do ulubionych (ikona serduszka w panelu bocznym).
   - Dedykowany widok zarządzania ulubionymi z opcją udostępniania i szybkiego powrotu na mapę.

7. **System Logowania (Authentication)**:
   - Mockowana autoryzacja za pomocą konta Spotify, Google lub tradycyjnego formularza (email + hasło).
   - Odblokowuje spersonalizowane statystyki profilu i zapisywanie ulubionych.

8. **Ciemny i Jasny Motyw (Dark & Light Mode)**:
   - Dynamiczny przełącznik motywu w nagłówku.

---

## Stos Technologiczny

Projekt został zbudowany przy użyciu narzędzi i bibliotek front-endowych:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) 
- **Biblioteka UI**: [React 19](https://react.dev/) oraz [TypeScript](https://www.typescriptlang.org/).
- **Stylizowanie**: [Tailwind CSS v4](https://tailwindcss.com/) — z nową architekturą `@import`, motywem inline oraz płynnymi animacjami (`tw-animate-css`).
- **Obsługa Map**: [react-simple-maps](https://www.react-simple-maps.io/) w połączeniu z [d3-geo](https://github.com/d3/d3-geo) (geodane pobierane dynamicznie z World Atlas).
- **Ikony**: [Lucide React](https://lucide.dev/).
- **Zarządzanie stanem**: React Context API (`AtlasProvider`).

---

## Struktura Katalogów

Główna struktura kodu aplikacji:

```text
├── .github/workflows/       # Konfiguracja CI/CD (GitHub Actions)
├── app/                     # Strony i globalne style Next.js (App Router)
│   ├── globals.css          # Style globalne Tailwind v4 + definicje oklch
│   ├── layout.tsx           # Główny układ HTML aplikacji
│   └── page.tsx             # Główna strona renderująca komponent AtlasApp
├── components/              # Komponenty React
│   ├── ui/                  # Komponenty bazowe (np. Button)
│   ├── atlas-app.tsx        # Główny kontroler widoków aplikacji
│   ├── atlas-context.tsx    # Kontekst stanu aplikacji (stan odtwarzacza, ulubione, profil)
│   ├── country-panel.tsx    # Panel szczegółów wybranego państwa (instrumenty, playlista)
│   ├── favorites-view.tsx   # Panel zarządzania ulubionymi krajami
│   ├── header.tsx           # Nagłówek z wyszukiwarką i zmianą motywu
│   ├── player-bar.tsx       # Dolny pasek odtwarzacza muzyki
│   ├── profile-view.tsx     # Profil użytkownika (Paszport Muzyczny)
│   ├── sign-in-view.tsx     # Ekran logowania (Spotify, Google, Email)
│   └── world-map.tsx        # Interaktywna mapa świata (SVG)
├── lib/                     # Pliki pomocnicze i dane
│   ├── atlas-data.ts        # Baza danych instrumentów, krajów i playlist
│   └── utils.ts             # Funkcje pomocnicze
├── public/                  # Statyczne zasoby (obrazy, ikony, okładki)
├── next.config.mjs          # Konfiguracja Next.js (włączony eksport statyczny)
├── package.json             # Zależności i skrypty npm
└── tsconfig.json            # Konfiguracja TypeScript
```

---

## Uruchomienie Lokalne

Aby uruchomić aplikację lokalnie:

### Krok 1: Instalacja zależności
W folderze głównym projektu:
```bash
npm install
# lub przy użyciu pnpm
pnpm install
```

### Krok 2: Uruchomienie serwera deweloperskiego
Uruchom serwer lokalny:
```bash
npm run dev
# lub
pnpm dev
```
Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

### Krok 3: Budowanie wersji produkcyjnej
Aby wygenerować w pełni zoptymalizowaną wersję statyczną (folder `out`):
```bash
npm run build
```

---

## Wdrożenie (Deployment)

Projekt zawiera skonfigurowany przepływ pracy w GitHub Actions ([deploy.yml](file:///.github/workflows/deploy.yml)), który przy każdym wypchnięciu (push) zmian na gałąź `main`:
1. Instaluje zależności.
2. Buduje statyczną wersję aplikacji za pomocą Next.js (`next build`).
3. Automatycznie wdraża wygenerowane pliki na platformę **GitHub Pages**.

Strona dostępna pod adresem:
https://jkosciolek.github.io/atlas_brzmien/