import Mathlib.Basic.Real.Basic
import Mathlib.Algebra.BigOperators.Ring.Finset
import Mathlib.Tactic.FieldSimp
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Positivity
import Mathlib.Tactic.Ring

/-!
# Formal SubQG edge-action derivation

This file formalizes the mathematical core used by
`src/modules/subqg_microaction.mjs` and
`src/modules/subqg_apple_experiment.mjs`:

1. a finite weighted graph;
2. the quadratic edge action;
3. its weak stationarity equation;
4. the stationary-minimum consequence;
5. the node metric potential;
6. norm-weighted object force and discrete motion.

The action is an explicit model ansatz.  Lean proves consequences of the
stated ansatz and assumptions; it does not assert that the ansatz is a law of
nature.
-/

set_option autoImplicit false

open scoped BigOperators

namespace SubQG

noncomputable section

/--
A finite graph with weighted edges and a finite list of interacting edge
pairs.  `Pair` represents the line-graph adjacency used by the JavaScript
metric solver.  Each pair occurs once, matching the implementation's
`e ~ f` sum.
-/
structure FiniteWeightedGraph
    (Vertex Edge Pair : Type)
    [Fintype Vertex] [Fintype Edge] [Fintype Pair] where
  edgeSrc : Edge → Vertex
  edgeDst : Edge → Vertex
  edgeWeight : Edge → ℝ
  edgeWeight_nonneg : ∀ e, 0 ≤ edgeWeight e
  pairLeft : Pair → Edge
  pairRight : Pair → Edge
  pairWeight : Pair → ℝ
  pairWeight_nonneg : ∀ p, 0 ≤ pairWeight p

section EdgeAction

variable
  {Vertex Edge Pair : Type}
  [Fintype Vertex] [Fintype Edge] [Fintype Pair]
  (G : FiniteWeightedGraph Vertex Edge Pair)

/--
The implemented edge action

`S(x) = μ/2 ∑ xₑ² + κ/2 ∑ cₚ(x_left(p)-x_right(p))²
        + β ∑ wₑ ρₑ xₑ`.
-/
def edgeAction
    (μ κ β : ℝ) (ρ x : Edge → ℝ) : ℝ :=
  (∑ e : Edge, ((μ / 2) * (x e)^2 + β * G.edgeWeight e * ρ e * x e)) +
  ∑ p : Pair, (κ / 2) * G.pairWeight p *
    (x (G.pairLeft p) - x (G.pairRight p))^2

/-- Coefficient of `t` in `S(x+t h)-S(x)`. -/
def firstVariation
    (μ κ β : ℝ) (ρ x h : Edge → ℝ) : ℝ :=
  (∑ e : Edge, (μ * x e * h e + β * G.edgeWeight e * ρ e * h e)) +
  ∑ p : Pair, κ * G.pairWeight p *
    (x (G.pairLeft p) - x (G.pairRight p)) *
    (h (G.pairLeft p) - h (G.pairRight p))

/-- Quadratic remainder in the variation of the action. -/
def quadraticRemainder
    (μ κ : ℝ) (h : Edge → ℝ) : ℝ :=
  (∑ e : Edge, (μ / 2) * (h e)^2) +
  ∑ p : Pair, (κ / 2) * G.pairWeight p *
    (h (G.pairLeft p) - h (G.pairRight p))^2

