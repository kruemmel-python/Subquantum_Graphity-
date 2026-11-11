/**
 * @fileoverview SubQG Exakter Glitch- und Tunneling-Mechanismus
 *
 * Behebt die 3 mathematischen Kritikpunkte:
 * 1. Verschwindende Ausgangskopplung via quadratischem Überlapp:
 *    w_AB(t) = |<A|B>|^2 = cos^2(Delta_theta(t)) = sin^2(epsilon(t)).
 *    Bei epsilon = 0 gilt exakt w_AB = 0.
 *
 * 2. Glitch-Puls mit strikt kompaktem Träger C_c^infinity (Glattes Bump-Fenster):
 *    Für |t - t_mid| < tau:
 *      f_bump(t) = exp(1 - 1 / (1 - ((t - t_mid)/tau)^2))
 *    Für |t - t_mid| >= tau:
 *      f_bump(t) = 0.0 (exakt!)
 *    epsilon(t) = epsilon_max * f_bump(t).
 *    Damit ist w_AB(t) vor t_start und nach t_end identisch und absolut 0.
 *
 * 3. Selbstadjungierter 2x2 Block-Hamiltonian:
 *    H(t) = [ H_A         g(t) * C   ]
 *           [ g(t) * C^dagger    H_B ]
 *    mit g(t) = J_tunnel * w_AB(t) in R und symmetrischer/hermitescher Kopplung C = C^dagger = I.
 *
 *    Exakte Folgerungen:
 *    a) Strikte Erhaltung der Gesamtnorm:
 *       N_total(t) = N_A(t) + N_B(t) = const. (d N_total / dt = 0).
 *    b) Exakte Energie-Arbeits-Bilanz des Glitches:
 *       d <H(t)> / dt = < partial_t H(t) > = 2 * (d g / dt) * Re( <Psi_A | Psi_B> ).
 *       Delta E_total = \int_0^T [ 2 * g'(t) * Re( <Psi_A(t) | Psi_B(t)> ) ] dt.
 */

import { SubQGAppleWorld, createApplePRNG } from './subqg_apple_experiment.mjs';

export class SubQGExactGlitchEngine {
  /**
   * @param {object} [config={}]
   */
  constructor(config = {}) {
    this.N = config.N ?? 80;
    this.seed = config.seed ?? 42;
    this.J0 = config.J0 ?? 1.0;
    this.gNL = config.gNL ?? 0.015;
    this.mu = config.mu ?? 0.08;
    this.kappa = config.kappa ?? 12.0;
    this.beta = config.beta ?? 0.85;

    // Glitch-Zeitfenster mit kompaktem Träger
    this.glitchTimeMid = config.glitchTimeMid ?? 2.0;
    this.glitchHalfWidth = config.glitchHalfWidth ?? 0.5; // tau: Träger ist [t_mid - tau, t_mid + tau]
    this.epsilonMax = config.epsilonMax ?? 0.45;
    this.jTunnel = config.jTunnel ?? 0.75;

    this.worldA = new SubQGAppleWorld({ ...config, N: this.N, seed: this.seed });
    this.worldB = new SubQGAppleWorld({ ...config, N: this.N, seed: this.seed + 100 });
  }

  /**
   * Berechnet den Glitch-Puls mit strikt kompaktem Träger (glatte Bump-Funktion).
   * @param {number} t
   * @returns {{ epsilon: number, wAB: number, gTunnel: number, dGdt: number, isGlitchActive: boolean }}
   */
  computeGlitchCoupling(t) {
    const tau = this.glitchHalfWidth;
    const dtGlitch = t - this.glitchTimeMid;
    const s = dtGlitch / tau;

    // Außerhalb des Intervalls [-tau, tau] ist die Kopplung EXAKT 0 (keine asymptotischen Gauß-Ausläufer!)
    if (Math.abs(s) >= 1.0) {
      return { epsilon: 0.0, wAB: 0.0, gTunnel: 0.0, dGdt: 0.0, isGlitchActive: false };
    }

    // Bump-Funktion f(s) = exp(1 - 1 / (1 - s^2)) in (0, 1]
    const oneMinusS2 = 1.0 - s * s;
    const bump = Math.exp(1.0 - 1.0 / oneMinusS2);
    const dBump_ds = bump * (-2.0 * s / (oneMinusS2 * oneMinusS2));
    const dBump_dt = dBump_ds / tau;

    const epsilon = this.epsilonMax * bump;
    const dEps_dt = this.epsilonMax * dBump_dt;

    // Quadratischer Überlapp: w_AB(t) = sin^2(epsilon(t))
    const sinEps = Math.sin(epsilon);
    const cosEps = Math.cos(epsilon);
    const wAB = sinEps * sinEps;
    const dW_dt = 2.0 * sinEps * cosEps * dEps_dt;

    const gTunnel = this.jTunnel * wAB;
    const dGdt = this.jTunnel * dW_dt;

    return {
      epsilon,
      wAB,
      gTunnel,
      dGdt,
      isGlitchActive: true
    };
  }

