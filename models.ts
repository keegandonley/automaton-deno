export const simple = {
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
};