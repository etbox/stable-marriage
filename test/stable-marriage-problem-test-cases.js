const {
	Person,
	stableMarriage,
	clearNotReferedPerson,
} = require('../stable-marriage-problem')

const commonCases = [
	// 先写 6 * 6 的
	[
		// boys.length === 1
		{ boys: { A: ['a'] }, girls: { a: ['A'] }, pairings: { A: 'a' } },
		{
			boys: { A: 'b,a'.split(',') },
			girls: { a: ['A'], b: ['A'] },
			pairings: { A: 'b' },
		},
		{
			boys: { A: 'c,a,b'.split(',') },
			girls: { a: ['A'], b: ['A'], c: ['A'] },
			pairings: { A: 'c' },
		},
		{
			boys: { A: 'a,c,d,b'.split(',') },
			girls: { a: ['A'], b: ['A'], c: ['A'], d: ['A'] },
			pairings: { A: 'a' },
		},
		{
			boys: { A: 'e,c,d,a,b'.split(',') },
			girls: { a: ['A'], b: ['A'], c: ['A'], d: ['A'], e: ['A'] },
			pairings: { A: 'e' },
		},
		{
			boys: { A: 'e,c,d,f,a,b'.split(',') },
			girls: { a: ['A'], b: ['A'], c: ['A'], d: ['A'], e: ['A'], f: ['A'] },
			pairings: { A: 'e' },
		},
	],
	[
		// boys.length === 2
		{
			boys: { A: ['a'], B: ['a'] },
			girls: { a: 'A,B'.split(',') },
			pairings: { A: 'a' },
		},
		{
			boys: { A: 'b,a'.split(','), B: 'a,b'.split(',') },
			girls: { a: 'B,A'.split(','), b: 'B,A'.split(',') },
			pairings: { A: 'b', B: 'a' },
		},
		{
			boys: { A: 'a,b,c'.split(','), B: 'c,a,b'.split(',') },
			girls: { a: 'A,B'.split(','), b: 'A,B'.split(','), c: 'A,B'.split(',') },
			pairings: { A: 'a', B: 'c' },
		},
		{
			boys: { A: 'c,d,a,b'.split(','), B: 'a,c,b,d'.split(',') },
			girls: {
				a: 'B,A'.split(','),
				b: 'A,B'.split(','),
				c: 'A,B'.split(','),
				d: 'B,A'.split(','),
			},
			pairings: { A: 'c', B: 'a' },
		},
		{
			boys: { A: 'c,a,d,b,e'.split(','), B: 'e,d,a,c,b'.split(',') },
			girls: {
				a: 'B,A'.split(','),
				b: 'B,A'.split(','),
				c: 'B,A'.split(','),
				d: 'B,A'.split(','),
				e: 'B,A'.split(','),
			},
			pairings: { A: 'c', B: 'e' },
		},
		{
			boys: { A: 'c,f,b,d,e,a'.split(','), B: 'c,a,e,b,d,f'.split(',') },
			girls: {
				a: 'B,A'.split(','),
				b: 'A,B'.split(','),
				c: 'B,A'.split(','),
				d: 'B,A'.split(','),
				e: 'B,A'.split(','),
				f: 'B,A'.split(','),
			},
			pairings: { A: 'f', B: 'c' },
		},
	],
	[
		// boys.length === 3
		{
			boys: { A: ['a'], B: ['a'], C: ['a'] },
			girls: { a: 'C,A,B'.split(',') },
			pairings: { C: 'a' },
		},
		{
			boys: { A: 'a,b'.split(','), B: 'b,a'.split(','), C: 'a,b'.split(',') },
			girls: { a: 'B,A,C'.split(','), b: 'C,B,A'.split(',') },
			pairings: { B: 'a', C: 'b' },
		},
		{
			boys: {
				A: 'b,a,c'.split(','),
				B: 'a,b,c'.split(','),
				C: 'c,b,a'.split(','),
			},
			girls: {
				a: 'B,A,C'.split(','),
				b: 'B,A,C'.split(','),
				c: 'B,C,A'.split(','),
			},
			pairings: { A: 'b', B: 'a', C: 'c' },
		},
		{
			boys: {
				A: 'd,b,a,c'.split(','),
				B: 'c,b,d,a'.split(','),
				C: 'd,a,b,c'.split(','),
			},
			girls: {
				a: 'A,B,C'.split(','),
				b: 'C,B,A'.split(','),
				c: 'A,B,C'.split(','),
				d: 'C,B,A'.split(','),
			},
			pairings: { A: 'b', B: 'c', C: 'd' },
		},
		{
			boys: {
				A: 'd,b,a,c,e'.split(','),
				B: 'a,b,e,c,d'.split(','),
				C: 'b,a,d,c,e'.split(','),
			},
			girls: {
				a: 'A,C,B'.split(','),
				b: 'A,C,B'.split(','),
				c: 'A,C,B'.split(','),
				d: 'C,B,A'.split(','),
				e: 'C,B,A'.split(','),
			},
			pairings: { A: 'd', B: 'a', C: 'b' },
		},
		{
			boys: {
				A: 'a,f,d,e,b,c'.split(','),
				B: 'b,f,d,e,c,a'.split(','),
				C: 'a,e,f,b,c,d'.split(','),
			},
			girls: {
				a: 'C,B,A'.split(','),
				b: 'A,C,B'.split(','),
				c: 'C,A,B'.split(','),
				d: 'B,A,C'.split(','),
				e: 'B,C,A'.split(','),
				f: 'C,A,B'.split(','),
			},
			pairings: { A: 'f', B: 'b', C: 'a' },
		},
	],
	[
		// boys.length === 4
		{
			boys: { A: ['a'], B: ['a'], C: ['a'], D: ['a'] },
			girls: { a: 'A,D,B,C'.split(',') },
			pairings: { A: 'a' },
		},
		{
			boys: {
				A: 'b,a'.split(','),
				B: 'b,a'.split(','),
				C: 'a,b'.split(','),
				D: 'a,b'.split(','),
			},
			girls: { a: 'C,D,B,A'.split(','), b: 'C,A,D,B'.split(',') },
			pairings: { A: 'b', C: 'a' },
		},
		{
			boys: {
				A: 'c,b,a'.split(','),
				B: 'b,c,a'.split(','),
				C: 'a,b,c'.split(','),
				D: 'c,b,a'.split(','),
			},
			girls: {
				a: 'D,B,C,A'.split(','),
				b: 'A,B,D,C'.split(','),
				c: 'D,A,C,B'.split(','),
			},
			pairings: { A: 'b', B: 'a', D: 'c' },
		},
		{
			boys: {
				A: 'c,b,a,d'.split(','),
				B: 'b,c,a,d'.split(','),
				C: 'b,a,c,d'.split(','),
				D: 'd,c,b,a'.split(','),
			},
			girls: {
				a: 'C,B,A,D'.split(','),
				b: 'A,D,C,B'.split(','),
				c: 'B,D,C,A'.split(','),
				d: 'A,B,C,D'.split(','),
			},
			pairings: { A: 'b', B: 'c', C: 'a', D: 'd' },
		},
		{
			boys: {
				A: 'c,a,b,d,e'.split(','),
				B: 'd,c,a,b,e'.split(','),
				C: 'c,d,b,e,a'.split(','),
				D: 'c,d,e,b,a'.split(','),
			},
			girls: {
				a: 'C,D,A,B'.split(','),
				b: 'C,A,D,B'.split(','),
				c: 'D,C,B,A'.split(','),
				d: 'B,A,D,C'.split(','),
				e: 'D,B,C,A'.split(','),
			},
			pairings: { A: 'a', B: 'd', C: 'b', D: 'c' },
		},
		{
			boys: {
				A: 'd,b,e,a,f,c'.split(','),
				B: 'f,b,d,e,a,c'.split(','),
				C: 'a,d,c,b,f,e'.split(','),
				D: 'e,f,d,b,a,c'.split(','),
			},
			girls: {
				a: 'C,A,D,B'.split(','),
				b: 'A,D,C,B'.split(','),
				c: 'A,B,C,D'.split(','),
				d: 'B,C,A,D'.split(','),
				e: 'C,D,A,B'.split(','),
				f: 'B,D,C,A'.split(','),
			},
			pairings: { A: 'd', B: 'f', C: 'a', D: 'e' },
		},
	],
	[
		// boys.length === 5
		{
			boys: { A: ['a'], B: ['a'], C: ['a'], D: ['a'], E: ['a'] },
			girls: { a: 'B,C,A,D,E'.split(',') },
			pairings: { B: 'a' },
		},
		{
			boys: {
				A: 'a,b'.split(','),
				B: 'b,a'.split(','),
				C: 'a,b'.split(','),
				D: 'b,a'.split(','),
				E: 'a,b'.split(','),
			},
			girls: { a: 'E,C,B,D,A'.split(','), b: 'C,E,B,A,D'.split(',') },
			pairings: { C: 'b', E: 'a' },
		},
		{
			boys: {
				A: 'c,b,a'.split(','),
				B: 'b,a,c'.split(','),
				C: 'a,c,b'.split(','),
				D: 'b,a,c'.split(','),
				E: 'c,b,a'.split(','),
			},
			girls: {
				a: 'A,D,E,C,B'.split(','),
				b: 'D,A,E,B,C'.split(','),
				c: 'B,D,E,A,C'.split(','),
			},
			pairings: { A: 'a', B: 'c', D: 'b' },
		},
		{
			boys: {
				A: 'd,b,a,c'.split(','),
				B: 'b,d,a,c'.split(','),
				C: 'b,c,d,a'.split(','),
				D: 'a,d,b,c'.split(','),
				E: 'a,d,c,b'.split(','),
			},
			girls: {
				a: 'A,D,E,B,C'.split(','),
				b: 'E,B,C,D,A'.split(','),
				c: 'D,E,C,A,B'.split(','),
				d: 'B,D,A,E,C'.split(','),
			},
			pairings: { A: 'd', B: 'b', D: 'a', E: 'c' },
		},
		{
			boys: {
				A: 'e,a,d,c,b'.split(','),
				B: 'd,a,b,c,e'.split(','),
				C: 'd,a,e,b,c'.split(','),
				D: 'a,c,b,d,e'.split(','),
				E: 'c,b,e,d,a'.split(','),
			},
			girls: {
				a: 'B,D,E,A,C'.split(','),
				b: 'D,A,C,B,E'.split(','),
				c: 'C,B,D,E,A'.split(','),
				d: 'E,C,B,D,A'.split(','),
				e: 'C,B,D,E,A'.split(','),
			},
			pairings: { A: 'e', B: 'a', C: 'd', D: 'c', E: 'b' },
		},
		{
			boys: {
				A: 'b,a,e,c,d,f'.split(','),
				B: 'a,e,f,d,c,b'.split(','),
				C: 'f,e,a,b,d,c'.split(','),
				D: 'f,a,d,b,c,e'.split(','),
				E: 'b,a,f,d,c,e'.split(','),
			},
			girls: {
				a: 'D,A,B,C,E'.split(','),
				b: 'B,D,C,E,A'.split(','),
				c: 'C,A,E,B,D'.split(','),
				d: 'D,E,B,C,A'.split(','),
				e: 'D,B,C,E,A'.split(','),
				f: 'A,E,D,C,B'.split(','),
			},
			pairings: { A: 'c', B: 'e', C: 'b', D: 'a', E: 'f' },
		},
	],
	[
		// boys.length === 6
		{
			boys: { A: ['a'], B: ['a'], C: ['a'], D: ['a'], E: ['a'], F: ['a'] },
			girls: { a: 'C,A,F,E,B,D'.split(',') },
			pairings: { C: 'a' },
		},
		{
			boys: {
				A: 'a,b'.split(','),
				B: 'a,b'.split(','),
				C: 'b,a'.split(','),
				D: 'b,a'.split(','),
				E: 'a,b'.split(','),
				F: 'a,b'.split(','),
			},
			girls: { a: 'B,F,D,C,E,A'.split(','), b: 'A,E,C,F,B,D'.split(',') },
			pairings: { A: 'b', B: 'a' },
		},
		{
			boys: {
				A: 'a,b,c'.split(','),
				B: 'a,b,c'.split(','),
				C: 'c,a,b'.split(','),
				D: 'b,a,c'.split(','),
				E: 'a,b,c'.split(','),
				F: 'a,b,c'.split(','),
			},
			girls: {
				a: 'D,C,F,A,E,B'.split(','),
				b: 'C,F,B,E,A,D'.split(','),
				c: 'D,B,F,C,E,A'.split(','),
			},
			pairings: { B: 'c', C: 'b', D: 'a' },
		},
		{
			boys: {
				A: 'b,a,c,d'.split(','),
				B: 'd,b,c,a'.split(','),
				C: 'a,c,b,d'.split(','),
				D: 'b,c,d,a'.split(','),
				E: 'd,b,a,c'.split(','),
				F: 'c,b,d,a'.split(','),
			},
			girls: {
				a: 'C,B,E,D,A,F'.split(','),
				b: 'A,D,E,C,F,B'.split(','),
				c: 'D,E,F,C,A,B'.split(','),
				d: 'C,F,E,B,A,D'.split(','),
			},
			pairings: { A: 'b', C: 'a', D: 'c', F: 'd' },
		},
		{
			boys: {
				A: 'a,e,d,b,c'.split(','),
				B: 'e,c,b,a,d'.split(','),
				C: 'd,a,b,c,e'.split(','),
				D: 'd,c,e,b,a'.split(','),
				E: 'b,e,a,c,d'.split(','),
				F: 'e,d,a,b,c'.split(','),
			},
			girls: {
				a: 'B,D,C,F,A,E'.split(','),
				b: 'C,F,B,D,E,A'.split(','),
				c: 'A,D,F,C,E,B'.split(','),
				d: 'F,A,B,C,D,E'.split(','),
				e: 'D,A,F,C,B,E'.split(','),
			},
			pairings: { A: 'a', B: 'b', C: 'd', D: 'c', F: 'e' },
		},
		{
			boys: {
				A: 'b,a,d,e,f,c'.split(','),
				B: 'd,c,a,b,e,f'.split(','),
				C: 'c,e,b,a,d,f'.split(','),
				D: 'c,e,d,b,f,a'.split(','),
				E: 'f,a,d,c,b,e'.split(','),
				F: 'c,f,b,d,a,e'.split(','),
			},
			girls: {
				a: 'F,A,C,B,E,D'.split(','),
				b: 'F,B,D,C,A,E'.split(','),
				c: 'D,F,E,B,C,A'.split(','),
				d: 'E,C,D,A,F,B'.split(','),
				e: 'C,D,A,F,E,B'.split(','),
				f: 'E,F,A,D,B,C'.split(','),
			},
			pairings: { A: 'a', B: 'd', C: 'e', D: 'c', E: 'f', F: 'b' },
		},
	],
]

