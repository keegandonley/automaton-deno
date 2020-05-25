const EPSILON = 'ε';
const SIGMA = 'Σ';
const INTERSECT = '∩';
const UNION = '∪';

function sortStateOrder(state: string) {
	if (state === ',') {
		return '';
	}
	if (state[0] === ',') {
		state = state.slice(1);
	}
	let parts = state.split(',').filter(x => x);
	parts = parts.sort(((a, b) => a < b ? 1 : a > b ? -1 : 0));
	return parts.join(',');
}

export interface IEdge {
	target: string;
	input: string;
}

export interface IDFA {
	[node: string]: {
		edges: IEdge[],
		accepting?: boolean;
	}
}

export default class DFA {
	_inputIdx: number;
	_inputString: string;
	_start: string;
	_processor: any;
	_dfa: IDFA;
	_state: any;

	constructor(settings: { dfa: IDFA, start: string } = { dfa: {}, start: '' }) {
		this._dfa = settings.dfa;
		this._state = null;
		this._inputIdx = 0;
		this._inputString = '';
		this._processor = null;
		this._start = settings.start;
	}

	acceptsNull() {
		if (this.isNFA()) {
			const cl = this.getEpsilonClosure(this._start).filter((state) => this._dfa[state].accepting);
			return cl.length > 0;
		}
		return this._start ? this._dfa[this._start].accepting : false;
	}

	isAccepting(node: string) {
		return this._dfa[node].accepting;
	}

	isStart(node: string) {
		return this._start === node;
	}

	// Set the starting state
	start(start: string) {
		this._state = start;
		this._start = start;
		return this;
	}

	// Set an accepting state
	accept(state: string, val: boolean = true) {
		this._dfa[state].accepting = val;
		return this;
	}

	addNode(target: string, accepting: boolean, edges: IEdge[] = []) {
		if (!this._dfa[target]) {
			this._dfa[target] = {
				edges,
			};
			this._dfa[target].accepting = accepting || false;
		} else {
		}
		return this;
	}

	addEdge(from: string, target: string, input: string) {
		const idx = this._dfa[from].edges.findIndex((edge) => edge.target === target);
		if (idx >= 0) {
			const inputs = this._dfa[from].edges[idx].input.split(',');
			const inputIDX = inputs.indexOf(input);
			if (inputIDX < 0) {
				this._dfa[from].edges[idx].input = `${this._dfa[from].edges[idx].input},${input}`;
			}
		} else {
			this._dfa[from].edges.push({
				target,
				input,
			});
		}
		return this;
	}

	getStructure() {
		return {
			dfa: this._dfa,
			start: this._start,
		};
	}

	// Moves the DFA forward by one state
	*advance() {
		if (this.isNFA()) {
			const conversion = this.enfaToDfa();
			conversion._inputString = this._inputString;
			conversion._inputIdx = this._inputIdx;
			if (!conversion._state) {
				yield null;
			}
			if (!conversion._inputString) {
				yield null;
			}
			while (conversion._inputString.length > conversion._inputIdx) {
				const inputVal = conversion._inputString[conversion._inputIdx];
				const next = conversion._dfa[conversion._state].edges.find((state) => {
					return state.input && state.input.includes(inputVal);
				});
				if (!next) {
					return {
						done: true,
						accepted: false,
					}
				}
				conversion._inputIdx = conversion._inputIdx + 1;
				conversion._state = next.target;
				yield {
					target: next.target,
					done: conversion._inputString.length === conversion._inputIdx,
					accepted: conversion._inputString.length === conversion._inputIdx && conversion._dfa[conversion._state].accepting
				};
			}
		} else {
			if (!this._state) {
				yield null;
			}
			if (!this._inputString) {
				yield null;
			}
			while (this._inputString.length > this._inputIdx) {
				const inputVal = this._inputString[this._inputIdx];
				const next = this._dfa[this._state].edges.find((state) => {
					return state.input && state.input.includes(inputVal);
				});
				if (!next) {
					return {
						done: true,
						accepted: false,
					}
				}
				this._inputIdx = this._inputIdx + 1;
				this._state = next.target;
				yield {
					target: next.target,
					done: this._inputString.length === this._inputIdx,
					accepted: this._inputString.length === this._inputIdx && this._dfa[this._state].accepting
				};
			}
		}

	}

