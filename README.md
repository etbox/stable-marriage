# stable-marriage-problem

A javascript implementation of [stable marriage problem](https://en.wikipedia.org/wiki/Stable_marriage_problem), influenced by [algorithm-archive](https://github.com/algorithm-archivists/algorithm-archive/blob/master/contents/stable_marriage_problem/code/javascript/stable-marriage.js)

# Installation

Use npm:

```
npm install stable-marriage
```

Or use yarn:

```
yarn add stable-marriage
```

# Usage

```javascript
const { Person, stableMarriage, shuffle } = require('stable-marriage')

const boys = [...'ABCD'].map((name) => new Person(name))
const girls = [...'abcd'].map((name) => new Person(name))

console.log('boys')
for (const boy of boys) {
	boy.generatePreferences(shuffle(girls))
	console.log(`${boy.name}: ${boy.preferences.map((p) => p.name).join()}`)
}
console.log('\nGirls')
for (const girl of girls) {
	girl.generatePreferences(shuffle(boys))
	console.log(`${girl.name}: ${girl.preferences.map((p) => p.name).join()}`)
}

stableMarriage(boys)

console.log('\nPairings')
for (const boy of boys) {
	if (boy.fiance) {
		console.log(`${boy.name}: ${boy.fiance.name}`)
	}
}
```

Run the example code and your terminal should log like this:

```
boys
A: c,b,d,a
B: b,d,c,a
C: b,c,a,d
D: d,c,a,b

Girls
a: B,A,D,C
b: B,D,C,A
c: C,D,A,B
d: A,C,B,D

Pairings
A: d
B: b
C: c
D: a
```
