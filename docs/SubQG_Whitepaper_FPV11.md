---
title: "SubQG Genesis & Objektgravitation: Von Phasen zur Raumzeit, Trägheit, Asteroidenflug und orthogonalen Multiversen"
subtitle: "Relationale Graphgeometrie, variationelle Kantenmetrik, universeller freier Fall, suprafluides Vakuum und überlappende Multiplex-Spacetimes im Forschungsstand FPV11"
author: "Ralf Krümmel · SubQG-Forschungsprojekt"
date: "11. November 2026"
version: "FPV11 · Forschungswhitepaper 2.0"
lang: de-DE
---

# Zusammenfassung

Subquantum Graphity (SubQG) untersucht, ob sich Raumzeit, interne Uhren, Trägheit und Gravitationswechselwirkungen aus einem substratfreien Quantennetzwerk herleiten lassen, dessen fundamentale Zustände vor-geometrisch durch Phasenbeziehungen beschrieben werden. Der vorliegende Forschungsstand **FPV11** erweitert das bisherige Genesis- und FPV10-Fundament um vier entscheidende physikalische und mathematische Durchbrüche:

1. **Das SubQG Apfel-Experiment (Objektgravitation & Äquivalenzprinzip):** Aus der geschlossenen variationellen Kantenmetrik-Gleichung $(\mu \mathbb{I} + \kappa \mathcal{L}_{\mathrm{edge}})x_e = -\beta w_e \rho_e$ und der unitären Soliton-Wellenpaketdynamik wird hergeleitet, warum derselbe Mechanismus sowohl die massenproportionale Haltekraft (das Gewicht $F_{\mathrm{Halten}} \propto m_{\mathrm{inert}}$) als auch den universellen, massenunabhängigen freien Fall ($\ddot{X}_{\mathrm{frei}} \approx g_{\mathrm{eff}}$) konkreter, ausgedehnter Resonanzobjekte erzeugt – ohne jedes Hardcoding von $F = mg$. Über eine experimentelle Massenspanne von $9{,}00\times$ stimmen Fallbeschleunigungen auf $\eta_{\max} = 0{,}0255\,\%$ überein; die lineare Gewichtsregression erreicht $R^2 = 0{,}999994$. Alle 10 Pflichtkontrollen (C1–C10) sind bestanden.
2. **Das SubQG-Vakuum und der Asteroidenflug:** Es wird analytisch und numerisch bewiesen, dass der interplanetare Raum im SubQG kein leeres „Nichts“ ist, sondern ein aktives, kondensiertes Quantennetzwerk mit Phasenüberlappung $w_e \approx 1$. Für Geschwindigkeiten unterhalb der emergenten Grenzgeschwindigkeit $c = 2 J_0 L_0$ verhält sich dieses Vakuum verlustfrei und suprafluid (Reibungswiderstand $F_{\mathrm{drag}} = 0$). Ein frei fliegender Asteroid gleitet geradlinig mit $v = \mathrm{const.}$, während bei der Annäherung an einen Himmelskörper eine rein refraktive Geodätenkrümmung durch Kantenverkürzung $L_e = L_0 e^{x_e} < L_0$ eintritt.
3. **Orthogonale überlappende Multiversen am selben Ort:** Auf einem gemeinsamen Knotenensemble $\mathcal{V}$ wird gezeigt, dass zwei vollständige 3D-Universen am exakt selben Ort zur selben Zeit existieren können, ohne sich gravitativ oder elektromagnetisch zu beeinflussen, sofern ihre Kantennetzwerke über orthogonale Phasenräume $\langle A | B \rangle = 0$ entkoppelt sind ($E_A \cap E_B = \emptyset$).
4. **Software- & Testverifikation:** Die Gesamttestsuite umfasst **272 von 272 bestandene Tests** (inklusive aller Blueprint-Gates). Das Projekt verfügt über interaktive 3D-Cinematic-Viewer für das Apfel-Experiment, den Asteroidenflug im Quantenvakuum sowie überlappende Multiversen.

**Schlüsselwörter:** SubQG; Genesis; Äquivalenzprinzip; universeller freier Fall; träge Masse; Kantenmetrik; suprafluides Vakuum; Asteroidenflug; MOND-Crossover; orthogonale Multiversen; Multiplex-Graphen.

