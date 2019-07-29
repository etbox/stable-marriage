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
 * 每次传入一个已经设置 preferences 的 Person 实例数组，返回时每个实例已尽力配对上
 *
 * @param {Person[]} boys 对应车辆伴侣
 * @returns {Person[]}
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
 * @param {iterable} iterable
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
 * @param {iterable} iterable
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
			// 加上引用标识，有引用则不会被清理掉
			array[i].refered()
		}
	}
	return array
}

/**
 * 清理无引用的 Person 实例
 *
 * @param {Person[]} personArray
 * @returns
 */
function clearNotReferedPerson(personArray) {
	for (let i = personArray.length - 1; i >= 0; i -= 1) {
		if (!personArray[i].isRefered && personArray[i].preferences.length === 0) {
			personArray.splice(i, 1)
		}
	}
	return personArray
}

module.exports = { Person, stableMarriage, shuffle, clearNotReferedPerson }
