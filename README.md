# PI Dashboard

Moderní webový dashboard pro monitorování Raspberry Pi s real-time statistikami a přehledem systémových zdrojů.

## 📋 Obsah

- [Funkce](#-funkce)
- [Technologie](#-technologie)
- [Instalace](#-instalace)
- [Konfigurace](#-konfigurace)
- [Použití](#-použití)
- [Struktura projektu](#-struktura-projektu)

## ✨ Funkce

Dashboard poskytuje přehledné zobrazení:

- **Systémové statistiky**

  - Využití CPU (4 jádra)
  - Využití RAM
  - Teplota procesoru (°C a °F)
  - Uptime systému
  - Hostname a architektura

- **Docker kontejnery**

  - Přehled běžících kontejnerů
  - Status a informace o kontejnerech

- **PM2 procesy**

  - Monitorování procesů spravovaných PM2
  - Status a statistiky procesů

- **Úložiště**

  - Základní a pokročilé informace o diskovém prostoru
  - Využití jednotlivých filesystémů
  - Grafické zobrazení zaplnění

- **Síťové statistiky**

  - Graf síťového provozu
  - Latence
  - Ztráta paketů

- **Veřejné služby**

  - Přehled aktivních serverů a služeb
  - Veřejná IP adresa

- **Systémové logy**

  - Zobrazení logů Raspberry Pi

- **Autentizace**
  - Zabezpečený přístup pomocí uživatelského jména a hesla

## 🛠 Technologie

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool a dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP klient pro API komunikaci

### Backend

- **Express.js** - Web server
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Správa environment proměnných

## 📦 Instalace

### Požadavky

- Node.js (verze 18 nebo vyšší)
- npm nebo yarn
- **API server** - Buď vlastní API server s požadovanými endpointy, nebo projekt **"piapi"**, který poskytuje všechny potřebné endpointy pro systémové informace
- Raspberry Pi

### Kroky instalace

1. **Naklonujte nebo stáhněte projekt**

   ```bash
   cd /home/pi/dev/pi-dashboard
   ```

2. **Nainstalujte závislosti**

   ```bash
   npm install
   ```

3. **Nastavte environment proměnné**
   ```bash
   cp template.env .env
   ```
   Poté upravte soubor `.env` podle vašich potřeb (viz sekce Konfigurace).

## ⚙️ Konfigurace

Vytvořte soubor `.env` v kořenovém adresáři projektu na základě `template.env`:

```env
# Backend proměnné (server.js)
PORT=3000
X_ADMIN_USER=admin
X_ADMIN_PASSWORD=your_secure_password

# Frontend proměnné (Vite)
VITE_X_ADMIN_USER=admin
VITE_X_ADMIN_PASSWORD=your_secure_password
VITE_X_IP_KEY=your_ip_api_key
VITE_X_API_URL=http://localhost:8080/api
VITE_X_RESTART_KEY=your_restart_key
```

### Popis proměnných

- `PORT` - Port, na kterém poběží Express server (výchozí: 3000)
- `X_ADMIN_USER` - Uživatelské jméno pro přihlášení
- `X_ADMIN_PASSWORD` - Heslo pro přihlášení
- `VITE_X_API_URL` - URL externího API serveru, který poskytuje systémové informace
- `VITE_X_IP_KEY` - API klíč pro získání veřejné IP adresy
- `VITE_X_RESTART_KEY` - Klíč pro restart funkcionalitu (pokud je implementována)

**Poznámka:** Pro správné fungování dashboardu je potřeba buď:

1. **Vlastní API server** s následujícími endpointy:

   - `/sysinfo` - Systémové informace
   - `/resources` - Využití zdrojů (CPU, RAM)
   - `/dockerContainers` - Docker kontejnery
   - `/pm2` - PM2 procesy
   - `/storage` - Informace o úložišti
   - `/network/traffic` - Graf síťového provozu
   - `/network/latency` - Graf latence
   - `/network/packet-loss` - Graf ztráty paketů
   - `/services` - Aktivní služby
   - `/logs` - Systémové logy

2. **Nebo použijte projekt [J-Henry00/piapi](https://github.com/J-Henry00/piapi)**, který poskytuje všechny tyto endpointy a je navržen speciálně pro tento dashboard.

## 🚀 Použití

### Vývojový režim

Spusťte vývojový server s hot reload:

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:5173` (nebo na IP adrese vašeho Raspberry Pi, pokud použijete `--host` flag).

### Produkční build

Vytvořte produkční build:

```bash
npm run build
```

Build vytvoří optimalizované soubory ve složce `dist/`.

### Spuštění produkčního serveru

Spusťte produkční server:

```bash
npm start
```

Nebo použijte jednoduchý příkaz pro build a start:

```bash
npm run start:prod
```

Server poběží na portu specifikovaném v `PORT` proměnné (výchozí: 3000).

### Linting

Zkontrolujte kód pomocí ESLint:

```bash
npm run lint
```

## 📁 Struktura projektu

```
pi-dashboard/
├── dist/                 # Produkční build (generováno)
├── public/              # Statické soubory
├── src/
│   ├── components/      # React komponenty
│   │   ├── Dashboard/   # Hlavní dashboard komponenta
│   │   ├── Panels/      # Panel komponenty
│   │   └── UI/          # UI komponenty
│   ├── utils/           # Utility funkce
│   │   ├── getStats.js           # Systémové statistiky
│   │   ├── getDockerContainers.js # Docker kontejnery
│   │   ├── getPM2Data.js          # PM2 data
│   │   ├── getStorageUsage.js     # Úložiště
│   │   ├── getNetworkGraphs.js    # Síťové grafy
│   │   ├── getPublicServers.js    # Veřejné služby
│   │   ├── getPublicIp.js         # Veřejná IP
│   │   ├── getPiLogs.js           # Systémové logy
│   │   └── localAddresses.js      # Lokální adresy
│   ├── App.jsx          # Hlavní React komponenta
│   ├── main.jsx         # Entry point
│   └── index.css        # Globální styly
├── server.js            # Express backend server
├── index.html           # HTML template
├── vite.config.js       # Vite konfigurace
├── tailwind.config.js   # Tailwind CSS konfigurace
├── eslint.config.js     # ESLint konfigurace
├── package.json         # Projektové závislosti
├── template.env         # Template pro .env soubor
└── README.md            # Tento soubor
```

## 🔒 Bezpečnost

- **Autentizace:** Dashboard používá základní autentizaci pomocí uživatelského jména a hesla
- **Environment proměnné:** Citlivé údaje jsou uloženy v `.env` souboru, který by neměl být commitován do Gitu
- **CORS:** Backend server má povolený CORS pro komunikaci s frontendem

**Doporučení:**

- Použijte silné heslo pro produkční prostředí
- Zvažte implementaci HTTPS pro produkční nasazení
- Přidejte `.env` do `.gitignore`

## 📝 Poznámky

- Dashboard vyžaduje externí API server pro získání systémových informací
- **Doporučujeme použít projekt "piapi"**, který poskytuje všechny potřebné endpointy
- Ujistěte se, že API server (nebo piapi) běží a je dostupný na URL specifikované v `VITE_X_API_URL`
- Pro nejlepší výkon doporučujeme použít produkční build v produkčním prostředí

## 🤝 Přispívání

Příspěvky jsou vítány! Pokud máte návrhy na vylepšení nebo opravy, neváhejte vytvořit issue nebo pull request.

## 📄 Licence

Tento projekt je soukromý a není licencován pro veřejné použití.

---

**Vytvořeno pro Raspberry Pi** 🍓