/--
Exact finite-dimensional expansion of the action along an arbitrary
variation.  This is the algebraic replacement for an informal derivative.
-/
theorem edgeAction_along_variation
    (μ κ β t : ℝ) (ρ x h : Edge → ℝ) :
    edgeAction G μ κ β ρ (fun e => x e + t * h e) =
      edgeAction G μ κ β ρ x +
      t * firstVariation G μ κ β ρ x h +
      t^2 * quadraticRemainder G μ κ h := by
  classical
  have hedge :
      (∑ e : Edge,
        ((μ / 2) * (x e + t * h e)^2 +
          β * G.edgeWeight e * ρ e * (x e + t * h e))) =
        (∑ e : Edge, ((μ / 2) * (x e)^2 + β * G.edgeWeight e * ρ e * x e)) +
        t * (∑ e : Edge, (μ * x e * h e + β * G.edgeWeight e * ρ e * h e)) +
        t^2 * (∑ e : Edge, (μ / 2) * (h e)^2) := by
    rw [Finset.mul_sum, Finset.mul_sum]
    rw [← Finset.sum_add_distrib, ← Finset.sum_add_distrib]
    apply Finset.sum_congr rfl
    intro e _
    ring
  have hpairs :
      (∑ p : Pair, (κ / 2) * G.pairWeight p *
        ((x (G.pairLeft p) + t * h (G.pairLeft p)) -
          (x (G.pairRight p) + t * h (G.pairRight p)))^2) =
        (∑ p : Pair, (κ / 2) * G.pairWeight p *
          (x (G.pairLeft p) - x (G.pairRight p))^2) +
        t * (∑ p : Pair, κ * G.pairWeight p *
          (x (G.pairLeft p) - x (G.pairRight p)) *
          (h (G.pairLeft p) - h (G.pairRight p))) +
        t^2 * (∑ p : Pair, (κ / 2) * G.pairWeight p *
          (h (G.pairLeft p) - h (G.pairRight p))^2) := by
    rw [Finset.mul_sum, Finset.mul_sum]
    rw [← Finset.sum_add_distrib, ← Finset.sum_add_distrib]
    apply Finset.sum_congr rfl
    intro p _
    ring
  simp only [edgeAction, firstVariation, quadraticRemainder]
  rw [hedge, hpairs]
  ring

/--
Weak Euler--Lagrange equation.  In matrix notation this is exactly

`(μ I + κ L_edge) x = -β (w ⊙ ρ)`.

Using all test variations avoids hiding a coordinate or differentiability
assumption.
-/
def IsStationary
    (μ κ β : ℝ) (ρ x : Edge → ℝ) : Prop :=
  ∀ h : Edge → ℝ, firstVariation G μ κ β ρ x h = 0

theorem stationary_action_expansion
    {μ κ β : ℝ} {ρ x : Edge → ℝ}
    (hx : IsStationary G μ κ β ρ x)
    (h : Edge → ℝ) :
    edgeAction G μ κ β ρ (fun e => x e + h e) =
      edgeAction G μ κ β ρ x + quadraticRemainder G μ κ h := by
  have hv := edgeAction_along_variation G μ κ β 1 ρ x h
  rw [hx h] at hv
  simpa using hv

theorem quadraticRemainder_nonneg
    {μ κ : ℝ} (hμ : 0 ≤ μ) (hκ : 0 ≤ κ)
    (h : Edge → ℝ) :
    0 ≤ quadraticRemainder G μ κ h := by
  classical
  apply add_nonneg
  · apply Finset.sum_nonneg
    intro e _
    exact mul_nonneg (div_nonneg hμ (by norm_num)) (sq_nonneg (h e))
  · apply Finset.sum_nonneg
    intro p _
    exact mul_nonneg
      (mul_nonneg (div_nonneg hκ (by norm_num)) (G.pairWeight_nonneg p))
      (sq_nonneg (h (G.pairLeft p) - h (G.pairRight p)))

/-- Every stationary configuration is a global action minimizer. -/
theorem stationary_is_global_minimum
    {μ κ β : ℝ} {ρ x : Edge → ℝ}
    (hμ : 0 ≤ μ) (hκ : 0 ≤ κ)
    (hx : IsStationary G μ κ β ρ x)
    (y : Edge → ℝ) :
    edgeAction G μ κ β ρ x ≤ edgeAction G μ κ β ρ y := by
  let h : Edge → ℝ := fun e => y e - x e
  have hexpand := stationary_action_expansion G hx h
  have hnonneg := quadraticRemainder_nonneg G hμ hκ h
  have hpoint : (fun e => x e + h e) = y := by
    funext e
    simp [h]
  rw [hpoint] at hexpand
  linarith

/-- The stationarity equation evaluated in the direction `h=x`. -/
theorem stationary_energy_balance
    {μ κ β : ℝ} {ρ x : Edge → ℝ}
    (hx : IsStationary G μ κ β ρ x) :
    (∑ e : Edge, (μ * x e * x e + β * G.edgeWeight e * ρ e * x e)) +
      ∑ p : Pair, κ * G.pairWeight p *
        (x (G.pairLeft p) - x (G.pairRight p)) *
        (x (G.pairLeft p) - x (G.pairRight p)) = 0 := by
  simpa only [firstVariation] using hx x

end EdgeAction