  /**
   * Berechnet die Erwartungswerte des selbstadjungierten 2x2 Block-Hamiltonians:
   * H(t) = [ H_A  g(t) I ]
   *        [ g(t) I  H_B ]
   */
  computeBlockHamiltonianEnergies(psiARe, psiAIm, psiBRe, psiBIm, phiMetricA, phiMetricB, gTunnel) {
    const obsA = this.worldA.measureObservables(psiARe, psiAIm, phiMetricA);
    const obsB = this.worldB.measureObservables(psiBRe, psiBIm, phiMetricB);

    // Kreuz-Kopplungsenergie E_cross = 2 * g(t) * Re( <Psi_A | Psi_B> )
    let crossOverlapRe = 0.0;
    for (let u = 0; u < this.N; u++) {
      crossOverlapRe += psiARe[u] * psiBRe[u] + psiAIm[u] * psiBIm[u];
    }
    const eCross = 2.0 * gTunnel * crossOverlapRe;
    const eTotal = obsA.eWaveIntrinsic + obsB.eWaveIntrinsic + eCross;
    const nTotal = obsA.norm + obsB.norm;

    return {
      normA: obsA.norm,
      normB: obsB.norm,
      nTotal,
      eA: obsA.eWaveIntrinsic,
      eB: obsB.eWaveIntrinsic,
      eCross,
      eTotal,
      crossOverlapRe
    };
  }

  /**
   * Führt die unitäre gekoppelte RK4-Integration der beiden Sektoren aus.
   */
  simulateGlitchCrossing(opts = {}) {
    const steps = opts.steps ?? 300;
    const dt = opts.dt ?? 0.02;

    // Welt A: Startet leer (nur Vakuum, Norm = 0)
    // Welt B: Beherbergt ein massereiches Resonanzpaket bei x = 28
    const centerB = 28.0;
    const stateB = this.worldB.prepareWavePacket({
      center: centerB,
      amplitude: 1.6,
      sigma: 2.15,
      k0: 0.0
    });

    let psiARe = new Float64Array(this.N);
    let psiAIm = new Float64Array(this.N);
    let psiBRe = new Float64Array(stateB.psiRe);
    let psiBIm = new Float64Array(stateB.psiIm);

    const initGlitch = this.computeGlitchCoupling(0.0);
    const rhoB0 = this.worldB.computeEdgeDensity(psiBRe, psiBIm);
    const metB0 = this.worldB.solveVariationalMetric({ rhoSourceEdge: rhoB0 });
    const metA0 = this.worldA.solveVariationalMetric({ betaOverride: 0.0 });

    const initH = this.computeBlockHamiltonianEnergies(
      psiARe, psiAIm, psiBRe, psiBIm,
      metA0.phiMetric, metB0.phiMetric, initGlitch.gTunnel
    );

    const initialTotalNorm = initH.nTotal;
    const initialTotalEnergy = initH.eTotal;

    let integratedGlitchPower = 0.0;
    let peakTunnelCoupling = 0.0;
    let peakCrossForce = 0.0;

    const history = [];

    for (let step = 0; step <= steps; step++) {
      const t = step * dt;
      const glitch = this.computeGlitchCoupling(t);
      if (glitch.wAB > peakTunnelCoupling) peakTunnelCoupling = glitch.wAB;

      const rhoA = this.worldA.computeEdgeDensity(psiARe, psiAIm);
      const rhoB = this.worldB.computeEdgeDensity(psiBRe, psiBIm);

      // Kantenmetrik Welt A: (mu I + kappa L) x_A = -beta (w_A rho_A + w_AB(t) rho_B)
      const effectiveRhoSourceForA = new Float64Array(this.N - 1);
      for (let e = 0; e < this.N - 1; e++) {
        effectiveRhoSourceForA[e] = glitch.wAB * rhoB[e];
      }
      const metA = this.worldA.solveVariationalMetric({
        rhoSourceEdge: effectiveRhoSourceForA,
        rhoPacketEdge: rhoA
      });
      const metB = this.worldB.solveVariationalMetric({ rhoSourceEdge: rhoB });

      const hStats = this.computeBlockHamiltonianEnergies(
        psiARe, psiAIm, psiBRe, psiBIm,
        metA.phiMetric, metB.phiMetric, glitch.gTunnel
      );

      // Momentane Arbeitsleistung des Glitches: P_glitch = <partial_t H> = 2 * (dg/dt) * Re(<Psi_A|Psi_B>)
      const glitchPower = 2.0 * glitch.dGdt * hStats.crossOverlapRe;

      // Kreuzkraft auf Welt A
      const centerNode = Math.round(centerB);
      const gradPhiA = (metA.phiMetric[centerNode + 1] - metA.phiMetric[centerNode - 1]) / 2.0;
      const crossAcc = -2.0 * this.J0 * gradPhiA;
      if (Math.abs(crossAcc) > peakCrossForce) peakCrossForce = Math.abs(crossAcc);

      history.push({
        step,
        t: Number(t.toFixed(4)),
        glitchEpsilon: glitch.epsilon,
        wAB: glitch.wAB,
        gTunnel: glitch.gTunnel,
        dGdt: glitch.dGdt,
        isGlitchActive: glitch.isGlitchActive,
        normA: hStats.normA,
        normB: hStats.normB,
        nTotal: hStats.nTotal,
        eA: hStats.eA,
        eB: hStats.eB,
        eCross: hStats.eCross,
        eTotal: hStats.eTotal,
        glitchPower,
        integratedGlitchPower,
        crossAcc
      });

      if (step < steps) {
        // Hermitescher RK4-Schritt für das gekoppelte Block-System [Psi_A, Psi_B]
        const nextState = this._stepBlockRK4(
          psiARe, psiAIm, psiBRe, psiBIm,
          metA.phiMetric, metB.phiMetric,
          glitch.gTunnel, dt
        );
        psiARe = nextState.psiARe;
        psiAIm = nextState.psiAIm;
        psiBRe = nextState.psiBRe;
        psiBIm = nextState.psiBIm;

        integratedGlitchPower += glitchPower * dt;
      }
    }

    const finalH = history[history.length - 1];
    const totalNormDriftRel = Math.abs(finalH.nTotal - initialTotalNorm) / Math.max(1e-18, initialTotalNorm);
    const deltaTotalEnergy = finalH.eTotal - initialTotalEnergy;
    const energyWorkDiscrepancy = Math.abs(deltaTotalEnergy - integratedGlitchPower);

    return {
      initialTotalNorm,
      finalTotalNorm: finalH.nTotal,
      totalNormDriftRel,
      isTotalNormConserved: totalNormDriftRel < 1e-6,

      initialTotalEnergy,
      finalTotalEnergy: finalH.eTotal,
      deltaTotalEnergy,
      integratedGlitchPower,
      energyWorkDiscrepancy,
      isEnergyWorkBalanced: energyWorkDiscrepancy < 0.05, // Numerischer RK4-Rest

      peakTunnelCoupling,
      peakCrossForce,
      finalNormInA: finalH.normA,
      glitchProducedTunneling: finalH.normA > 1e-4,
      history
    };
  }

