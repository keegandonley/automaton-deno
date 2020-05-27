/*
 * Author: Keegan Donley
 * 
 * CLI for interacting with the DFA class
 */

import * as modelMap from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.2/models.ts';
import DFA, { IDFAInput, EPSILON } from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.2/automaton.ts';
import InputLoop from 'https://raw.githubusercontent.com/keegandonley/deno-input/0.0.6/index.ts';


let inputString = '';
let prebuiltGraphName = 'simple'

const { args } = Deno;

const models = modelMap as any as {
  [name: string]: IDFAInput;
};


if (args.length > 0) {
	if (args.length === 1 && typeof args[0] === 'string') {
		inputString = args[0]
	} else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
		inputString = args[1]
		if (Object.keys(models).includes(args[0])) {
			prebuiltGraphName = args[0];
		}
	}	
}

if (args[0] === 'interactive') {
	const input = new InputLoop();
	const automaton = new DFA();

	const mainQuestions = ["Add a node", "Add an edge", "Set starting node", "Evaluate a string", "Quit"];
	while (!input.done) {
		const result = await input.choose(mainQuestions);

		if (result[0]) {
			const nodeName = await input.question('Enter the label for the node:');
			const accepting = await input.choose(["Accepting node", "Non-accepting node"]);

			automaton.addNode(nodeName, accepting[0]);
			console.log(automaton.getStructure())
		} else if (result[1]) {
			const nodeA = await input.question('Enter the source node:');
			const nodeB = await input.question('Enter the target node:');
			const edgeType = await input.choose(["Labeled edge", `${EPSILON} edge`]);

			if (edgeType[0]) {
				const edgeLabel = await input.question('Enter the edge label:');
				automaton.addEdge(nodeA, nodeB, edgeLabel);
			} else {
				automaton.addEdge(nodeA, nodeB, EPSILON);
			}
		} else if (result[2]) {
			const startingNode = await input.question('Enter the starting node:');
			automaton.start(startingNode);
		} else if (result[3]) {
			const inputString = await input.question('Input to test:');
			const { accepted, path } = automaton.process(inputString);

			if (accepted) {
				console.log("🎉 Your input was accepted!");
			} else {
				console.log("👻 Your input was rejected");
			}
			console.log(path);
		} else if (result[mainQuestions.length - 1]) {
			input.close();
		}
	}
} else {
	const automaton = new DFA(models[prebuiltGraphName]);

	const { path, accepted } = automaton.process(inputString);

	if (accepted) {
		console.log("🎉 Your input was accepted!");
	} else {
		console.log("👻 Your input was rejected");
	}

	if (accepted && path) {
		console.log("\n--------------------------------------------------");
		console.log(path.length, "steps to acceptance:");
		let pathStr = "";
		path.forEach((step: string, index: number) => {
			pathStr = `${pathStr}${step}${index < path.length - 1 ? " ---> " : ""}`;
		});
		console.log(pathStr);
	}
}
