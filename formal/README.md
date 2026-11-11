# Formale SubQG-Herleitung in Lean 4

Diese Formalisierung bildet den mathematischen Kern der vorhandenen JavaScript-Implementierung ab. Sie ist keine nachträgliche Behauptung, dass die Modellannahmen Naturgesetze seien. Lean prüft, welche Folgerungen **unter den ausdrücklich genannten Voraussetzungen** aus dem Modellansatz entstehen.

## Bezug zum implementierten Modell

Die formale Datei [`SubQGDerivation.lean`](./SubQGDerivation.lean) entspricht folgenden Projektteilen:

| Lean-Komponente | JavaScript-Quelle | Bedeutung |
|---|---|---|
| `FiniteWeightedGraph` | `subqg_microaction.mjs`, `subqg_apple_experiment.mjs` | Endliche Knoten, gewichtete Kanten und Nachbarschaften im Kantengraphen |
| `edgeAction` | `SubQGAppleWorld.solveVariationalMetric` | Quadratische Kantenwirkung mit Anker-, Glättungs- und Materiekopplung |
| `firstVariation` / `IsStationary` | Residuum in `solveVariationalMetric` | Euler–Lagrange-Gleichung `(μI+κL_edge)x=-β(w⊙ρ)` |
| `nodeMetricPotential` | `phiMetric` | `Φ_metric(u)=β/2 ∑_{e∋u} w_e x_e` |
| `metricForce` | Ehrenfest-/Schwerpunktinterpretation | Normgewichtete Kraft aus dem diskreten Potentialgradienten |
| `motionStep` | Trajektorienentwicklung | Expliziter diskreter Bewegungsschritt des Paketzentrums |

## Formal bewiesene Aussagen

Lean 4 prüft insbesondere:

1. Die exakte algebraische Entwicklung `S(x+t h)` der Kantenwirkung.
2. Die schwache Stationaritätsgleichung für jede Variation `h`.
3. Jede stationäre Lösung ist bei `μ≥0`, `κ≥0` und nichtnegativen Paargewichten ein globales Minimum der Wirkung.
4. Die Stationaritätsgleichung liefert eine exakte Energiebilanz zwischen Anker-, Glättungs- und Quellterm.
5. Ist der diskrete Potentialgradient über dem Objektpaket konstant und die Paketnorm ungleich null, kürzt sich die Norm aus Kraft durch Trägheit heraus. Die Beschleunigung ist dann unabhängig von der Paketnorm.
6. Unter derselben Konstantfeldannahme ist die benötigte Haltekraft proportional zur Paketnorm beziehungsweise zur im Modell so definierten trägen Masse.
7. Der diskrete Bewegungsschritt verwendet genau die formal hergeleitete Beschleunigung.

## Sichtbare Voraussetzungen

Die zentralen Voraussetzungen werden nicht versteckt:

- Graph, Kanten- und Interaktionsmengen sind endlich.
- Kanten- und Paargewichte sind nichtnegativ.
- Für den Minimalsatz gelten `μ≥0` und `κ≥0`.
- Die Kantenwirkung ist der im Projekt ausdrücklich postulierte Modellansatz.
- Für die Universalität des freien Falls ist der Potentialgradient über dem Träger des Pakets konstant.
- Die Paketnorm ist ungleich null und wird als träge Masse des normierten Modells verwendet.

Ein lokales negatives `x_e` für jede einzelne quellnahe Kante folgt ohne zusätzliche Voraussetzungen noch nicht allein aus positiver Definitheit. Dafür wäre beispielsweise ein Positivitäts-/M-Matrix-Satz für den konkreten eindimensionalen Operator nötig. Die JavaScript-Simulation beobachtet die Kontraktion numerisch; diese Lean-Datei behauptet sie nicht ohne den noch fehlenden Operatorbeweis.

Ebenso formalisiert diese erste Stufe die Schwerpunktbewegung als diskretes Kraftgesetz. Eine vollständige Formalisierung des komplexen nichtlinearen Schrödinger-/RK4-Systems aus `subqg_apple_experiment.mjs` wäre ein eigener nachfolgender Beweisbaustein.

## Verifikation

Im Verzeichnis `developer` ausführen:

```powershell
npm run verify:lean
```

Der Lauf ist nur erfolgreich, wenn:

- `lean.exe` mit Exitcode 0 endet,
- keine Compilerfehler auftreten,
- kein `sorry`, `admit` oder `sorryAx` gemeldet wird.

`#print axioms` dokumentiert für die zentralen Sätze die verwendete Vertrauensbasis.