	// Process the string
	// Returns: object
	process(inputString: string) {
		this._inputString = inputString;
		this._inputIdx = 0;
		this._processor = this.advance();
		this._state = this._start;
		const path = [];
		let accepted = false;
		if (!inputString && this.acceptsNull()) {
			return {
				path: [],
				accepted: true,
			};
		}
		for (let i = 0; i < this._inputString.length; i++) {
			const val = this._processor.next().value;
			if (!val) {
				return {
					path,
					accepted: false,
				};
			}
			path.push(val.target);
			accepted = val.accepted;
		}

		return {
			path,
			accepted,
		};
	}

	getState(target: string) {
		if (this._dfa[target]) {
			return this._dfa[target];
		} else {
		}
	}

	_valueMatches(left: string, right: string) {
		const leftArr = left.split(',');
		const rightArr = right.split(',');
		const res = [];
		for (let i = 0; i < leftArr.length; i++) {
			for (let j = 0; j < rightArr.length; j++) {
				if (leftArr[i] === rightArr[j]) {
					res.push(leftArr[i]);
				}
			}
		}
		return res;
	}

	intersection(input: any) {
		const dfa = input;
		const result = new DFA();
		const done: any[] = [];

		if (this.isNFA()) {
			console.log('this')
			const res = this.enfaToDfa();
			this._dfa = res._dfa;
			this._start = res._start;
		}
		if (dfa.isNFA()) {
			console.log('dfa')
			const res = dfa.enfaToDfa();
			dfa._dfa = res._dfa;
			dfa._start = res._start;
		}
		const stack = [[this._start, dfa._start]];
		const dfal = this._dfa;
		const dfar = dfa._dfa;
		const start = `${this._start}${dfa._start}`;
		// Add the node to the DFA

		result.addNode(
			start,
			this._dfa[this._start].accepting && dfa._dfa[dfa._start].accepting,
			[],
		);

		while (stack.length) {
			const last = stack.pop();
			const left = last?.[0];
			const right = last?.[1];

			// get the left and right DFA nodes
			const leftState = dfal[left];
			const rightState = dfar[right];
			done.push(`${last?.[0]}${last?.[1]}`);
			// Iterate through the left DFA's edges first, checking each right edge
			leftState.edges.forEach((edgel: IEdge) => {
				rightState.edges.forEach((edger: IEdge) => {
					let matches = this._valueMatches(edgel.input, edger.input);
					if (matches.length) {
						matches.forEach((label) => {
							result.addNode(
								`${edgel.target}${edger.target}`,
								dfal[edgel.target].accepting && dfar[edger.target].accepting,
								[],
							);
							result.addEdge(`${left}${right}`, `${edgel.target}${edger.target}`, label);
							if (!done.includes(`${edgel.target}${edger.target}`)) {
								stack.push([edgel.target, edger.target]);
							}
						})
					}
				});
			});
		}
		result.start(start);
		return result;
	}

	isNFA() {
		const states = Object.keys(this._dfa);
		let result = false;
		const language = this.getLanguage();

		states.forEach((stateIdx) => {
			let edges = this._dfa[stateIdx].edges
			let count = 0;
			edges.forEach((edgeIdx) => {
				let input = edgeIdx.input
				let inputArray = input.split(',')
				language.forEach((languageIdx) => {
					inputArray.forEach((inputIdx) => {
						if (inputIdx === languageIdx) {
							count++;
						}
					})
				})
			})
			if (count !== language.length) {
				result = true;
				return false;
			}
		})
		return result;
	}

	getLanguage() {
		const states = Object.keys(this._dfa);
		const language: any[] = [];
		states.forEach((stateIdx) => {
			let edges = this._dfa[stateIdx].edges

			edges.forEach((edgeIdx) => {
				let input = edgeIdx.input
				let inputArray = input.split(',')

				inputArray.forEach((inputIdx) => {
					if (!language.includes(inputIdx)) {
						language.push(inputIdx);
					}
				})
			})
		})
		return language;
	}

	getEpsilonClosure(state: string) {
		// e-closure always contains itself
		const states: any[] = [];
		const done: any[] = [];
		const start = this._dfa[state];
		const { edges } = start;
		edges.forEach((edge) => {
			if (edge.input.includes(EPSILON)) {
				states.push(edge.target);
			}
		});
		while (states.length) {
			const next = states.pop();
			const current = this._dfa[next];
			const { edges } = current;
			edges.forEach((edge) => {
				if (edge.input.includes(EPSILON)) {
					states.push(edge.target);
				}
			});
			done.push(next);
		}
		done.push(state);
		return done;
	}