/******************************************************************************/
const asymmetricCases = [
	// 非对称 preferences 5 * 5
	[
		// boys.length === 1
		{
			boys: { A: ['b'] },
			girls: { a: [], b: ['A'] },
			pairings: { A: 'b' },
		},
		{
			boys: { A: ['a'] },
			girls: { a: ['A'], b: ['A'], c: [] },
			pairings: { A: 'a' },
		},
		{
			boys: { A: ['c'] },
			girls: { a: ['A'], b: [], c: ['A'], d: ['A'] },
			pairings: { A: 'c' },
		},
		{
			boys: { A: ['e'] },
			girls: { a: [], b: ['A'], c: ['A'], d: ['A'], e: ['A'] },
			pairings: { A: 'e' },
		},
		{
			boys: { A: ['a'] },
			girls: { a: ['A'], b: ['A'], c: [], d: ['A'], e: ['A'], f: ['A'] },
			pairings: { A: 'a' },
		},
	],
	[
		// boys.length === 2
		{
			boys: { A: ['a'], B: ['a'] },
			girls: {
				a: [],
			},
			pairings: {},
		},
		{
			boys: { A: 'b,c'.split(','), B: ['b'] },
			girls: {
				a: ['B'],
				b: ['B'],
				c: ['A'],
			},
			pairings: { A: 'c', B: 'b' },
		},
		{
			boys: { A: 'a,c,d'.split(','), B: 'b,d'.split(',') },
			girls: {
				a: ['A'],
				b: ['A'],
				c: ['B'],
				d: ['B'],
			},
			pairings: { A: 'a', B: 'd' },
		},
		{
			boys: { A: 'a,b,d'.split(','), B: 'a,c,e'.split(',') },
			girls: {
				a: ['B'],
				b: ['A'],
				c: 'A,B'.split(','),
				d: 'A,B'.split(','),
				e: ['B'],
			},
			pairings: { A: 'b', B: 'a' },
		},
		{
			boys: { A: 'b,d,e,f'.split(','), B: 'a,b,d,e'.split(',') },
			girls: {
				a: 'A,B'.split(','),
				b: ['B'],
				c: ['A'],
				d: 'A,B'.split(','),
				e: 'A,B'.split(','),
				f: 'A,B'.split(','),
			},
			pairings: { A: 'd', B: 'a' },
		},
	],
	[
		// boys.length === 3
		{
			boys: { A: ['a'], B: ['a'], C: [] },
			girls: {
				a: ['B'],
			},
			pairings: { B: 'a' },
		},
		{
			boys: { A: 'b,c'.split(','), B: ['b'], C: ['A'] },
			girls: {
				a: ['a'],
				b: ['c'],
			},
			pairings: {},
		},
		{
			boys: { A: 'a,c,d'.split(','), B: 'b,d'.split(','), C: 'b,d'.split(',') },
			girls: {
				a: 'B,C'.split(','),
				b: ['A'],
				c: 'A,C,B'.split(','),
				d: ['C'],
			},
			pairings: { A: 'c', C: 'd' },
		},
		{
			boys: { A: 'a,b,d'.split(','), B: [], C: ['b'] },
			girls: {
				a: [],
				b: ['C'],
				c: 'A,C,B'.split(','),
				d: 'A,B,C'.split(','),
				e: ['B'],
			},
			pairings: { A: 'd', C: 'b' },
		},
		{
			boys: { A: 'b,d,e,f'.split(','), B: 'a,b,d,e'.split(','), C: ['e'] },
			girls: {
				a: 'A,B'.split(','),
				b: ['C'],
				c: ['A'],
				d: 'C,B'.split(','),
				e: [],
				f: 'B,C'.split(','),
			},
			pairings: { B: 'a' },
		},
	],
]

