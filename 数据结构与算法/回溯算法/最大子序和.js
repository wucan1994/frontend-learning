/**
 * leetcode上序号为53的题目：
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */

/**
 * @param {Number} maxSum 子数组最大和
 * @param {Array} maxSeries 和最大的子数组
 * @param {Array} status 保存状态的子数组，用于去掉重复计算
 */
var maxSum = -Math.pow(2, 31);
var maxSeries = [];
var status = [];

function maxSubArray(nums) {
    if (!nums.length) {
        return 0;
    }

    // 子数组中至少包含一个元素，所以初始状态为子数组中只包含数组第一个元素的情况
    maxSum = nums[0];
    maxSeries = [nums[0]];
    status[0] = [];
    status[0][nums[0]] = 1;

    seriesArray(nums, 1, nums[0], [nums[0]]);

    // leetcode上运算结束后需要还原全局变量
    let result = maxSum;
    maxSum = -Math.pow(2, 31);
    maxSeries = [];
    status = [];

    return result;
}

/**
 * 
 * @param {Array} input 输入数组
 * @param {Number} current 当前索引
 * @param {Number} sum 当前子数组的和
 * @param {Array} items 当前子数组
 */
function seriesArray(input, current, sum, items) {
    if (current === input.length) {
        if (sum >= maxSum) {
            maxSum = sum;
            maxSeries = items;
        }
        return;
    }
    if (status[current] === undefined) {
        status[current] = [];
    }
    if (status[current][sum]) return;
    status[current][sum] = 1;
    
    if (sum >= maxSum) {
        maxSum = sum;
        maxSeries = items;
    }
    // 子数组中至少有一个元素，所以当前元素不放入之前的子数组时，子数组更新为只包含当前元素的情况
    seriesArray(input, current + 1, input[current], [input[current]]);

    seriesArray(input, current + 1, sum + input[current], items.concat(input[current]));
}