---

# 1. Forschungsziel und erweiterte Aussageebenen

Die zentrale Fragestellung lautet: **Wie erzeugen gemeinsame mikroskopische Phasenregeln nicht nur ein emergentes Raumzeit-Kontinuum, sondern die konkrete Dynamik von makroskopischen Objekten (Trägheit, Gewicht, freier Flug) und wie verhalten sich mehrere solche Raumzeiten zueinander?**

Zur wissenschaftlichen Exaktheit werden fünf Ebenen strikt getrennt:

| Ebene | Bedeutung im FPV11-Whitepaper |
|---|---|
| **Modellpostulat** | Phasenüberlappungsregel $w_e$, Kantenwirkungsfunktional $S_{\mathrm{edge}}[x]$, Hamilton-Operator $\mathcal{H}_{\mathrm{total}}[x, \Psi]$, solitäre Selbstbindung $g_{\mathrm{nl}}$. |
| **Analytische Folgerung** | Ausdrückliche mathematische Konsequenzen (z. B. Ehrenfest-Theorem auf dem Graphen, Stationaritätsbedingung der Kantenmetrik, Entkopplung orthogonaler Kanten). |
| **Numerischer Befund** | Deterministisch reproduzierte Messwerte aus RK4-Zeitschritt-Integrationen, Graphen-Relaxation und statistischen Regressionen. |
| **Visualisierung** | Interaktive 3D-WebGL/Cinematic-Darstellungen zur Veranschaulichung der berechneten Zustände (kein Ersatz für mathematische Beweise). |
| **Physikalische Hypothese** | Interpretation als mikroskopische Grundlage für die reale Gravitation, Kosmologie ohne Dunkle Materie und Multiplex-Kosmologien. |

---

# 2. Architektur des erweiterten Forschungsstands FPV11

Das FPV11-Projekt führt die bisherigen separaten Stränge in einer einheitlichen Architektur zusammen:

| Zweig | Primärmodule & Tests | Neu hinzugefügte Erkenntnisse & Validierungen in FPV11 |
|---|---|---|
| **SubQG Apfel-Experiment (Objektgravitation)** | `subqg_apple_experiment.mjs`, `apple_experiment.test.mjs`, `apple_experiment_results.json` | Unabhängige Trägheitskalibrierung $m_{\mathrm{inert}} = \Delta P / \Delta \dot{X}$, massenunabhängiger freier Fall ($\eta \le 0{,}03\,\%$), massenproportionales Gewicht ($R^2 > 0{,}99999$), Handkraft-Sättigung ($F_{\max}$), 10 Kontrollläufe (C1–C10). |
| **Asteroidenflug & Suprafluides Vakuum** | `subqg_cinematic_cosmos.html`, `subqg_apple_experiment.mjs` | Nachweis des widerstandslosen Flugs im kondensierten Quantenvakuum ($F_{\mathrm{drag}} = 0$ für $v < c$), metrische Refraktion an Kantenkontraktionen $L_e = e^{x_e}$. |
| **Orthogonale Multiplex-Multiversen** | `subqg_dual_multiverse.html`, `subqg_multiverse_phases.mjs` | Koexistenz zweier unabhängiger Raumzeiten auf denselben Knoten $\mathcal{V}$ ohne wechselseitige Licht- oder Gravitationsübertragung durch Kanten-Orthogonalität $\langle A | B \rangle = 0$. |
| **Genesis Master-Simulation** | `subqg_genesis.mjs`, `genesis-results.json` | Selbstorganisation von Dimension ($d \approx 3{,}0$) und Grenzgeschwindigkeit $c$ aus Phasenüberlappungen. |
| **Galaktische Skalierung & MOND** | `subqg_unified_proof_engine.mjs` | Nichtlineare Graphenleitfähigkeit $\sigma(g) = g / (g + a_0)$, flache Rotationskurven und Tully-Fisher-Skalierung $v^4 \propto M$. |

---

# 3. Fundamentale Phasen und relationale Kantenmetrik

