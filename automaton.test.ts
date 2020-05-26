import * as modelMap from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.2/models.ts';
import DFA, {
  EPSILON,
} from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.2/automaton.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

Deno.test("Should load a simple DF", () => {
	const graph = new DFA(modelMap.simple);
	assertEquals(graph.getStructure(), modelMap.simple);
});

Deno.test("Should execute a simple DFA with accepted input", () => {
	const graph = new DFA(modelMap.simple);
	const { path, accepted} = graph.process('010');
	assertEquals(accepted, true);
	assertEquals(path, ['C', 'A', 'C']);
});

Deno.test("Should execute a simple DFA with rejected input", () => {
	const graph = new DFA(modelMap.simple);
	const { path, accepted } = graph.process("0101");
	assertEquals(accepted, false);
	assertEquals(path, ['C', 'A', 'C', 'A']);
});

Deno.test(`Should load an ${EPSILON} NFA`, () => {
	const graph = new DFA(modelMap.epsilon);
	assertEquals(graph.getStructure(), modelMap.epsilon);
});

Deno.test(`Should execute an ${EPSILON} NFA with accepted input`, () => {
	const graph = new DFA(modelMap.epsilon);
	const { path, accepted } = graph.process("010");
	assertEquals(accepted, true);
	assertEquals(path, ["zyx", "zy", "z"]);
});

Deno.test(`Should execute an ${EPSILON} NFA with rejected input`, () => {
  const graph = new DFA(modelMap.epsilon);
  const { path, accepted } = graph.process("0102");
  assertEquals(accepted, false);
  assertEquals(path, ["zyx", "zy", "z", undefined]);
});

Deno.test(`Should load an ${EPSILON}-free NFA`, () => {
	const graph = new DFA(modelMap.epsilonFree);
	assertEquals(graph.getStructure(), modelMap.epsilonFree);
});

Deno.test(`Should execute an ${EPSILON}-free NFA with accepted input`, () => {
  const graph = new DFA(modelMap.epsilonFree);
  const { path, accepted } = graph.process("010");
  assertEquals(accepted, true);
  assertEquals(path, ["edcba", "edb", "ec"]);
});

Deno.test(`Should execute an ${EPSILON}-free NFA with rejected input`, () => {
  const graph = new DFA(modelMap.epsilonFree);
  const { path, accepted } = graph.process("0102");
  assertEquals(accepted, false);
  assertEquals(path, ["edcba", "edb", "ec", undefined]);
});