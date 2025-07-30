(function(){
  const rawData = `Berufe,Tiere,Essen,Länder,Filme,Serien,Hobbys,Farben,Städte
Arzt,Hund,Pizza,Deutschland,Titanic,Breaking Bad,Lesen,Rot,Berlin
Lehrer,Katze,Burger,Frankreich,Avatar,Game of Thrones,Schreiben,Blau,Hamburg
Polizist,Elefant,Sushi,Italien,Inception,Stranger Things,Zeichnen,Grün,München
Bäcker,Tiger,Spaghetti,Spanien,Matrix,The Office,Malen,Gelb,Köln
Pilot,Löwe,Lasagne,Portugal,Gladiator,Friends,Kochen,Orange,Frankfurt
Zahnarzt,Giraffe,Risotto,Schweiz,Interstellar,How I Met Your Mother,Backen,Lila,Stuttgart
Koch,Zebra,Gulasch,Österreich,Joker,The Big Bang Theory,Gärtnern,Pink,Düsseldorf
Friseur,Affe,Curry,Niederlande,Forrest Gump,Sherlock,Reiten,Schwarz,Leipzig
Soldat,Känguru,Falafel,Belgien,Pulp Fiction,Dark,Wandern,Weiß,Dresden
Bauarbeiter,Koala,Burrito,Luxemburg,Shrek,House of Cards,Joggen,Grau,Hannover
Kellner,Pferd,Taco,Dänemark,Der Pate,Dexter,Schwimmen,Braun,Nürnberg
Mechaniker,Esel,Gyros,Norwegen,Star Wars,Lost,Radfahren,Beige,Bremen
Journalist,Schwein,Bratwurst,Schweden,Herr der Ringe,Better Call Saul,Angeln,Türkis,Essen
Schauspieler,Huhn,Pommes,Finnland,Harry Potter,Brooklyn Nine-Nine,Fotografieren,Gold,Dortmund
Musiker,Ente,Schnitzel,Island,Fluch der Karibik,Lucifer,Filmen,Silber,Bochum
Architekt,Gans,Käsespätzle,Irland,Frozen,The Witcher,Tanzen,Kupfer,Wuppertal
Anwalt,Pfau,Raclette,Polen,Minions,Vikings,Singen,Hellblau,Mannheim
Richter,Taube,Fondue,Tschechien,Cars,Peaky Blinders,Musik machen,Dunkelblau,Heidelberg
Feuerwehrmann,Maus,Maultaschen,Ungarn,Toy Story,Narcos,Instrument spielen,Hellgrün,Mainz
Programmierer,Ratte,Knödel,Slowakei,Oben,The Boys,Stricken,Dunkelgrün,Freiburg
Elektriker,Hamster,Roulade,Slowenien,Findet Nemo,The Mandalorian,Häkeln,Hellgelb,Augsburg
Installateur,Meerschweinchen,Chili,Kroatien,König der Löwen,Loki,Basteln,Dunkelrot,Bonn
Verkäufer,Kaninchen,Steak,Serbien,Aladdin,WandaVision,Modellbau,Bordeaux,Karlsruhe
Tierarzt,Fuchs,Kebab,Bosnien,Ratatouille,Moon Knight,Schach,Magenta,Regensburg
Forscher,Wolf,Hotdog,Bulgarien,Monster AG,Severance,Brettspiele,Cyan,Kiel
Gärtner,Bär,Frikadelle,Rumänien,Inside Out,Squid Game,Videospiele,Olivgrün,Rostock
Designer,Eichhörnchen,Reis,Griechenland,Encanto,Money Heist,Klettern,Petrol,Lübeck
Therapeut,Dachs,Nudeln,Türkei,Zootopia,Elite,Surfen,Mint,Osnabrück
Psychologe,Igel,Paella,Zypern,Mulan,Riverdale,Skifahren,Creme,Oldenburg
Fotograf,Waschbär,Enchilada,Russland,Rapunzel,Sex Education,Snowboarden,Apricot,Potsdam
Taxifahrer,Pinguin,Döner,USA,Wall-E,Rick and Morty,Camping,Koralle,Saarbrücken
Buchhalter,Robbe,Tortellini,Kanada,Mad Max,BoJack Horseman,Reisen,Lachs,Wiesbaden
Model,Wal,Carbonara,Mexiko,The Revenant,Archer,Geocaching,Zinn,Magdeburg
Wissenschaftler,Delfin,Bolognese,Brasilien,Black Panther,The Crown,Origami,Elfenbein,Erfurt
Sekretär,Hai,Couscous,Argentinien,Iron Man,Suits,Töpfern,Anthrazit,Jena
Postbote,Krake,Quiche,Chile,Thor,Grey's Anatomy,Meditieren,Mauve,Halle
Makler,Qualle,Wrap,Peru,Captain America,Gossip Girl,Yoga,Indigo,Cottbus
Erzieher,Seestern,Korma,Kolumbien,Doctor Strange,The Walking Dead,Fitness,Violett,Trier
Schneider,Seepferdchen,Pad Thai,Venezuela,Deadpool,Supernatural,Boxen,Smaragd,Passau
Grafiker,Tintenfisch,Udon,Ecuador,Spider-Man,Smallville,Kampfsport,Karmesin,Konstanz
Pfarrer,Flamingo,Pekingente,China,Batman,Shadow and Bone,Tennis,Perlweiß,Ulm
Notar,Strauß,Dim Sum,Japan,Superman,Wednesday,Badminton,Sand,Flensburg
Schreiner,Kranich,Pho,Südkorea,Aquaman,Manifest,Volleyball,Zitrone,Lüneburg
Chemiker,Papagei,Ceviche,Vietnam,Wonder Woman,Outer Banks,Fußball,Lavendel,Bamberg
Astronom,Wellensittich,Currywurst,Thailand,Transformers,You,Basketball,Kakao,Würzburg
Mathematiker,Kuckuck,Zwiebelkuchen,Indien,Fast & Furious,1899,Handball,Haselnuss,Coburg
Kapitän,Specht,Gratin,Pakistan,John Wick,The Last of Us,Baseball,Moosgrün,Bayreuth
Detektiv,Uhu,Cordon Bleu,Australien,The Hunger Games,Chernobyl,Golf,Chartreuse,Landshut
Übersetzer,Eule,Gnocchi,Neuseeland,Twilight,The Expanse,Segeln,Pfirsich,Ingolstadt
Biologe,Frosch,Linsen,Südafrika,Dune,The Umbrella Academy,Tauchen,Terracotta,Heilbronn`;

  const lines = rawData.trim().split('\n');
  const categories = lines.shift().split(',');
  const wordsByCat = categories.map(() => []);
  lines.forEach(line => {
    line.split(',').forEach((w, i) => wordsByCat[i].push(w));
  });

  window.imposterData = {
    categories,
    wordsByCat,
    randomPair: function() {
      const catIndex = Math.floor(Math.random() * categories.length);
      const wordIndex = Math.floor(Math.random() * wordsByCat[catIndex].length);
      return { category: categories[catIndex], word: wordsByCat[catIndex][wordIndex] };
    }
  };
})();
