/*
 * Author: Keegan Donley
 * 
 * CLI for interacting with the DFA class
 */

import * as modelMap from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.1/models.ts';
import DFA, { IDFAInput } from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/0.0.1/automaton.ts';


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

const automaton = new DFA(models[prebuiltGraphName]);

const { path, accepted} = automaton.process(inputString);

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