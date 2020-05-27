run:
	deno run index.ts interactive

simple:
	deno run index.ts simple 01010

test:
	deno test automaton.test.ts
	deno test output.test.ts