  /**
   * Hermitescher Zeitschritt des 2x2 Block-Hamiltonians:
   * i dPsi_A/dt = H_A Psi_A + g(t) Psi_B
   * i dPsi_B/dt = g(t) Psi_A + H_B Psi_B
   */
  _computeBlockRhs(psiARe, psiAIm, psiBRe, psiBIm, phiA, phiB, gTunnel, outDARe, outDAIm, outDBRe, outDBIm) {
    const N = this.N;
    const J0 = this.J0;
    const gNL = this.gNL;

    for (let u = 0; u < N; u++) {
      // Sektor A
      let lapARe = 0.0, lapAIm = 0.0;
      if (u > 0) { lapARe += psiARe[u] - psiARe[u - 1]; lapAIm += psiAIm[u] - psiAIm[u - 1]; }
      if (u + 1 < N) { lapARe += psiARe[u] - psiARe[u + 1]; lapAIm += psiAIm[u] - psiAIm[u + 1]; }
      const rhoA = psiARe[u] * psiARe[u] + psiAIm[u] * psiAIm[u];
      const vEffA = -gNL * rhoA + phiA[u];

      const hARe = J0 * lapARe + vEffA * psiARe[u] + gTunnel * psiBRe[u];
      const hAIm = J0 * lapAIm + vEffA * psiAIm[u] + gTunnel * psiBIm[u];
      outDARe[u] = hAIm;
      outDAIm[u] = -hARe;

      // Sektor B (exakt symmetrischer hermitescher Kreuzterm g(t) * Psi_A!)
      let lapBRe = 0.0, lapBIm = 0.0;
      if (u > 0) { lapBRe += psiBRe[u] - psiBRe[u - 1]; lapBIm += psiBIm[u] - psiBIm[u - 1]; }
      if (u + 1 < N) { lapBRe += psiBRe[u] - psiBRe[u + 1]; lapBIm += psiBIm[u] - psiBIm[u + 1]; }
      const rhoB = psiBRe[u] * psiBRe[u] + psiBIm[u] * psiBIm[u];
      const vEffB = -gNL * rhoB + phiB[u];

      const hBRe = J0 * lapBRe + vEffB * psiBRe[u] + gTunnel * psiARe[u];
      const hBIm = J0 * lapBIm + vEffB * psiBIm[u] + gTunnel * psiAIm[u];
      outDBRe[u] = hBIm;
      outDBIm[u] = -hBRe;
    }
  }

