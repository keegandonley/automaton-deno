import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Output, { AutomatonOutput } from "./output.ts";

Deno.test("Should initialize silent", () => {
	new Output({
		silent: true,
	});
});

Deno.test("Should initialize with no options", () => {
	new Output();
});

Deno.test("Should initialize automaton output silent", () => {
	new AutomatonOutput({
		silent: true,
	});
});

Deno.test("Should initialize automaton output with no options", () => {
	new AutomatonOutput();
});

Deno.test("Should get success message", () => {
	const output = new AutomatonOutput({
		silent: true,
	});
	const result = output.success();
	assertEquals(result, '🎉 Your input was accepted!');
});

Deno.test("Should get failure message", () => {
	const output = new AutomatonOutput({
		silent: true,
	});
	const result = output.failure();
	assertEquals(result, "👻 Your input was rejected");
});

Deno.test("Should get dynamic message (true)", () => {
	const output = new AutomatonOutput({
		silent: true,
	});
  	const result = output.printResult(true);
	assertEquals(result, "🎉 Your input was accepted!");
});

Deno.test("Should get dynamic message (true)", () => {
	const output = new AutomatonOutput({
		silent: true,
	});
  	const result = output.printResult(false);
	assertEquals(result, "👻 Your input was rejected")
});
