/*
 * Author: Keegan Donley
 * 
 * CLI for interacting with the DFA class
 */

import * as models from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/master/models.ts';
import DFA from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/master/automaton.ts';

const automaton = new DFA(models.simple);

let input = '';

const { args } = Deno;

if (args.length > 0 && typeof args[0] === 'string') {
	input = args[0]
}

const { path, accepted} = automaton.process(input);

if (accepted) {
	console.log('🎉 Your input was accepted!');
} else {
	console.log('👻 Your input was rejected');
}

if (accepted && path) {
	console.log('\n--------------------------------------------------');
	console.log(path.length, 'steps to acceptance:');
	let pathStr = '';
	path.forEach((step: string, index: number) => {
		pathStr = `${pathStr}${step}${index < path.length - 1 ? ' ---> ' : ''}`;
	});
	console.log(pathStr);
}