/******************************************************************************/
/**
 * 对每个测试用例转换为 Person 实例，进行稳定配对后，核对结果是否与期望一致
 *
 * @param {Object} testCase
 * @returns {Boolean}
 */
const stableMarriageTest = ({ boys, girls, pairings }) => {
	// 这俩是 Person 实例的数组
	const newBoys = Object.keys(boys).map((name) => new Person(name))
	const newGirls = Object.keys(girls).map((name) => new Person(name))

	for (let boy of newBoys) {
		// 测试用例中的优先级数组，元素为 name
		const preferences = boys[boy.name]
		for (let preference of preferences) {
			for (let girl of newGirls) {
				// 根据 name 字符串匹配 Person 实例
				if (girl.name === preference) {
					boy.preferences.push(girl)
					// 标记引用
					girl.refered()
				}
			}
		}
	}

	for (let girl of newGirls) {
		// 测试用例中的优先级数组，元素为 name
		const preferences = girls[girl.name]
		for (let preference of preferences) {
			for (let boy of newBoys) {
				// 根据 name 字符串匹配 Person 实例
				if (boy.name === preference) {
					girl.preferences.push(boy)
					// 标记引用
					boy.refered()
				}
			}
		}
	}

	stableMarriage(newBoys)

	const judgeList = []
	const entriesPairings = Object.entries(pairings)
	for (let entry of entriesPairings) {
		for (let boy of newBoys) {
			// 对比配偶是否与答案一致
			if (boy.name === entry[0]) {
				judgeList.push(boy.fiance.name === entry[1])
			}
		}
	}

	// 当所有配对都正确时返回 true
	return judgeList.reduce((acc, cur) => acc && cur, true)
}

