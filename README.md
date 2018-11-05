# EnBW Hackathon Gruppe Torsionspendel

## Einführung

Wir bearbeiten Usecase 1: Erkennung von speziellen Situationen im Kontext von Öffentlicher Sicherheit mittels computer vision.

Wir haben mithilfe von YOLOv2 die bereitgestellten Videos von dem Marktplatz in Biberach analysiert und die Personen getaggt, indem wir über jede Person eine BoundingBox gelegt haben. Ein Beispielvideo zeigt dieses Taggen in Echtzeit. 

## Verarbeitung

### Videoverarbeitung

TODO

### CSV Datei

Aus jedem Video erzeugen wir eine CSV-Datei mit folgenden Daten: (frame_id,track_id,x,y,w,h) .
Die frame_id ist die ID des Frames - die Videos haben eine Rate von 30 fps, teilweiße skippen wir beim Einlesen einige Frames.
Die track_id ist die ID jeder Person, die von YOLO erkannt wird.
x,y sind die Koordinaten der oberen Ecke der BoundingBox in Pixel. Das Video hat die Größe 1920 * 1080.
w,h sind die Größe der BoundingBox.

### Analysen

Die CSV nutzen wir für unsere Analysen. Zum einen bestimmen wir die aktuelle Anzahl an Personen pro Frame. Daraus können wir eine Zeitreihenanalyse machen und feststellen, wenn auffallend viele/wenige Personen zu einer bestimmten Uhrzeit auf dem Marktplatz sind. Wenn hier Auffälligkeiten vorliegen, kann direkt die Security alarmiert werden und mehr Streifen auf den Platz geschickt werden.

Die Daten der Zeitreihenanalyse können zudem für die Stadt interessant sein, um zum Beispiel den Takt des ÖPNV am Marktplatz zu verbessern.

Eine andere Anwendung ist die Bestimmung der Geschwindigkeiten, mit der sich bestimmte Gegenstände bewegen. Diese haben wir grob per Entfernungsmessung aus Google Maps in Meter pro Sekunde umgerechnet. So kann bestimmt werden, wenn sich Radfahrer besonders schnell bewegen. Flüchtende Personen sind auch ein Problem, das so detektiert werden kann.

Diese Daten werden in einem json Dokument an die UI weitergeleitet.

### UI

TODO UI

## TimeLine

* 12:00 Startschuss
* 14:10 Tracking funktioniert
* 15:36 CSV generiert
* 16:32 Video mit Tracking-Info in Echtzeit
* 18:00 Geschwindigkeitserkennung
* 18:30 Brainstorming - neue Ideen für Usecases
* 19:30 erkennung von Fahrrädern und besonders schnellen Personen
* 20:20 Dateiexport in JSON
* 21:35 Test: Tracking funktioniert auch Nachts

## Noch umzusetzende Ideen

### allgemein

* EnBW Farben
* irgendwie auch Autos erkennen
* zu große Boxen rauswerfen
* Überprüfung erkennung nachts (funktioniert)

### teilweise umgesetzt

* Zeitreihenanalyse: Anzahl Personen über Zeit

* Message rausschicken (Patrick)

### noch nicht umgesetzt

* unerlaubtes Betreten von gesperrten Bereichen (Brunnen, Baustelle, ...)
* Rudelbildung (berechung von Personendichte)
* Person bleibt lange an einem Ort stehen


### Übertragung auf andere mögliche Überwachungsbereiche

* Idee: Anwendung ENBW: Erkennung Übertretung Bach - Videomaterial generieren