section PotentialAndMotion

variable
  {Vertex Edge Pair : Type}
  [Fintype Vertex]
  [Fintype Edge] [Fintype Pair]
  (G : FiniteWeightedGraph Vertex Edge Pair)

section NodePotential

variable [DecidableEq Vertex]

/-- `Φ_metric(u) = β/2 ∑_{e∋u} wₑ xₑ`, matching the JS model. -/
def nodeMetricPotential (β : ℝ) (x : Edge → ℝ) (u : Vertex) : ℝ :=
  (β / 2) * ∑ e : Edge,
    if G.edgeSrc e = u ∨ G.edgeDst e = u
    then G.edgeWeight e * x e
    else 0

end NodePotential

/-- Total excitation norm `N_Ψ = ∑ᵤ ρᵤ`. -/
def objectNorm (density : Vertex → ℝ) : ℝ :=
  ∑ u, density u

/--
Force obtained from a discrete directional derivative of the metric
potential: `F = -∑ᵤ ρᵤ ∇Φ(u)`.
-/
def metricForce
    (density potentialGradient : Vertex → ℝ) : ℝ :=
  -∑ u, density u * potentialGradient u

/-- In the normalized model, inertial mass is the packet norm. -/
def inertialMass (density : Vertex → ℝ) : ℝ :=
  objectNorm density

/-- Acceleration of the packet center under the norm-weighted force. -/
def objectAcceleration
    (density potentialGradient : Vertex → ℝ) : ℝ :=
  metricForce density potentialGradient / inertialMass density

/-- A simple discrete state for the packet center. -/
structure MotionState where
  position : ℝ
  velocity : ℝ

/-- Symplectic-Euler center update used as a formal movement abstraction. -/
def motionStep (dt acceleration : ℝ) (s : MotionState) : MotionState :=
  let nextVelocity := s.velocity + dt * acceleration
  { position := s.position + dt * nextVelocity
    velocity := nextVelocity }

theorem metricForce_constant_gradient
    (density : Vertex → ℝ) (g : ℝ) :
    metricForce density (fun _ => -g) = objectNorm density * g := by
  classical
  simp [metricForce, objectNorm, Finset.sum_mul]

/--
Formal free-fall universality theorem.

Assumption: the directional metric-potential gradient is constant (`-g`)
over the packet support and the packet norm is nonzero.  Under exactly these
conditions the norm cancels and the center acceleration is independent of the
object norm.
-/
theorem constant_metric_gradient_gives_universal_acceleration
    (density : Vertex → ℝ) (g : ℝ)
    (hnorm : objectNorm density ≠ 0) :
    objectAcceleration density (fun _ => -g) = g := by
  rw [objectAcceleration, metricForce_constant_gradient]
  simp [inertialMass, hnorm]

/-- Holding force is proportional to the packet norm in the same field. -/
theorem holding_force_is_mass_proportional
    (density : Vertex → ℝ) (g : ℝ) :
    -metricForce density (fun _ => -g) = -(inertialMass density * g) := by
  rw [metricForce_constant_gradient]
  rfl

theorem motionStep_velocity
    (dt acceleration : ℝ) (s : MotionState) :
    (motionStep dt acceleration s).velocity =
      s.velocity + dt * acceleration := by
  rfl

theorem motionStep_position
    (dt acceleration : ℝ) (s : MotionState) :
    (motionStep dt acceleration s).position =
      s.position + dt * (s.velocity + dt * acceleration) := by
  rfl

/-- One formally verified movement step in a constant metric field. -/
theorem universal_free_fall_step
    (density : Vertex → ℝ) (g dt : ℝ)
    (hnorm : objectNorm density ≠ 0)
    (s : MotionState) :
    motionStep dt (objectAcceleration density (fun _ => -g)) s =
      motionStep dt g s := by
  rw [constant_metric_gradient_gives_universal_acceleration density g hnorm]

end PotentialAndMotion

#print axioms edgeAction_along_variation
#print axioms stationary_action_expansion
#print axioms quadraticRemainder_nonneg
#print axioms stationary_is_global_minimum
#print axioms stationary_energy_balance
#print axioms metricForce_constant_gradient
#print axioms constant_metric_gradient_gives_universal_acceleration
#print axioms holding_force_is_mass_proportional
#print axioms universal_free_fall_step

end

end SubQG
