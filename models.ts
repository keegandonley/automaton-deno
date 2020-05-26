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

export const epsilon = {
  "dfa": {
    "x": {
      "edges": [
        {
          "target": "x",
          "input": "0"
        },
        {
          "target": "y",
          "input": "ε"
        }
      ],
      "accepting": false
    },
    "y": {
      "edges": [
        {
          "target": "y",
          "input": "1"
        },
        {
          "target": "z",
          "input": "ε"
        }
      ],
      "accepting": false
    },
    "z": {
      "edges": [
        {
          "target": "z",
          "input": "0,1"
        }
      ],
      "accepting": true
    }
  },
  "start": "x"
};

export const epsilonFree = {
  "dfa": {
    "a": {
      "edges": [
        {
          "target": "a",
          "input": "0"
        },
        {
          "target": "c",
          "input": "0"
        },
        {
          "target": "b",
          "input": "0"
        },
        {
          "target": "e",
          "input": "0,1"
        },
        {
          "target": "d",
          "input": "0,1"
        }
      ],
      "accepting": false
    },
    "b": {
      "edges": [
        {
          "target": "c",
          "input": "0"
        },
        {
          "target": "e",
          "input": "1"
        }
      ],
      "accepting": false
    },
    "c": {
      "edges": [
        {
          "target": "b",
          "input": "1"
        }
      ],
      "accepting": false
    },
    "d": {
      "edges": [
        {
          "target": "e",
          "input": "0"
        }
      ],
      "accepting": false
    },
    "e": {
      "edges": [],
      "accepting": true
    }
  },
  "start": "a"
}

export const large = {
  "dfa": {
    "S": {
      "edges": [
        {
          "target": "a1",
          "input": "A"
        },
        {
          "target": "b1",
          "input": "B,C,D"
        }
      ],
      "accepting": false
    },
    "a1": {
      "edges": [
        {
          "target": "a2",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b2",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a2": {
      "edges": [
        {
          "target": "a3",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b3",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a3": {
      "edges": [
        {
          "target": "a4",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b4",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a4": {
      "edges": [
        {
          "target": "a5",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b5",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a5": {
      "edges": [
        {
          "target": "a6",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b6",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a6": {
      "edges": [
        {
          "target": "a7",
          "input": "A"
        },
        {
          "target": "F",
          "input": "B,C"
        },
        {
          "target": "b7",
          "input": "D"
        }
      ],
      "accepting": false
    },
    "a7": {
      "edges": [
        {
          "target": "acc",
          "input": "A,D"
        },
        {
          "target": "F",
          "input": "B,C"
        }
      ],
      "accepting": false
    },
    "acc": {
      "edges": [
        {
          "target": "F2",
          "input": "A,B,C,D"
        }
      ],
      "accepting": true
    },
    "F": {
      "edges": [
        {
          "target": "F",
          "input": "A,B,C,D"
        }
      ],
      "accepting": false
    },
    "b1": {
      "edges": [
        {
          "target": "b2",
          "input": "B,C,D"
        },
        {
          "target": "a2",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b2": {
      "edges": [
        {
          "target": "b3",
          "input": "B,C,D"
        },
        {
          "target": "a3",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b3": {
      "edges": [
        {
          "target": "b4",
          "input": "B,C,D"
        },
        {
          "target": "a4",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b4": {
      "edges": [
        {
          "target": "b5",
          "input": "B,C,D"
        },
        {
          "target": "a5",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b5": {
      "edges": [
        {
          "target": "b6",
          "input": "B,C,D"
        },
        {
          "target": "a6",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b6": {
      "edges": [
        {
          "target": "b7",
          "input": "B,C,D"
        },
        {
          "target": "a7",
          "input": "A"
        }
      ],
      "accepting": false
    },
    "b7": {
      "edges": [
        {
          "target": "acc",
          "input": "B,C,D,A"
        }
      ],
      "accepting": false
    },
    "F2": {
      "edges": [
        {
          "target": "F2",
          "input": "A,B,C,D"
        }
      ],
      "accepting": false
    }
  },
  "start": "S"
}