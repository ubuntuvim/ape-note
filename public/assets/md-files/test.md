store提供了统一的获取数据的接口。包括创建新记录、修改记录、删除记录等，更多有关[Store API](http://devdocs.io/ember/data/classes/ds.store)请点击网址看详细信息。

为了演示这些方法的使用我们结合firebase，关于firebase与Ember的整合前面的文章已经介绍，就不过多介绍了。
做好准备工作：
```
ember g route articles
ember g route articles/article
```

## 1，查询方法findAll，findRecord，peekAll，peekRecord

首先配置`route`，修改子路由增加一个动态段`article_id`，有关动态的介绍请看[Dynamic Segments](https://guides.emberjs.com/v2.5.0/routing/defining-your-routes/#toc_dynamic-segments)。
```js
//  app/router.js

//  其他代码略写，

Router.map(function() {
  this.route('store-example');
  this.route('articles', function() {
    this.route('article', { path: '/:article_id' });
  });
});
```
下面是路由代码，这段代码直接调用Store的find方法，返回所有数据。
```js
//  app/routes/articles.js
import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
	//  返回firebase数据库中的所有article
        return this.store.findAll('article');
    }
});
```
为了界面看起来舒服点我引入了[bootstrap](http://www.bootcss.com)框架。引入的方式：`bower install bootstrap`安装插件。然后修改`ember-cli-build.js`，在`return`之前引入bootstrap：
```js
app.import("bower_components/bootstrap/dist/js/bootstrap.js");
app.import("bower_components/bootstrap/dist/css/bootstrap.css");
```
重启项目使其生效。

下面是显示数据的模板`articles.hbs`。
```html
<!--  app/templates/articles.hbs  -->

<div class="container">
	<div class="row">
		<div class="col-md-4 col-xs-4">
			<ul class="list-group">
			{{#each model as |item|}}
				<li class="list-group-item">
					<!--设置路由，路由的层级与router.js里定义的要一致，model的id属性作为参数 -->
                 	{{#link-to 'articles.article' item.id}}
						{{item.title}}
					{{/link-to}}
				</li>
			{{/each}}
			</ul>
		</div>

		<div class="col-md-8 col-xs-8">
		{{outlet}}
		</div>
	</div>
</div>
```
在浏览器运行：[http://localhost:4200/articles/](http://localhost:4200/articles/)。稍等就可以看到显示的数据了，等待时间与你的网速有关。毕竟[firebase](http://www.firebase.com)不是在国内的！！！如果程序代码没有写错那么你会看到如下图的结果：

![articles数据列表](http://emberteach.ddlisting.com/content/images/2016/04/168.png)

但是右侧是空白的，下面点击任何一条数据，可以看到右侧什么都不显示！
下面在子模板中增加显示数据的代码：
```html
<!--  app/templates/articles/article.hbs  -->

<h1>{{model.title}}</h1>
<div class = "body">
{{model.body}}
</div>
```
在点击左侧的数据，右侧可以显示对应的数据了！但是这个怎么就显示出来了呢？？其实[Ember](http://emberjs.com)自动根据动态段过滤了，当然你也可以显示使用`findRecord`方法过滤。
```js
//  app/routes/articles/article.js

import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		console.log('params = ' + params.article_id);
		// 'chendequanroob@gmail.com'
		return this.store.findRecord('article', params.article_id);
	}
});
```
此时得到的结果与不调用`findRecord`方法是一致的。为了验证是不是执行了这个方法，我们把动态段`params.article_id`的值改成一个不存在的值’ ubuntuvim’，可以确保的是在我的firebase数据中不存在`id`为这个值的数据。此时控制台会出现下面的错误信息，从错误信息可以看出来是因为记录不存在的原因。

![数据不存在错误](http://emberteach.ddlisting.com/content/images/2016/04/169.png)

在上述的例子中，我们使用了`findAll()`方法和`findRecord()`方法，还有两个方法与这两个方法是类似的，分别是`peekRecord()`和`peekAll()`方法。这两个方法的不同之处是不会发送请求，他们只会在本地缓存中获取数据。

下面分别修改`articles.js`和`article.js`这两个路由。使用`peekRecord()`和`peekAll()`方法测试效果。
```js
//  app/routes/articles.js

import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		//  返回firebase数据库中的所有article
		// return this.store.findAll('article');
		
		return this.store.peekAll('article');
	}
});
```
由于没有发送请求，我也没有把数据存储到本地，所以这个调用什么数据都没有。
```js
//  app/routes/articles/article.js

import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		// return this.store.findRecord('article', params.article_id);

		return this.store.peekRecord('article', params.article_id);
	}
});
```
由于在父路由中调用`findAll`获取到数据并已经存储到`Store`中，所以可以用`peekRecord()`方法获取到数据。	但是在模型简介这篇文章介绍过`Store`的特性，当界面获取数据的时候首先会在`Store`中查询数据是否存在，如果不存在在再发送请求获取，所以感觉`peekRecord()`和`findRecord()`方法区别不是很大！

## 2，查询多记录方法query()

项目中经常会遇到根据某个值查询出一组匹配的数据。此时返回的数据就不是只有一条了，那么Ember有是怎么去实现的呢？
```js
//  app/routes/articles.js

import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		//  返回firebase数据库中的所有article
		// return this.store.findAll('article');
		
		// return this.store.peekAll('article');
	
		//  使用query方法查询category为Java的数据
		return this.store.query('article', { filter: { category: 'java' } }).then(function(item) {
			//  对匹配的数据做处理
			return item;
		});
	}
});
```
查询`category`为`Java`的数据。如果你只想精确查询到某一条数据可以使用`queryRecord()`方法。如下：
```js
this.store.queryRecord('article', { filter: { id: ' -JzyT-VLEWdF6zY3CefO' } }).then(function(item) {
	//  对匹配的数据做处理
});
```
到此，常用的方法介绍完毕，希望通过介绍上述几个方法起到抛砖引玉的效果，有关于[DS.Store](http://devdocs.io/ember/data/classes/ds.store)类的还有很多很多的方法，使用方式都是类似的，更多方法请自己看API文档学习。

博文完整代码放在[Github](https://github.com/ubuntuvim/my_emberjs_code)（博文经过多次修改，博文上的代码与github代码可能有出入，不过影响不大！），如果你觉得博文对你有点用，请在github项目上给我点个`star`吧。您的肯定对我来说是最大的动力！！
