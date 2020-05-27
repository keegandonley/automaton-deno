<div align="center">
	<img width="200" src=".github/graph.png" alt="Graph Logo" /> 
</div>

# Automaton CLI
![Tests](https://github.com/keegandonley/automaton-deno/workflows/Tests/badge.svg)

CLI for executing automatons. This is a port of some of the business logic from the [Online Automaton Builder](https://automatonbuilder.com/).

Designed to be run with [Deno](https://deno.land/):
```bash
deno run index.ts "01010"
```

The DFA class can be imported into a Deno project using

```js
import DFA from 'https://raw.githubusercontent.com/keegandonley/automaton-deno/master/automaton.ts';

```

Future work will focus on the construction of graphs programatically or reading in from a file. For the time being, a JSON file is loaded with the following structure:

```json
{
	"dfa": {
		"A": {
			"edges": [
				{
					"target": "B",
					"input": "1"
				},
				{
					"target": "C",
					"input": "0"
				}
			],
			"accepting": false
		},
		"B": {
			"edges": [
				{
					"target": "A",
					"input": "0"
				},
				{
					"target": "C",
					"input": "1"
				}
			],
			"accepting": false
		},
		"C": {
			"edges": [
				{
					"target": "B",
					"input": "0"
				},
				{
					"target": "A",
					"input": "1"
				}
			],
			"accepting": true
		}
	},
	"start": "A"
}
```

## Interactive Mode
Build an automaton node by node and test strings against it

```
make run
```


## Class Methods
Processing the input string:

```typescript
automaton.process('010')
```

will yield:

```typescript
{ path: [ "C", "A", "C" ], accepted: true }
```
