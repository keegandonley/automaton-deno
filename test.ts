import * as modelMap from "https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.1/models.ts";
import DFA, {
  IDFAInput,
} from "https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.1/automaton.ts";
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

Deno.test("Should load a simple graph", () => {
	const graph = new DFA(modelMap.simple);
	assertEquals(graph.getStructure(), modelMap.simple);
});

Deno.test("Should execute a simple graph with accepted input", () => {
  const graph = new DFA(modelMap.simple);
  const { path, accepted} = graph.process('010');
  assertEquals(accepted, true);
  assertEquals(path, ['C', 'A', 'C']);
});

Deno.test("Should execute a simple graph with rejected input", () => {
  const graph = new DFA(modelMap.simple);
  const { path, accepted } = graph.process("0101");
  assertEquals(accepted, false);
  assertEquals(path, ['C', 'A', 'C', 'A']);
});