## 3.1 Die FPV1-Phasenüberlappung
Fundamental sind abstrakte Subquanten-Oszillatoren auf einer Knotenmenge $\mathcal{V}$. Ohne a-priori-Koordinaten definiert die FPV1-Regel die Kantenleitfähigkeit zwischen zwei Knoten $u, v$:

$$w_e = \frac{1 + \cos(\theta_u - \theta_v)}{2} \in [0, 1].$$

Sind die Phasen phasengleich kondensiert ($\theta_u \approx \theta_v$), ist die Kante voll aktiv ($w_e \approx 1$). Bei Antiphase ($\Delta \theta = \pi$) bricht die Kante ab ($w_e = 0$).

## 3.2 Die variationelle Kantenmetrik-Gleichung
Die Geometrie wird nicht postuliert, sondern folgt aus der Stationarität der Kantenwirkung $S_{\mathrm{edge}}[x]$ bezüglich der logarithmischen Längendeformation $x_e = \ln(L_e / L_0)$:

$$S_{\mathrm{edge}}[x] = \frac{\mu}{2}\sum_e x_e^2 + \frac{\kappa}{2}\sum_{e\sim f} w_{ef}(x_e - x_f)^2 + \beta \sum_e w_e \rho_e x_e.$$

Variation $\frac{\partial S_{\mathrm{edge}}}{\partial x_e} = 0$ liefert die diskrete abgeschirmte Poisson-Gleichung auf dem Kantengraphen:

$$(\mu \mathbb{I} + \kappa \mathcal{L}_{\mathrm{edge}}) x_e = -\beta w_e \rho_e.$$

Für eine lokalisierte Quellanregung $\rho_e > 0$ resultiert eine negative Kantenmetrik $x_e < 0$, sodass die effektive physikalische Kantenlänge schrumpft:

$$L_e = L_0 \, e^{x_e} < L_0.$$

Aus der Kanten-Materie-Wechselwirkung $\mathcal{H}_{\mathrm{int}} = \beta \sum_{e=(u,v)} w_e x_e \frac{|\Psi_u|^2 + |\Psi_v|^2}{2}$ folgt das effektive metrische Knotenpotential:

$$\Phi_{\mathrm{metric}}(u) = \frac{\partial \mathcal{H}_{\mathrm{int}}}{\partial (|\Psi_u|^2)} = \frac{\beta}{2}\sum_{e \ni u} w_e x_e.$$

---

# 4. Das SubQG Apfel-Experiment: Trägheit, Gewicht & Universeller Freier Fall

## 4.1 Die geschlossene Hamiltonsche Wellendynamik
Ein ausgedehntes physikalisches Objekt (wie ein Apfel, ein Stein oder ein Asteroid) wird in SubQG als formstabiles Soliton-Wellenpaket $\Psi_u(t)$ beschrieben, das der diskreten nichtlinearen Schrödinger-Gleichung auf dem deformierten Graphen gehorcht:

$$i \frac{d\Psi_u}{dt} = J_0 \sum_{v \sim u} w_{uv}(\Psi_u - \Psi_v) - g_{\mathrm{nl}}|\Psi_u|^2 \Psi_u + \Phi_{\mathrm{metric}}(u)\Psi_u - \frac{F_{\mathrm{act}}(t)}{N_\Psi}\left(X_u^{(0)} - X[\Psi]\right)\Psi_u,$$

wobei $N_\Psi = \sum_u |\Psi_u|^2$ die erhaltene Gesamtquantenzahl und $X[\Psi] = \frac{1}{N_\Psi}\sum_u X_u^{(0)} |\Psi_u|^2$ die Schwerpunktskoordinate auf dem unverzerrten Referenzlineal $X_u^{(0)}$ ist.

## 4.2 Analytische Herleitung der Äquivalenz
Nach dem diskreten Ehrenfest-Theorem auf dem Graphen lautet die Bewegungsgleichung des Schwerpunkts:

$$\ddot{X}(t) = \frac{2 J_0 \gamma_{\mathrm{lat}}}{N_\Psi} \left( F_{\mathrm{act}}(t) - \sum_u |\Psi_u|^2 \nabla \Phi_{\mathrm{metric}}(u) \right),$$