/******************************************************************************/
const referedCase = [
	[
		{
			boys: { A: [], B: [] },
			girls: { a: [], b: [] },
			expectation: { boys: [], girls: [] },
		},

		{
			boys: { A: [], B: [] },
			girls: { a: [], b: ['A'] },
			expectation: { boys: ['A'], girls: ['b'] },
		},
		{
			boys: { A: [], B: ['a'] },
			girls: { a: [], b: ['B'] },
			expectation: { boys: ['B'], girls: ['a', 'b'] },
		},
		{
			boys: { A: ['b'], B: ['b'] },
			girls: { a: [], b: ['A'] },
			expectation: { boys: ['A', 'B'], girls: ['b'] },
		},
		{
			boys: { A: ['b'], B: ['b'] },
			girls: { a: ['B'], b: ['A'] },
			expectation: { boys: ['A', 'B'], girls: ['a', 'b'] },
		},
	],
]

/******************************************************************************/
const referedTest = ({ boys, girls, expectation }) => {
	// 这俩是 Person 实例的数组
	const newBoys = Object.keys(boys).map((name) => new Person(name))
	const newGirls = Object.keys(girls).map((name) => new Person(name))

	for (let boy of newBoys) {
		// 测试用例中的优先级数组，元素为 name
		const preferences = boys[boy.name]
		for (let preference of preferences) {
			for (let girl of newGirls) {
				// 根据 name 字符串匹配 Person 实例
				if (girl.name === preference) {
					boy.preferences.push(girl)
					// 标记引用
					girl.refered()
				}
			}
		}
	}

	for (let girl of newGirls) {
		// 测试用例中的优先级数组，元素为 name
		const preferences = girls[girl.name]
		for (let preference of preferences) {
			for (let boy of newBoys) {
				// 根据 name 字符串匹配 Person 实例
				if (boy.name === preference) {
					girl.preferences.push(boy)
					// 标记引用
					boy.refered()
				}
			}
		}
	}

	clearNotReferedPerson(newBoys)
	clearNotReferedPerson(newGirls)

	const judgeList = []
	judgeList.push(
		expectation.boys.join('') === `${newBoys.map((p) => p.name).join('')}`,
	)
	judgeList.push(
		expectation.girls.join('') === `${newGirls.map((p) => p.name).join('')}`,
	)

	// 当所有配对都正确时返回 true
	return judgeList.reduce((acc, cur) => acc && cur, true)
}

module.exports = {
	commonCases,
	asymmetricCases,
	stableMarriageTest,
	referedCase,
	referedTest,
}
