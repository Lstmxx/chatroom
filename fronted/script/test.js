/* eslint-disable */
const chalk = require('chalk')
const log = message => console.log(chalk.blue(`${message}`))

var threeSumClosest = function(nums, target) {
  if (nums.length < 4) {
      return nums.reduce((x, y) => x + y)
  }
  nums.sort((x, y) => {
      return x - y
  })
  const len = nums.length
  if (target >= nums[len - 1]) {
      return nums[len - 1] + nums[len - 2] + nums[len - 3]
  }
  if (target <= nums[0]) {
      return nums[0] + nums[1] + nums[2]
  }
  let ans = nums[0] + nums[1] + nums[2]
  nums.forEach((data, index) => {
    let start = index + 1
    let end = len - 1
    while(start < end) {
        const sum = data + nums[start] + nums[end]
        if (Math.abs(sum - target) < Math.abs(ans - target)) {
            ans = sum
        }
        if (sum > target) {
            end -= 1
        } else if (sum < target) {
            start += 1
        } else {
            return ans
        }
    }
  })
  return ans
}

log(threeSumClosest([0,2,1,-3], 1))


var letterCombinations = function(digits) {
    let numberMap = new Map()
    numberMap.set('0', ' ')
    numberMap.set('2', 'abc')
    numberMap.set('3', 'def')
    numberMap.set('4', 'ghi')
    numberMap.set('5', 'jkl')
    numberMap.set('6', 'mno')
    numberMap.set('7', 'pqrs')
    numberMap.set('8', 'tuv')
    numberMap.set('9', 'wxyz')
    res = []
    function back (input, letter, index) {
        if (index === input.length) {
            res.push(letter)
            return  
        }
        const stringList = numberMap.get(input[index])
        for (let i = 0; i < stringList.length; i++) {
            back(input, letter + stringList[i], index + 1)
        }
    }
    back(digits, '', 0)
    return res
};

log(letterCombinations('2345678945'))