	getAcceptingStates() {
		return Object.keys(this._dfa).map((state) => {
			if (this._dfa[state].accepting) {
				return state;
			}
			return null;
		}).filter(x => x);
	}

	getTargetOnInput(sourceState: string, input: string) {
		const state = this._dfa[sourceState];
		const { edges } = state;
		const result = [];
		for (let i = 0; i < edges.length; i++) {
			if (edges[i].input.includes(input)) {
				result.push(edges[i].target);
			}
		}
		return result;
	}

	getConversionMeta(language: any) {
		const states = Object.keys(this._dfa);
		const closures: { [s: string]: any } = {};
		const table: { [s: string]: any } = {};

		// Set up closure mapping
		states.forEach((temp) => {
			const state = sortStateOrder(temp);
			closures[state] = this.getEpsilonClosure(state);
			table[state] = {};
			language.forEach((val: any) => {
				table[state][val] = null;
			})
		});

		// Build transition table
		language.forEach((input: string) => {
			states.forEach((temp) => {
				const state = sortStateOrder(temp);
				const closure = closures[state];
				const recheck: any[] = [];
				closure.forEach((state: string) => {
					const result = this.getTargetOnInput(state, input);
					result.forEach((temp) => {
						recheck.push(temp);
					});
				});
				const result: any[] = []
				recheck.forEach((temp) => {
					const cl = closures[temp];
					cl.forEach((target: string) => {
						const findIdx = result.indexOf(target);
						if (findIdx < 0) {
							result.push(target);
						}
					});
				});
				table[state][input] = result;
			});
		});

		return { closures, table };
	}

	enfaToDfa() {
		const allAccepting = this.getAcceptingStates();
		function isAccepting(state: any) {
			if (!state) {
				return false;
			}
			state = state.split(',');
			for (let i = 0; i < state.length; i++) {
				if (allAccepting.indexOf(state[i]) >= 0) {
					return true;
				}
			}
			return false;
		}
		const result = new DFA();
		let language = this.getLanguage();
		if (!this.isNFA()) {
			return this;
		}
		language = language.filter((x => x !== EPSILON));

		const { table } = this.getConversionMeta(language);

		const done: any[] = [];
		// Add states and edges
		Object.keys(table).forEach((state) => {
			result.addNode(sortStateOrder(state), isAccepting(sortStateOrder(state)));
			language.forEach((input) => {
				const target = table[sortStateOrder(state)][input];
				if (target.length) {
					const targetState = target.reduce((acc: string, val: string) => `${val},${acc}`);
					result.addNode(sortStateOrder(targetState), isAccepting(sortStateOrder(targetState)));
					result.addEdge(sortStateOrder(state), sortStateOrder(targetState), input);
					const next = [sortStateOrder(targetState)];
					while (next && next.length) {
						const top = next.pop()?.split(',') ?? [];
						if (done.indexOf(top) < 0 && !(top.length === 1 && !top[0])) {
							language.forEach((tempInput) => {
								let newState = '';
								for (let i = 0; i < top.length; i++) {
									// top is in question, need to resolve
									const partial = table[top[i]][tempInput];
									partial.forEach((newTarget: string) => {
										if (newState.indexOf(newTarget) < 0) {
											newState = `${newTarget},${newState}`
										}
									})
								}
								result.addNode(sortStateOrder(newState), isAccepting(sortStateOrder(newState)));
								result.addEdge(sortStateOrder(top.join(',')), sortStateOrder(newState), tempInput);
								if (done.indexOf(sortStateOrder(newState)) < 0) {
									next.push(sortStateOrder(newState));
								}
							})
						}
						done.push(sortStateOrder(top.join(',')));
					}
				}
			});
			done.push(sortStateOrder(state));
		})
		result.start(this._start);
		return this.normalize(result).removeUnreachable();
	}

	normalize(structure: any) {
		const norm = new DFA();
		const states = Object.keys(structure._dfa);
		states.forEach((state) => {
			norm.addNode(state.replace(/,/g, ''), structure._dfa[state].accepting);
		});
		states.forEach((state) => {
			structure._dfa[state].edges.forEach((edge: IEdge) => {
				norm.addEdge(state.replace(/,/g, ''), edge.target.replace(/,/g, ''), edge.input);
			})
		});
		norm.start(structure._start);
		Object.keys(norm._dfa).forEach((state) => {
			norm._dfa[state].edges.forEach((edge, idx) => {
				if (edge.target === '') {
					norm._dfa[state].edges[idx].target = 'fail';
				}
			});
		});
		if (norm._dfa['']) {
			const replacement = norm._dfa[''];
			replacement.edges = [];
			const language = this.getLanguage().filter((l) => l !== EPSILON);
			language.forEach((l) => {
				replacement.edges.push({
					target: 'fail',
					input: l,
				});
			});
			delete norm._dfa[''];
			norm._dfa.fail = replacement;
		}
		return norm;
	}