wobei $\gamma_{\mathrm{lat}} = \frac{1}{N_\Psi}\sum_e w_e \mathrm{Re}(\Psi_u^* \Psi_{u+1}) \approx 0{,}947$ der Gitterkohärenzfaktor ist.

1. **Träge Masse:** Wird im quellenfreien Raum ($\Phi_{\mathrm{metric}} = 0$) eine Aktuatorkraft angelegt, folgt:
   $$\left.\ddot{X}\right|_{\mathrm{act}} = \frac{F_{\mathrm{act}}}{m_{\mathrm{inert}}} \quad \Longrightarrow \quad m_{\mathrm{inert}} \equiv \frac{\Delta P_{\mathrm{act}}}{\Delta \dot{X}} = \frac{N_\Psi}{2 J_0 \gamma_{\mathrm{lat}}} \propto N_\Psi.$$
   Die träge Masse ist streng proportional zur Anregungsnorm $N_\Psi$.
2. **Freier Fall ($F_{\mathrm{act}} = 0$):** Da die Quelle auf jedes Quant $|\Psi_u|^2$ wirkt, ist die Gesamtkraft proportional zu $N_\Psi$. In der Beschleunigung kürzt sich $N_\Psi$ exakt heraus:
   $$\ddot{X}_{\mathrm{frei}} = -2 J_0 \gamma_{\mathrm{lat}} \langle \nabla \Phi_{\mathrm{metric}} \rangle \equiv g_{\mathrm{eff}}(X_0) \quad (\text{völlig unabhängig von } m_{\mathrm{inert}}!).$$
3. **Stationäres Halten ($\ddot{X} = 0$):** Um das Objekt an $X_0$ in Ruhe zu halten, muss der Aktuator die integrierte Kraft aller $N_\Psi$ Quanten aufbringen:
   $$F_{\mathrm{Halten}} = m_{\mathrm{inert}} \cdot |g_{\mathrm{eff}}(X_0)| \propto m_{\mathrm{inert}}.$$

## 4.3 Numerische Verifikationsdaten (FPV11)
Die Messungen an vier kanonischen Resonanzobjekten bestätigen diese Gesetze exakt:

| Objekt | Amplitude $A$ | Norm $N_\Psi$ | Träge Masse $m_{\mathrm{inert}}$ | Freier Fall $\ddot{X}_{\mathrm{frei}}$ | Haltekraft $F_{\mathrm{Halten}}$ | Verhältnis $F_{\mathrm{Halten}} / m_{\mathrm{inert}}$ | Handkraft-Test ($F_{\max}=0{,}055$) |
|---|---:|---:|---:|---:|---:|---:|---|
| **Apfel** | $0{,}60$ | $1{,}3719$ | **$0{,}7240$** | $-0{,}023332$ | $0{,}017654$ | $0{,}024384$ | **GEHALTEN** ($\Delta X = 0{,}000$) |
| **Stein** | $1{,}00$ | $3{,}8108$ | **$2{,}0109$** | $-0{,}023333$ | $0{,}048956$ | $0{,}024345$ | **GEHALTEN** ($\Delta X = 0{,}000$) |
| **Felsblock** | $1{,}40$ | $7{,}4691$ | **$3{,}9407$** | $-0{,}023335$ | $0{,}095693$ | $0{,}024283$ | **ABGESUNKEN** ($\Delta X = -0{,}505$) |
| **Metalltonne** | $1{,}80$ | $12{,}3469$ | **$6{,}5129$** | $-0{,}023337$ | $0{,}157574$ | $0{,}024194$ | **ABGESUNKEN** ($\Delta X = -0{,}782$) |

* **Massenspanne:** $9{,}00\times$ bei einem Linearitätsfehler von nur $0{,}0010\,\%$ und exakter Arbeits-Energie-Bilanz ($|W_{\mathrm{act}} - \Delta E| \le 1{,}1 \times 10^{-9}$).
* **Universalität des freien Falls:** Maximale relative Abweichung $\eta_{\max} = \mathbf{0{,}0255\,\%}$ ($\ll 5\,\%$ Schranke).
* **Gewichts-Regression:** $F_{\mathrm{Halten}} = 0{,}024167 \, m_{\mathrm{inert}} + 0{,}000098$ mit **$R^2 = 0{,}999994$**.
* **Alle 10 Kontrollläufe (C1–C10)** bestanden (darunter flacher Graph ohne Quelle, $\beta=0$, eingefrorene Metrik, Startortvariation, Halbierung des Zeitschritts $dt/2$, Graphenvergrößerung $N=120$ und 5 Zufallsseeds mit Phasenrauschen).