// var input = [-1];
// var input = [-2, 1];
var input = [-2,1,-3,4,-1,2,1,-5,4];
// var input = [1, 2, 5, -7, 8, -10, 5];
// var input = [1, 2, 5, -7, 8, -100, 4, -9, 5, 6];
// 当数据量过大时，回溯算法运算时间很长，可以改为分治算法
// var input = [-57,9,-72,-72,-62,45,-97,24,-39,35,-82,-4,-63,1,-93,42,44,1,-75,-25,-87,-16,9,-59,20,5,-95,-41,4,-30,47,46,78,52,74,93,-3,53,17,34,-34,34,-69,-21,-87,-86,-79,56,-9,-55,-69,3,5,16,21,-75,-79,2,-39,25,72,84,-52,27,36,98,20,-90,52,-85,44,94,25,51,-27,37,41,-6,-30,-68,15,-23,11,-79,93,-68,-78,90,11,-41,-8,-17,-56,17,86,56,15,7,66,-56,-2,-13,-62,-77,-62,-12,37,55,81,-93,86,-27,-39,-3,-30,-46,6,-8,-79,-83,50,-10,-24,70,-93,-38,27,-2,45,-7,42,-57,79,56,-57,93,-56,79,48,-98,62,11,-48,-77,84,21,-47,-10,-87,-49,-17,40,40,35,10,23,97,-63,-79,19,6,39,62,-38,-27,81,-68,-7,60,79,-28,-1,-33,23,22,-48,-79,51,18,-66,-98,-98,50,41,13,-63,-59,10,-49,-38,-70,56,77,68,95,-73,26,-73,20,-14,83,91,61,-50,-9,-40,1,11,-88,-80,21,89,97,-29,8,10,-15,48,97,35,86,-96,-9,64,48,-37,90,-26,-10,-13,36,-27,-45,-3,-1,45,34,77,-66,22,73,54,11,70,-97,-81,-43,-13,44,-69,-78,30,-66,-11,-29,58,52,-61,-68,-81,25,44,-32,57,-81,66,2,52,43,35,-26,16,-33,61,-37,-54,80,-3,32,24,27,30,-69,38,-81,2,-4,47,17,5,42,-58,-51,-90,98,-33,76,-22,95,-4,89,-31,-87,-44,-69,-48,1,87,48,-90,-12,-24,39,18,-86,35,96,-14,-41,13,90,-98,32,-83,-89,7,-17,63,84,-21,-40,51,24,-51,83,31,0,-38,-5,-74,-29,59,1,87,-22,-9,-1,-49,76,57,41,44,35,-27,60,23,56,-80,-14,41,-2,22,-31,99,47,-48,7,-75,13,-97,-50,61,61,27,48,-84,94,-76,-56,70,57,84,-9,-7,-66,-49,-84,89,-29,-22,7,45,-99,75,21,24,-95,-71,48,17,-92,74,-22,45,1,-97,61,-5,-74,81,-57,83,42,33,-47,75,61,-55,41,-68,22,-51,53,-1,-99,-25,-76,-95,3,48,-1,-13,23,53,-68,-76,33,92,-4,35,50,38,18,-8,-52,47,-33,-91,91,85,-60,14,-89,93,89,-89,-55,89,92,47,38,-9,-66,-39,-79,-58,-39,53,-65,56,-11,61,-29,83,-46,19,31,-3,27,-1,-18,67,-87,-8,37,79,-20,58,68,-28,-18,-17,39,-8,43,59,33,81,13,44,37,-98,6,85,84,59,4,-8,-44,-69,91,15,74,80,83,-12,59,-37,-54,5,34,27,87,-50,-81,8,-90,52,-11,-1,-4,-97,0,78,87,-39,37,-32,30,70,-1,21,-38,-50,-22,-55,15,-85,8,60,19,-81,-35,-17,-31,-40,90,-45,-88,-44,53,-15,-41,-70,-37,-77,-33,77,-9,96,24,66,-6,85,92,72,-70,7,86,14,-32,-18,33,9,64,78,68,32,-90,57,87,62,-58,-77,68,-19,-54,-65,-42,13,-68,58,-44,25,43,-52,-26,73,55,-63,-13,-77,18,96,31,-40,51,-1,91,60,-44,55,22,-26,78,-10,32,-99,2,66,13,33,25,68,-65,-32,-84,-14,-82,70,22,5,69,-59,-22,-23,0,-70,53,-32,89,85,-77,-11,-40,77,55,68,77,-43,34,-33,66,-41,-88,-98,27,-72,-13,21,74,85,-74,21,-74,-19,97,2,10,50,46,-1,13,69,87,72,23,20,40,1,76,-49,67,43,10,79,21,-86,83,84,34,34,69,37,-45,72,-82,-70,-26,27,56,97,-97,-31,66,67,-82,-11,-13,57,66,-37,85,11,82,-5,-33,3,-15,-50,-13,95,60,-66,9,-84,-94,26,-78,-44,-70,77,-47,-90,-53,95,76,-36,-38,-60,98,-72,-21,83,15,-38,-45,81,41,16,-69,-94,11,91,-84,-79,83,-79,23,-95,-24,30,58,6,39,-95,1,-8,-54,62,31,-56,67,86,-96,-18,-75,-42,-36,66,73,-29,48,-39,-61,63,-42,98,60,81,-97,-64,11,61,18,-73,42,-80,18,87,58,-51,-69,2,-88,-66,84,-63,-32,-75,79,-82,-28,27,-21,11,-33,13,9,-73,-6,-11,-61,81,-73,57,-92,45,53,25,33,11,50,40,90,62,51,74,75,-81,75,54,-86,-53,-42,-8,34,1,-95,-79,27,-24,-14,42,-66,12,-24,-58,-66,-71,43,66,17,-29,-16,7,-90,-65,-42,84,-70,-90,15,-57,-67,49,11,67,-50,-7,64,53,68,-50,-5,78,38,71,96,71,76,40,15,-7,87,98,76,96,-90,-66,57,-61,-57,-51,-41,-47,97,69,-80,-53,-61,83,76,83,-90,-29,62,47,-81,58,18,95,-2,-67,-12,-38,-92,-35,-65,-83,-25,91,-44,-5,-83,-9,47,-86,-40,43,-63,-1,3,-87,-18,12,-39,-79,-41,-21,79,53,-26,-46,63,39,16,70,80,50,87,-45,19,-80,26,35,10,-27,26,46,92,62,-55,-5,52,4,-93,-87,1,-58,-9,-20,95,42,34,58,-19,-73,5,-39,53,-31,-8,-28,-12,95,84,97,-55,10,44,-62,-51,65,32,-99,-54,16,89,47,57,-42,-96,52,99,14,-13,-43,40,69,-6,-6,-62,85,42,26,80,26,0,-74,-87,-79,-60,-38,63,71,-61,85,-13,-71,9,-78,-14,13,50,-38,-73,-85,18,44,83,-88,-85,-79,73,56,23,31,-40,-99,33,-51,97,72,-13,60,20,26,46,84,31,-45,-94,93,67,55,-45,71,69,49,15,52,37,29,50,-13,-38,-50,-82,-2,-73,27,47,-75,-24,-66,84,96,36,7,80,-56,62,62,-63,6,17,-32,-46,-13,93,45,-84,30,-26,42,-82,13,92,-88,-89,-81,16,34,-57,91,45,-95,87,-42,11,44,2,-50,6,15,33,-76,83,86,-13,76,32,-21,-16,82,-78,-22,-28,90,-34,-40,-91,81,93,-71,73,15,-90,37,73,-3,-41,-48,47,64,66,-43,64,49,-57,-72,3,51,7,63,11,28,-82,82,18,-17,-58,3,-58,-87,8,-85,27,17,28,-23,-85,86,28,38,28,-5,94,-31,-79,-86,-3,0,65,80,-60,-24,8,-43,-65,-97,40,-23,-18,81,-11,90,72,92,-16,0,-30,-25,-36,97,-87,68,-31,83,-63,-33,97,10,66,39,-10,-93,91,74,-37,-74,53,79,-21,-64,37,67,-74,9,60,9,86,-70,84,-73,-96,73,94,-50,57,-69,16,31,18,-18,-53,-92,-35,-62,59,5,-60,12,-16,19,47,-78,-14,49,7,-77,-64,-7,-71,96,19,-67,69,-10,-18,3,-2,97,-89,-84,-44,-43,99,-2,-6,58,-97,11,-29,-14,-70,94,-16,-8,44,91,15,79,-39,20,75,57,52,21,-53,-89,-98,44,84,-88,36,-82,-31,36,15,39,-29,17,-50,41,79,-21,13,-36,71,-66,-68,-37,89,-8,82,41,-74,12,-38,-50,-1,-37,70,-39,-48,7,-22,20,-57,69,-41,13,-14,-14,-68,-58,64,21,5,12,54,13,51,43,-94,11,-16,-92,99,22,-43,-2,62,-72,58,-86,11,-87,33,53,81,68,-57,-56,-46,-49,-14,95,71,67,-16,2,-19,-87,-78,-37,0,-18,-30,-1,-95,4,96,66,31,32,79,-81,44,-11,48,3,-66,90,46,-12,-81,-91,-40,66,76,20,-54,-43,9,-33,19,-91,49,88,7,30,-8,-19,-4,99,-87,-48,-82,33,40,65,-64,73,33,59,-62,28,67,-26,-29,43,71,16,99,-20,83,18,-11,9,-16,72,-61,52,-47,34,29,-58,85,23,75,2,-34,87,-48,75,46,-33,3,-9,40,73,-66,-12,-10,-89,68,-50,5,-66,58,88,82,96,18,-64,7,-53,-23,-31,69,-71,47,-88,-83,98,86,39,-35,-34,-70,82,-60,-36,-30,6,-26,-85,55,55,-75,-10,44,84,-37,-38,-80,69,-15,-27,-85,-69,-21,61,-57,-5,59,-71,-66,-98,-5,-59,60,11,4,-93,93,54,98,48,9,99,-85,-70,83,-23,-32,79,-77,52,-47,-63,60,8,97,-97,-97,33,-92,-87,11,-21,-47,-29,66,33,-45,59,-36,-47,-16,50,-48,-2,79,-64,51,-75,-85,73,76,-56,-90,13,51,83,-8,30,17,-23,20,-72,55,49,-24,-1,-17,7,-42,23,59,42,-27,87,-83,-47,99,68,-46,91,18,-93,-88,28,20,40,-12,-88,-30,-95,-12,66,-90,-79,16,-38,19,75,68,76,-2,27,-5,71,-9,12,-99,-32,-43,-46,-41,74,-40,-53,-21,79,86,67,68,-66,48,-67,99,57,-47,15,-81,71,-33,86,25,65,-10,96,36,58,-15,13,-74,41,66,-39,-7,-97,7,71,59,-6,15,27,4,-36,59,3,-79,89,95,-83,37,-38,79,-38,-96,-53,-41,39,-95,43,-71,-93,-38,71,-33,54,74,50,2,10,-79,-82,-86,24,-19,49,-95,1,38,99,-6,-24,-62,-26,14,-58,20,49,57,1,-7,63,-16,31,34,50,-15,-15,-23,86,94,-2,-96,-92,98,-39,34,-97,62,-28,78,-67,24,93,6,-61,-65,-97,87,68,-20,-43,31,63,87,-57,-10,-51,27,67,-87,-1,-35,-84,-17,-60,-23,-83,-57,-84,-34,-79,-52,89,-86,31,-95,-75,10,69,70,90,-97,1,53,67,43,-56,-84,-52,87,-72,46,-71,-79,-71,-32,-26,-77,10,-34,-12,8,-10,-46,-2,-79,-41,0,8,-95,-30,-2,83,47,-72,50,-9,-29,43,15,-65,70,-39,-37,67,-34,31,-59,-12,-82,6,75,25,96,-70,-99,93,-35,0,1,-54,69,75,-71,16,-96,56,83,-49,-1,-2,-14,-31,35,48,-86,-98,-21,-46,-34,-3,37,-58,98,10,-52,98,3,-11,-2,81,11,-33,56,16,60,36,-28,43,87,47,-81,-50,93,53,97,-93,31,-46,-40,97,27,73,-84,25,-17,-60,1,63,5,98,44,-84,-57,-23,8,79,90,57,22,54,4,17,-96,-3,-29,-99,3,78,-69,40,52,57,13,67,-40,73,83,60,36,-12,35,-43,-20,54,10,88,33,0,45,-67,-46,-51,49,-43,23,96,-65,-74,52,-35,42,4,99,-67,-28,-41,-94,-45,-81,18,43,53,74,99,-15,-39,87,-82,61,9,-73,91,58,76,-74,-19,49,-63,-17,1,1,-97,-94,-23,-65,-46,35,-83,8,53,34,-72,-16,-15,-95,68,45,91,62,-17,1,89,-48,-64,42,-46,-7,-9,-10,52,69,67,54,74,-55,65,-72,79,58,12,10,-31,17,70,53,21,38,-24,-11,-23,35,89,-34,86,-98,-92,-60,-6,-24,6,-53,-55,-26,77,-81,18,20,-77,-26,-22,11,60,47,-72,30,-23,25,-55,52,-85,22,-12,80,87,-49,59,72,-32,-47,-52,73,-24,-8,-76,-69,-13,18,50,9,92,-95,96,52,51,-98,-40,-71,26,4,57,17,-74,-78,-25,90,-50,-66,39,17,-37,86,-33,39,-45,-9,69,41,-91,-4,-73,77,0,-77,7,-48,-76,66,-43,50,-30,90,-56,-27,-87,-5,-37,-38,28,-98,55,91,64,-78,7,-81,12,-47,36,-2,48,62,-25,-75,84,81,-47,-91,24,-14,35,94,-23,78,-56,-34,-49,-17,27,78,-16,-18,46,-75,-20,-70,-80,92,-18,55,-10,-93,17,41,-68,1,0,-39,-14,-76,47,-79,94,-76,76,-62,-11,-73,20,92,81,80,-49,28,-95,30,34,-99,22,-83,55,88,99,-28,7,-69,50,-93,-8,-64,-93,-61,-66,-98,-61,86,-61,27,-87,59,-4,70,16,46,-25,-2,-24,-90,-2,75,-74,-46,40,-98,2,-53,-67,-48,-70,1,-35,-63,16,-2,-62,31,-39,-47,-65,-27,88,30,-80,5,-24,-5,-97,51,4,0,26,6,30,-33,7,-67,-10,16,-39,20,93,25,56,-14,99,70,-83,-40,-77,-49,9,-88,80,29,16,-67,-99,-5,84,-19,71,-13,86,2,30,-30,11,-79,63,71,17,33,-26,-27,-80,-27,-57,-87,10,-35,-36,95,-47,-79,1,45,-69,1,-60,-85,81,-88,-22,44,-10,85,91,-99,-94,31,48,-1,-36,-78,71,-40,-28,90,-27,58,-68,13,53,-15,10,-45,-70,40,32,-30,31,-9,-42,86,-65,24,71,-97,24,53,33,-51,-48,97,-29,99,-66,42,89,6,0,-79,95,-70,5,6,-39,12,-54,93,58,54,-16,92,40,-5,16,11,-25,-83,-59,-92,-35,-8,81,35,-9,-84,-46,-43,-2,30,-23,-6,60,59,99,97,-29,-78,90,-94,52,-49,97,-8,23,13,79,97,6,-80,-95,70,-12,63,-17,55,55,36,-88,-47,-56,-34,23,-96,-98,22,-99,-28,21,68,-46,-50,95,-49,42,18,40,-2,15,-54,-5,-3,-84,82,-63,-25,15,91,-88,3,-56,-68,68,67,-88,69,-34,88,-82,63,56,-29,-86,52,-2,32,-53,-62,-70,62,-17,1,-64,-24,-39,-28,50,75,-37,38,-22,-17,69,-53,-73,80,92,-30,69,-89,-67,2,-42,-77,-69,56,31,-22,93,61,-83,-46,-61,-48,6,-1,23,-67,-26,62,48,29,-55,17,52,-51,-25,44,18,-79,31,27,22,89,50,53,22,-42,-92,-8,-81,-76,22,-65,-25,-72,33,74,-62,84,13,85,13,57,2,-58,82,53,62,0,73,-6,-72,-27,-40,54,-74,58,-88,-90,-50,-92,-67,72,-81,-16,76,51,-65,-86,35,47,98,-75,-19,-22,-57,-36,-69,-94,40,-95,-24,67,-46,35,-2,-44,-7,-13,-35,19,-29,-3,-9,-11,57,-55,-83,91,-42,29,38,-43,53,95,34,73,-41,41,78,99,22,-46,43,75,65,-81,-69,-65,-18,-5,53,29,68,-78,-82,25,-34,-89,-7,23,39,-69,56,-30,-96,-33,-57,-38,-91,97,-39,30,-49,81,6,92,99,36,-73,-42,-68,56,86,76,54,80,2,96,90,94,20,7,-97,-47,76,-94,20,-81,-56,28,-84,-18,-42,-57,-37,40,-88,-61,-23,-62,-4,-15,70,-18,-39,2,-61,39,-2,-71,34,94,35,13,-52,-12,18,67,-17,38,-28,-25,-80,6,17,-18,-53,5,-3,0,42,92,61,-10,-49,-78,91,-11,61,-11,-5,-28,-16,-93,84,8,-5,-21,-48,54,-83,0,-70,-86,-94,23,-5,-71,-71,92,5,47,61,-34,-63,89,-35,-95,-22,-74,-29,49,-26,31,33,-42,-61,-95,13,-10,58,6,89,87,19,71,-12,91,77,16,60,-18,-37,21,25,-23,10,89,-42,65,91,28,-9,-35,-41,-76,-1,-26,-72,88,40,63,-6,6,50,90,-45,-62,81,-68,30,41,-10,93,-61,-85,-53,26,80,4,-9,71,-90,58,-64,-55,82,11,19,86,-1,-64,49,70,42,-23,60,96,-9,18,-72,-78,-41,-6,91,-26,9,-62,99,-11,41,-33,-62,50,-74,-27,95,84,61,-9,70,-40,26,-3,-93,-55,73,66,-59,-59,-16,-55,-38,19,39,-47,93,-52,-10,69,13,-91,-63,50,35,-38,-99,7,-54,61]
console.log(maxSubArray(input))