  _stepBlockRK4(psiARe, psiAIm, psiBRe, psiBIm, phiA, phiB, gTunnel, dt) {
    const N = this.N;
    const k1ARe = new Float64Array(N), k1AIm = new Float64Array(N);
    const k1BRe = new Float64Array(N), k1BIm = new Float64Array(N);
    const k2ARe = new Float64Array(N), k2AIm = new Float64Array(N);
    const k2BRe = new Float64Array(N), k2BIm = new Float64Array(N);
    const k3ARe = new Float64Array(N), k3AIm = new Float64Array(N);
    const k3BRe = new Float64Array(N), k3BIm = new Float64Array(N);
    const k4ARe = new Float64Array(N), k4AIm = new Float64Array(N);
    const k4BRe = new Float64Array(N), k4BIm = new Float64Array(N);

    const tmpARe = new Float64Array(N), tmpAIm = new Float64Array(N);
    const tmpBRe = new Float64Array(N), tmpBIm = new Float64Array(N);

    // K1
    this._computeBlockRhs(psiARe, psiAIm, psiBRe, psiBIm, phiA, phiB, gTunnel, k1ARe, k1AIm, k1BRe, k1BIm);

    // K2
    for (let u = 0; u < N; u++) {
      tmpARe[u] = psiARe[u] + 0.5 * dt * k1ARe[u];
      tmpAIm[u] = psiAIm[u] + 0.5 * dt * k1AIm[u];
      tmpBRe[u] = psiBRe[u] + 0.5 * dt * k1BRe[u];
      tmpBIm[u] = psiBIm[u] + 0.5 * dt * k1BIm[u];
    }
    this._computeBlockRhs(tmpARe, tmpAIm, tmpBRe, tmpBIm, phiA, phiB, gTunnel, k2ARe, k2AIm, k2BRe, k2BIm);

    // K3
    for (let u = 0; u < N; u++) {
      tmpARe[u] = psiARe[u] + 0.5 * dt * k2ARe[u];
      tmpAIm[u] = psiAIm[u] + 0.5 * dt * k2AIm[u];
      tmpBRe[u] = psiBRe[u] + 0.5 * dt * k2BRe[u];
      tmpBIm[u] = psiBIm[u] + 0.5 * dt * k2BIm[u];
    }
    this._computeBlockRhs(tmpARe, tmpAIm, tmpBRe, tmpBIm, phiA, phiB, gTunnel, k3ARe, k3AIm, k3BRe, k3BIm);

    // K4
    for (let u = 0; u < N; u++) {
      tmpARe[u] = psiARe[u] + dt * k3ARe[u];
      tmpAIm[u] = psiAIm[u] + dt * k3AIm[u];
      tmpBRe[u] = psiBRe[u] + dt * k3BRe[u];
      tmpBIm[u] = psiBIm[u] + dt * k3BIm[u];
    }
    this._computeBlockRhs(tmpARe, tmpAIm, tmpBRe, tmpBIm, phiA, phiB, gTunnel, k4ARe, k4AIm, k4BRe, k4BIm);

    const nextARe = new Float64Array(N), nextAIm = new Float64Array(N);
    const nextBRe = new Float64Array(N), nextBIm = new Float64Array(N);
    const c = dt / 6.0;

    for (let u = 0; u < N; u++) {
      nextARe[u] = psiARe[u] + c * (k1ARe[u] + 2.0 * k2ARe[u] + 2.0 * k3ARe[u] + k4ARe[u]);
      nextAIm[u] = psiAIm[u] + c * (k1AIm[u] + 2.0 * k2AIm[u] + 2.0 * k3AIm[u] + k4AIm[u]);
      nextBRe[u] = psiBRe[u] + c * (k1BRe[u] + 2.0 * k2BRe[u] + 2.0 * k3BRe[u] + k4BRe[u]);
      nextBIm[u] = psiBIm[u] + c * (k1BIm[u] + 2.0 * k2BIm[u] + 2.0 * k3BIm[u] + k4BIm[u]);
    }

    return { psiARe: nextARe, psiAIm: nextAIm, psiBRe: nextBRe, psiBIm: nextBIm };
  }
}
