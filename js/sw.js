//i'm caching the html , css , js and json files which will be trigerred using the service worker install 
self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open('restaurant-static-v1').then(function(cache){
//array of all the pathes that will get me the caches from

			return cache.addAll(
				[
				'/',
				'/index.html',
				'/restaurant.html',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/js/dbhelper.js',
				'/data/restaurants.json',
				'/css/styles.css',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg'

				]
			);
		})catch((error)=>{
			console.log(error);
		})
	);
});

//problem of activation solved from one of the p6 study group videos

self.addEventListener('activate',function(event){
event.waitUntil(

	caches.keys().then(function(cachename){

		return Promise.all(

			cachename.filter(function(cachename){
				return cachename.startWith('restaurant-')&& cachename != staticCacheName;
			}).map(function(cachename){
				return cache.delete(cachename);
			})

		);

	})

);

});

//end of the problem

//this code will respond with the cach and if it didn't find it 
self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(responseFromWork) {
			//return the response 
			return responseFromWork || fetch(event.request)
		})

	);
});

