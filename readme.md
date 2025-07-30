# 🎲 Spiele

Eine einfache, mobile-freundliche Webapp mit verschiedenen Minispielen. Alle Daten werden **lokal im Browser** gespeichert und die Seite funktioniert komplett **offline**.

## 🔧 Features

- ✅ Punkteverwaltung für Würfelspiele (Scorekeeper) mit frei wählbaren Punktzahlen
- ✅ Anzeige des Punkteverlaufs im Scorekeeper
- ✅ Neuer Spielmodus "Imposter" mit umfangreichen Kategorien und Begriffen (siehe `imposter-data.js`)
- ✅ Zufällige Auswahl des Startspielers im Imposter-Modus
- ✅ Spieler lassen sich entfernen und das Imposter-Spiel kann komplett zurückgesetzt werden
- ✅ Der aktuelle Spieler wird hervorgehoben und enthüllt sein Wort direkt unter seinem Namen
- ✅ Mobile-first Design
- ✅ Automatischer Darkmode je nach System-Einstellung
- ✅ Persistente Speicherung über LocalStorage
- ✅ Mehrsprachige Texte über eine kleine i18n-Datei

## 🚀 Verwendung

1. **Repository klonen**

   ```bash
   git clone <dieses-repo>
   cd <ordner>
   ```

2. **`index.html` im Browser öffnen.** Es ist keine Installation notwendig.

3. Über das Dropdown oben kann zwischen den Spielen gewechselt werden.
   - **Scorekeeper**: Spieler hinzufügen und pro Runde die erreichten Punkte eintragen.
   - Die Punktänderungen werden unter jedem Spieler angezeigt. Spieler lassen sich auch wieder entfernen.
   - **Imposter**: Spieler hinzufügen, Spiel starten und jedem Spieler sein Wort zeigen. Ein zufälliger Spieler sieht stattdessen "Imposter".
   - Das Spiel kann jederzeit über "Spiel zurücksetzen" neu gestartet werden.
   - Der Startspieler wird zufällig bestimmt.
   - Der Look passt sich automatisch dem hellen oder dunklen System-Design an.

4. Alle Daten werden automatisch im Browser gespeichert und stehen offline zur Verfügung.

## Lizenz

Dieses Projekt steht unter der [CC0 1.0](LICENSE).