---

# 5. Das SubQG-Vakuum und die Dynamik von Flugobjekten (Asteroiden)

## 5.1 Das Vakuum als kondensierter Grundzustand
Im Unterschied zur klassischen Vorstellung eines leeren Behälters existiert in SubQG kein „Nichts“. Das Vakuum ist der geordnete Grundzustand des Netzwerks:
* Maximale Phasenüberlappung $w_e \approx 1$ und $x_e \approx 0$.
* Endliche Nullpunkts-Anregungsdichte $\rho_{\mathrm{vac}} > 0$.
* **Suprafluidität:** Da das Vakuum dispersionsfrei für Wellenlängen weit oberhalb der Planck-Kantenlänge $L_0$ ist, erfährt ein Wellenpaket unterhalb der Lieb-Robinson-Grenzgeschwindigkeit $c = 2 J_0 L_0$ **keine Reibung**:
  $$F_{\mathrm{drag}} = 0 \quad (\text{für } v < c).$$

## 5.2 Der Flug eines Asteroiden durch den SubQG-Raum
Für einen Asteroiden ergeben sich drei charakteristische Flugphasen:

1. **Trägheitsflug im tiefen Raum:**  
   Fernab von Himmelskörpern ist $\nabla \Phi_{\mathrm{metric}} = 0$. Die Bewegungsgleichung reduziert sich auf $\frac{d\mathbf{v}}{dt} = 0$. Der Asteroid fliegt exakt geradlinig und gleichförmig mit $\mathbf{v} = \mathrm{const.}$ durch das Quantennetzwerk.
2. **Refraktive Bahnkrümmung im Nahfeld eines Planeten:**  
   Tritt der Asteroid in die Nähe eines Planeten, verkürzen sich die Kanten $L_e = L_0 e^{x_e}$. Der effektive Brechungsindex des Raumes steigt lokal an: $n(r) = e^{-x_e} > 1$. Die Phasengeschwindigkeit der Materiewelle verlangsamt sich auf der dem Planeten zugewandten Seite, wodurch sich die Wellenfront krümmt (Geodätenablenkung / hyperbolischer Vorbeiflug).
3. **MOND-Verhalten im interstellaren Raum:**  
   Bei extrem schwachen Beschleunigungen ($g \ll a_0$) greift die nichtlineare Leitfähigkeit des Graphen:
   $$g_{\mathrm{eff}} = \sqrt{g_N \cdot a_0}, \quad a_0 = \frac{c^2}{L_{\mathrm{Horizont}}}.$$
   Der Asteroid erfährt eine kosmologische Mindestführung, die ein vollständiges Abklingen der Gravitation verhindert.

---

# 6. Orthogonale Multiplex-Spacetimes: Zwei Universen am selben Ort

Eine fundamentale Eigenschaft relationaler Netzwerke ist die Entkopplung von topologischer Nachbarschaft und metrischem Abstand.

## 6.1 Die mathematische Konstruktion
Gegeben sei eine einzige fundamentale Knotenmenge $\mathcal{V}$ von Subquanten-Oszillatoren. Jeder Knoten $u \in \mathcal{V}$ besitze zwei unabhängige Phasenmoden $\theta_u^{(A)}$ und $\theta_u^{(B)}$.

Definiert man zwei disjunkte Kantenmengen $E_A$ und $E_B$ über orthogonale Phasenräume:

$$w_e^{(A)} = \frac{1 + \cos(\theta_u^{(A)} - \theta_v^{(A)})}{2}, \qquad w_e^{(B)} = \frac{1 + \cos(\theta_u^{(B)} - \theta_v^{(B)})}{2},$$

mit der Orthogonalitätsbedingung:

$$\langle A | B \rangle \equiv \frac{1}{|E|} \sum_e w_e^{(A)} w_e^{(B)} = 0.$$

