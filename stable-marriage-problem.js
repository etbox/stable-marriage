class Person {
	constructor(name) {
		this.name = name
		this.preferences = []
		this.isRefered = false
	}

	get hasFiance() {
		return !!this.fiance
	}

	prefers(other) {
		// 为了应对非对称 preferences
		if (this.preferences.indexOf(other) > -1) {
			return (
				this.preferences.indexOf(other) < this.preferences.indexOf(this.fiance)
			)
		}
		return false
	}

	engageTo(other) {
		if (other.hasFiance) {
			// 相当于断开双向链表的连接
			other.fiance.fiance = null
		}

		this.fiance = other
		other.fiance = this
	}

	generatePreferences(preferences) {
		this.preferences = preferences
	}

	refered() {
		this.isRefered = true
	}
}

/**
 *
 *
 * @param {Person[]} boys 对应车辆伴侣
 */
function stableMarriage(boys) {
	const bachelors = [...boys]
	while (bachelors.length > 0) {
		const boy = bachelors.shift()

		// 相当于清缓存，每次调用时重新运算
		if (boy.fiance) {
			if (boy.fiance.fiance) {
				boy.fiance.fiance = null
			}
			boy.fiance = null
		}

		for (const girl of boy.preferences) {
			// 为了应对非对称 preferences
			if (!girl.hasFiance && girl.preferences.indexOf(boy) > -1) {
				boy.engageTo(girl)
				break
			} else if (girl.prefers(boy)) {
				bachelors.push(girl.fiance)
				boy.engageTo(girl)
				break
			}
		}
	}
	return boys
}

/**
 * 普通洗牌
 *
 * @param {*} iterable
 * @returns {Array}
 */
function shuffle(iterable) {
	const array = [...iterable]
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

/**
 * 非对称洗牌，随机删除一些元素
 *
 * @param {*} iterable
 * @returns {Array}
 */
function asymmetricShuffle(iterable) {
	const array = [...iterable]
	for (let i = array.length - 1; i >= 0; i -= 1) {
		const randomNum = Math.random()
		// 多大概率删除一个元素
		if (randomNum < 0.5) {
			array.splice(i, 1)
		} else {
			array[i].refered()
		}
	}
	return array
}

function clearNotReferedPerson(array) {
	for (let i = array.length - 1; i >= 0; i -= 1) {
		if (!array[i].isRefered && array[i].preferences.length === 0) {
			array.splice(i, 1)
		}
	}
	return array
}

// /**
//  * @main
//  */
// ;(() => {
// 	// boys 对应车辆伴侣，girls 对应车检器
// 	const boys = [...'AB'].map((name) => new Person(name))
// 	const girls = [...'ab'].map((name) => new Person(name))

// 	// const boys = Array(1000)
// 	// 	.fill(0)
// 	// 	.map(() => new Person(~~(Math.random() * 100000)))
// 	// const girls = Array(1000)
// 	// 	.fill(0)
// 	// 	.map(() => new Person(~~(Math.random() * 100000)))

// 	// 各自对优先级进行排序
// 	console.log('boys')
// 	for (const boy of boys) {
// 		boy.generatePreferences(asymmetricShuffle(girls))
// 		console.log(`${boy.name}: ${boy.preferences.map((p) => p.name).join()}`)
// 	}
// 	console.log('\nGirls')
// 	for (const girl of girls) {
// 		girl.generatePreferences(asymmetricShuffle(boys))
// 		console.log(`${girl.name}: ${girl.preferences.map((p) => p.name).join()}`)
// 	}

// 	clearNotReferedPerson(boys)
// 	clearNotReferedPerson(girls)

// 	console.log('\nboys')
// 	for (const boy of boys) {
// 		console.log(`${boy.name}`)
// 	}
// 	console.log('\nGirls')
// 	for (const girl of girls) {
// 		console.log(`${girl.name}`)
// 	}

// 	stableMarriage(boys)

// 	// 打印结果
// 	console.log('\nPairings')
// 	for (const boy of boys) {
// 		if (boy.fiance) {
// 			console.log(`${boy.name}: ${boy.fiance.name}`)
// 		}
// 	}
// })()

/**
 * TODO: 两种设备的 sn 号，各自封装为数组
 */
module.exports = { Person, stableMarriage, shuffle, clearNotReferedPerson }
