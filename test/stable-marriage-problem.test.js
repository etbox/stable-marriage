const chai = require('chai')
const assert = chai.assert

const {
	Person,
	stableMarriage,
	shuffle,
} = require('../stable-marriage-problem')
const {
	commonCases,
	asymmetricCases,
	stableMarriageTest,
	referedCase,
	referedTest,
} = require('./stable-marriage-problem-test-cases')

describe('stable marriage problem', function() {
	it('Should return a array', function() {
		assert.isArray(
			stableMarriage([]),
			"Make sure it's an array not the other type",
		)
	})

	it('Should have the correct length', function() {
		for (let i = 0; i < 10; i += 1) {
			const parameter = Array((Math.random() * 100) | 0)
				.fill(0)
				.map((name) => new Person(name))

			assert.strictEqual(
				stableMarriage(parameter).length,
				parameter.length,
				'Wrong length on ' + parameter.length,
			)
		}
	})

	it('One item in array should be that item', function() {
		for (let i = 0; i < 10; i += 1) {
			const boys = Array.of((Math.random() * 100) | 0).map(
				(name) => new Person(name),
			)
			const girls = Array.of((Math.random() * 100) | 0).map(
				(name) => new Person(name),
			)

			for (const boy of boys) {
				boy.generatePreferences(shuffle(girls))
			}
			for (const girl of girls) {
				girl.generatePreferences(shuffle(boys))
			}

			assert.strictEqual(
				stableMarriage(boys)[0].fiance.name,
				girls[0].name,
				'Wrong item on ' + girls[0].name,
			)
		}
	})

	it('Multiple items should match to correct pair', function() {
		for (let row of commonCases) {
			for (let oneCase of row) {
				assert.isTrue(
					stableMarriageTest(oneCase),
					'Wrong item on ' + JSON.stringify(oneCase, null, 4),
				)
			}
		}
	})

	it('Asymmetric preferences should match to correct pair', function() {
		for (let row of asymmetricCases) {
			for (let oneCase of row) {
				assert.isTrue(
					stableMarriageTest(oneCase),
					'Wrong item on ' + JSON.stringify(oneCase, null, 4),
				)
			}
		}
	})

	it('Not refered Person should be cleared', function() {
		for (let row of referedCase) {
			for (let oneCase of row) {
				assert.isTrue(
					referedTest(oneCase),
					'Wrong item on ' + JSON.stringify(oneCase, null, 4),
				)
			}
		}
	})
})