	removeEpsilons() {
		const allAccepting = this.getAcceptingStates();
		function isAccepting(cl: any) {
			if (!cl) {
				return false;
			}
			for (let i = 0; i < cl.length; i++) {
				if (allAccepting.includes(sortStateOrder(cl[i]))) {
					return true;
				}
			}
			return false;
		}
		const result = new DFA();
		let language = this.getLanguage();
		if (!language.includes(EPSILON)) {
			return this;
		}
		language = language.filter((x => x !== EPSILON));

		const { table, closures } = this.getConversionMeta(language);
		Object.keys(table).forEach((temp) => {
			const state = sortStateOrder(temp);
			result.addNode(state, isAccepting(closures[state]));
			language.forEach((input) => {
				const targets = table[state][input];
				targets.forEach((temp2: any) => {
					const target = sortStateOrder(temp2);
					result.addNode(target, isAccepting(closures[target]));
					result.addEdge(state, target, input);
				});
			});
		});

		result.start(this._start);
		return result.removeUnreachable();
	}

	union(dfa: any) {
		const thisStates = Object.keys(this._dfa);
		const dfaStates = Object.keys(dfa._dfa);
		const result = new DFA();

		// Adding start state
		const startEdges = [{ input: EPSILON, target: this._start }, { input: EPSILON, target: dfa._start }];
		if (this._start === dfa._start) {
			startEdges[1].target = startEdges[1].target + '1';
		}
		let startName
		if (!this._dfa['U'] || !dfa._dfa['U']) {
			startName = 'U'
		} else {
			startName = 'Union'
		}
		result.addNode(startName, false, startEdges);
		result._start = startName;

		// Check for exisiting names
		let sameName: string[] = [];
		thisStates.forEach((thisState) => {
			dfaStates.forEach((dfaState) => {
				if (thisState === dfaState) {
					sameName.push(thisState);
				}
			});
		});

		// Recreating states from argument dfa with new names if needed
		dfaStates.forEach((dfaState) => {
			let tempEdges: IEdge[] = [];
			dfa._dfa[dfaState].edges.forEach((edge: IEdge) => {
				if (sameName.includes(edge.target)) {
					let target = edge.target + '1';
					tempEdges.push({ input: edge.input, target });
				} else {
					tempEdges.push(edge);
				}
			});
			if (sameName.includes(dfaState)) {
				result.addNode(dfaState + '1', dfa._dfa[dfaState].accepting, tempEdges)
			} else {
				result.addNode(dfaState, dfa._dfa[dfaState].accepting, tempEdges)
			}
		});

		// Recreating current object states 
		thisStates.forEach((thisState) => {
			result.addNode(thisState, this._dfa[thisState].accepting ?? false, this._dfa[thisState].edges);
		});
		return result.removeUnreachable();
	}

	deleteNode(target: string) {
		if (this._dfa[target]) {
			const states = Object.keys(this._dfa);
			states.forEach((state) => {
				const updatedEdges = this._dfa[state].edges.filter((edge) => {
					return edge.target !== target;
				});
				this._dfa[state].edges = updatedEdges;
			});
			delete this._dfa[target];
		} else {
		}
		return this;
	}

	deleteEdge(source: string, target: string) {
		if (this._dfa[source] && this._dfa[target]) {
			const updatedEdges = this._dfa[source].edges.filter((current) => {
				return current.target !== target;
			});
			this._dfa[source].edges = updatedEdges;
		} else {
		};
		return this;
	}

	removeUnreachable() {
		const states = Object.keys(this._dfa);
		let check = states.slice();
		states.forEach((s) => {
			const state = this._dfa[s];
			state.edges.forEach((edge) => {
				const { target } = edge;
				check = check.filter((temp) => {
					if (temp === target || temp === this._start) {
						return false;
					}
					return true;
				});
			})
		});
		check.forEach((target) => {
			delete this._dfa[target];
		});
		return this;
	}
}