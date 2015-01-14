#mini-clone-digger 
使用 字符串相似度算法（编辑距离算法 Levenshtein Distance）来计算检查文本的相似度，来近似计算重复度
````
  1 var task = require('../lib/task');
  3 var instance = task('/your/path');
  4
  5 instance.main([//对比的文件数组列表
  6     'navigation/navigation_index_content_bus_walk.html',
  7     'navigation/navigation_index_content_car.html',
  8     'navigation/navigation_index_content.html',
  9 ], function (rate) {
 10     console.log(rate);
 11 });
````
````
[ [ 1, 0.9258698940998487, 0.4193548387096774 ],
  [ 0.9258698940998487, 1, 0.3933434190620272 ],
  [ 0.4193548387096774, 0.3933434190620272, 1 ] ]
````
