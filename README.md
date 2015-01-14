#mini-clone-digger 
使用字符串相似度算法（编辑距离算法 Minimum Edit Distance）来计算检查文本的相似度，来近似计算重复度

使用示例：
````
  var task = require('../lib/task');
  var instance = task('/your/path');
  instance.main([//对比的文件数组列表
     'navigation/navigation_index_content_bus_walk.html',
      'navigation/navigation_index_content_car.html',
      'navigation/navigation_index_content.html',
 ], function (rate) {
     console.log(rate);
  });
````
输出结果:
````
[ [ 1, 0.9258698940998487, 0.4193548387096774 ],
  [ 0.9258698940998487, 1, 0.3933434190620272 ],
  [ 0.4193548387096774, 0.3933434190620272, 1 ] ]
````