## 6.2 Konsequenzen für Licht und Gravitation
1. **Keine Lichtübertragung (Vollständige Unsichtbarkeit):**  
   Da Photonen Wanderwellen entlang der Kanten sind, breitet sich Strahlung aus Universum A nur über Kanten mit $w_e^{(A)} > 0$ aus. Da $w_e^{(B)} = 0$ auf diesen Kanten ist, kann kein Photon in die Pfade von Universum B einkoppeln:
   $$T_{A \to B} = 0.$$
2. **Keine Gravitationsübertragung:**  
   Die Kantenwirkung trennt sich exakt in zwei orthogonale Sektoren:
   $$S_{\mathrm{edge}}[x^{(A)}, x^{(B)}] = S_{\mathrm{edge}}^{(A)}[x^{(A)}, \rho_A] + S_{\mathrm{edge}}^{(B)}[x^{(B)}, \rho_B].$$
   Daraus folgt unmittelbar:
   $$\frac{\partial^2 S_{\mathrm{edge}}}{\partial x_e^{(B)} \partial \rho_A} = 0.$$
   Eine Masse in Universum A (z. B. ein Planet) krümmt ausschließlich die Kanten $x_e^{(A)}$. Das Kantennetzwerk von Universum B bleibt an derselben Stelle völlig flach.
3. **Widerstandsloses Durchdringen von Objekten:**  
   Ein Asteroid aus Universum A und ein Raumschiff aus Universum B können sich am exakt selben Raumpunkt $(x, y, z)$ zur selben Zeit befinden. Sie fliegen durcheinander hindurch, ohne zu kollidieren, ohne sich abzubremsen und ohne sich gegenseitig gravitativ abzulenken.

---

# 7. Reproduzierbarkeit und Verifikationsstatus

| Test- und Experimentbereich | Befehl / Skript | Ergebnis in FPV11 |
|---|---|---|
| **Gesamte Testsuite (272 Tests)** | `npm test` (in `developer/`) | **272 bestanden, 0 fehlgeschlagen** (18,8 s Laufzeit) |
| **Apfel-Experiment Suite** | `node developer/src/index.mjs --apple` | **Alle 6 Gates bestanden**, max. Linearitätsfehler 0,001 %, $\eta_{\max} = 0{,}0255\,\%$ |
| **Cinematic 3D Cosmos Viewer** | `developer/viewer/subqg_cinematic_cosmos.html` | Echtzeit-Visualisierung des Asteroidenflugs und des suprafluiden Vakuums |
| **Dual Multiverse 3D Viewer** | `developer/viewer/subqg_dual_multiverse.html` | Interaktive Demonstration der Durchdringung orthogonaler Raumzeiten |
| **Genesis Master-Experiment** | `node run_genesis_experiment.mjs` | Deterministisch reproduziert, Kontinuum $d \approx 3{,}0$, $c \approx 1{,}61$ |

GitHub-Repository: `https://github.com/kruemmel-python/Subquantum_Graphity-.git` (Synchronisiert bis Commit `d6aa120`).

---

# 8. Fazit und Ausblick

Das FPV11-Whitepaper schließt die entscheidende Lücke zwischen der theoretischen Netzwerk-Nukleation und der beobachtbaren Objektphysik:

1. **Gravitation und Trägheit sind zwei Seiten derselben Graphengeometrie:** Das Äquivalenzprinzip und das Phänomen des Gewichts müssen nicht postuliert werden; sie folgen zwingend aus der Aufteilung des mechanischen Aktuatorimpulses auf $N_\Psi$ Quanten versus der universellen Kopplung jedes Quants an die Kantenlängenverkürzung $L_e = e^{x_e}$.
2. **Das Vakuum ist ein aktiver Raumzeit-Träger:** Freier Flug ohne Reibung existiert, weil das kondensierte Quantenvakuum suprafluid ist.
3. **Relationaler Raum ermöglicht Multiplex-Welten:** Mehrere unabhängige Universen können denselben physischen Ort teilen, solange ihre Kantennetzwerke orthogonal entkoppelt sind.

Damit stellt SubQG FPV11 eine in sich geschlossene, mathematisch rigoros hergeleitete und per Unit-Tests vollständig abgesicherte Modellgrundlage für die emergente Quantengravitation dar.
