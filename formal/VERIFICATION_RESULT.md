# Prüfergebnis: SubQGExactGlitchEngine / Lean 4

Datum: 12. November 2026  
Projekt: `SubQG_Fundamental_Physics_Validation_FPV6/developer`

## Ergebnis

- `npm run verify:lean`: **BESTANDEN**
- Lean-Version: **4.34.1**
- Unbewiesene Platzhalter (`sorry`, `admit`, `sorryAx`): **keine (0)**
- Axiomatische Grundlage: Ausschließlich Lean 4 Kernaxiome `[propext, Classical.choice, Quot.sound]`
- `npm test`: **277 von 277 Tests bestanden**
- Fehlgeschlagene, übersprungene oder abgebrochene Tests: **0**
- Spezifische Tests der `SubQGExactGlitchEngine`: **3 von 3 bestanden**

## Neu formal abgedeckt und bewiesen

1. **$C^\infty$-Glattheit des Bump-Fensters**: Über Mathlibs `expNegInvGlue` ist formal bewiesen, dass die Bump-Funktion `bumpGlue` und `smoothGlitchBump` für jede Ableitungsordnung $n \le \infty$ unendlich oft differenzierbar (`ContDiff ℝ n`) auf ganz $\mathbb{R}$ ist (`SubQG.bumpGlue_contDiff`, `SubQG.smoothGlitchBump_contDiff`).
2. **Exakter kompakter Träger**: Außerhalb von `|(t - t_mid) / tau| < 1` sind Bump, Winkel, quadratischer Überlapp, Tunnelkopplung und metrische Kreuzquelle exakt null (`SubQG.bumpGlue_zero_of_not_mem`, `SubQG.smoothGlitchBump_outside`, `SubQG.bridge_closed_outside`, `SubQG.crossMetricSource_outside`).
3. **Verschwindende Ausgangskopplung**: Bei $\varepsilon=0$ gilt $w_{AB} = \sin^2(0) = 0$ exakt.
4. **Symmetrische Kopplung und Normerhaltung**: Die reelle Off-Diagonal-Kopplung hebt sich in der momentanen Zeitableitung der Gesamtnorm exakt auf (`SubQG.symmetric_coupling_preserves_total_norm_rate`, `SubQG.total_norm_rate_zero_of_symmetric_coupling`).
5. **Vollständige gemeinsame Energie- und Leistungsbilanz**: Definition des gemeinsamen Hamiltonians $\mathcal{H}_{\mathrm{joint}} = E_{\Psi,A} + E_{\Psi,B} + E_{\mathrm{cross}} + S_{\mathrm{edge}}[x_A] + S_{\mathrm{edge}}[x_B]$ und formaler Beweis der Energievariation unter simultaner Änderung von Tunnelkopplung und metrischem Quellübertrag (`SubQG.joint_energy_variation_with_metric_feedback`):
   $$\Delta \mathcal{H}_{\mathrm{joint}} = 2 \Delta g \operatorname{Re}\langle \Psi_A | \Psi_B \rangle + \Delta w_{AB} \cdot \beta \sum_e w_e \rho_{B,e} x_{A,e}.$$

## Numerische Umsetzung

1. **Konsistente RK4-Stufen**: Alle 4 Zwischenstufen $k_1..k_4$ evaluieren die zeitabhängige Glitch-Kopplung $g(t)$ an den Stufenzeiten $t$, $t + dt/2$ und $t + dt$, und die variationelle Metrik wird an den Zwischenstufenzuständen konsistent rückgekoppelt.
2. **Simpson-Quadratur**: Die geleistete Arbeit des Glitches wird konsistent mit 4th-Order-Gewichten integriert.
3. **Strenge Leistungskontrolle**: Vor und nach dem Glitchfenster ist die momentane Leistung $P_{\mathrm{glitch}}(t) \equiv 0$ identisch null; die geleistete Arbeit friert nach Schließen der Brücke exakt ein.

## Reproduzieren

Im Projektverzeichnis `developer` ausführen:

```powershell
npm run verify:lean
npm test
```
