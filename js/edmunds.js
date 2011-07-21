(function() {
	
	// Setup variables
	var keys = [/(Acura) (MDX|RDX|RL|TL|TSX|TSX Sports|ZDX)/g, /(Aston Martin) (DB9|DBS|Virage|Vantage)/g, /(Audi) (A3|A4|A5|A6|A7|A8|Q3|Q5|Q7|R8|RS|S4|S5|S7|S8|TT|TT3)/g];
	keys = keys.concat([/(Bentley) (Azure|Brooklands|Continental Flying Spur|Continental GT|Continental Supersports|Mulsanne)/g, /(BMW) (1 series|3 series|5 series|6 series|7 series|ActiveHybrid|ALPINA|M3|M5|M6|X1|X3|X5|X6|Z4)/g, /(Bugatti) (Veyron)/g, /(Buick) (Enclave|LaCrosse|Lucerne|Regal|Verano)/g, /(Cadillac) (CTS|DTS|Escalade|SRX|STS|XTS|)/g, /(Chevrolet) (Avalanche|Aveo|Camaro|Colorado|Corvette|Cruze|Equinox|Express|HHR|Malibu|Silverado|Sonic|Suburban|Tahoe|Volt)/g, /(Chrysler) (200|300|Town and Country)/g, /(Dodge) (Avenger|Caliber|Challenger|Charger|Dakota|Durango|Grand Caravan|Journey|Nitro|Ram|Viper)/g]);
	keys = keys.concat([/(Ferrari) (458|599|612|California|FF)/g, /(Fiat) (500)/g, /(Ford) (E-Series|Edge|Escape|Expedition|Explorer|F-150|F-250|F-350|F-450|Fiesta|Flex|Focus|Fusion|Mustang|Ranger|Shelby|Taurus|Transit)/g, /(GMC) (Acadia|Canyon|Savana|Sierra|Terrain|Yukon)/g, /(Honda) (Accord|Civic|CR-V|Element|Fit|Insight|Pilot|Ridgeline)/g, /(Hyundai) (Accent|Azera|Elantra|Equus|Genesis|HED-5|Santa Fe|Sonata|Tucson|Veloster|Veracruz)/g, /(Infiniti) (EX|FX|G|JX|M|M37|M56|QX56)/g, /(Jaguar) (XE|XF|XJ|XK)/g, /(Jeep) (Compass|Gran Cherokee|Liberty|Patriot|Wrangler)/g, /(Kia) (Cadenza|Forte|Optima|Rio|Sedona|Sorento|Soul|Sportage)/g]);
	keys = keys.concat([/(Lamborghini) (Aventador|Gallardo|Murcielago)/g, /(Land Rover) (LR2|LR4|Range Rover)/g, /(Lexus) (CT 200h|ES 350|GS 350|GS 450h|GX 460|HS 250h|IS 250|IS 350|IS F|LFA|LS 460|LS 600h|LX 570|RX 350|RX 400h|RX 450h)/g, /(Lincoln) (MKS|MKT|MKX|MKZ|Nanigator|Town Car)/g, /(Lotus) (Elise|Evora|Exige)/g, /(Maserati) (GrandTurismo|Quattroporte)/g, /(Maybach) (57|62|Landaulet)/g, /(Mazda) (CX-7|CX-9|MAZDA2|MAZDA3|MAZDA5|MAZDA6|MAZDASPEED3|MX-5|Miata|RX-8|Tribute)/g, /(McLaren) (MP4-12c)/g]);
	keys = keys.concat([/(Mercedes-Benz) (C63|CLS63|E-Class|G-Class|GL-Class|GLK-Class|M-Class|R-Class|S-Class|SL-Class|SLS)/g, /(Mercury) (Grand Marquis|Mariner|Milan|Mountaineer)/g, /(MINI) (John Cooper|Clubman|Countryman|Roadster|Cooper)/g, /(Mitsubishi) (Eclipse|Endeavor|Galant|i-MEV|Lancer|Outlander)/g, /(Nissan) (370Z|Altima|Armada|Cube|Frontier|GT-R|Juke|Leaf|Maxima|Murano|NV|Pathfinder|Rogue|Sentra|Titan|Versa|XTerra)/g, /(Porche) (911|GT2|GT3|Boxter|Cayenne|Cayman|Panamera)/g, /(Rolls-Royce) (Ghost|Phantom)/g, /(Saab) (9-3|9-4X|905)/g, /(Scion) (FR-S|iQ|tC|xB|xD)/g]);
	keys = keys.concat([/(smart) (fortwo)/g, /(Spyker) (C8)/g, /(Subaru) (Forester|Impreza|Legacy|Outback|Tribeca)/g, /(Suzuki) (Equator|Grand Vitara|Kizashi|SX4)/g, /(Tesla) (Roadster)/g, /(Toyota) (4Runner|Avalon|Corolla|Camry|FJ|Highlander|Land Cruiser|Matrix|Prius|Rav4|Sequoia|Sienna|Tacoma|Tundra|Venza|Yaris)/g, /(VolksWagen) (Beetle|CC|Eos|GLI|Golf|GTI|Jetta|Passat|Polo|Routan|Tiguan|Touareg)/g, /(Volvo) (C30|C70|S40|S60|S80|V50|XC60|XC70|XC90)/g]);
	var cars = [];
	var displayedCars = {};
	var data_exists = false;
	
	// Find cars on the page
	function findCars() {
		var str = document.body.innerHTML; 
		var len = keys.length;
		var processedCars = {};
		for (var i=0; i<len; i++) {
		   	var mt = str.match(keys[i]);
			if (mt) {
				var le = (mt.length <= 6) ? mt.length : 6;
				for (var k=0; k<le; k++) {
					if (!processedCars[mt[k].toLowerCase()]) {
						cars.push(mt[k]);
						processedCars[mt[k].toLowerCase()] = mt[k].toLowerCase();
					}
				}
			}
		}
	}
	
	function processCar(id) {
		var content = document.getElementById("edmundsComToolbarContent");
		var car = displayedCars[id];
		var a = document.createElement('a');
		a.href = "http://www.edmunds.com/" + car.makeNiceName + "/" + car.modelNiceName + "/" + car.year;
		a.target = "_blank";
		var img = document.createElement('img');
		img.src = car.path;
		img.onclick = function() {
			chrome.extension.sendRequest({'action' : 'trackEvent', 'action': 'Image'+id, 'label': 'Click', 'value': car.makeName+" " + car.modelName + " " + car.year});
		};
		var dv = document.createElement('div');
		var tmvCur = car.price.tmv.toString().replace(/(-?[0-9]+)([0-9]{3})/, "$1,$2");
		dv.innerHTML = "<h2>"+car.makeName+" " + car.modelName + " " + car.year + "</h2>TMV&trade;: <strong>$" + tmvCur + "</strong>";
		var par = document.createElement('div');
		par.id = 'edmundsCar'+car.id;
		par.className = "carItem";
		a.appendChild(img);
		par.appendChild(a);
		par.appendChild(dv);
		content.appendChild(par);
	}
	
	// Implementation logic
	if (window.location.href.indexOf('edmunds.com') === -1) {
		findCars();
		if(cars[0]) {		
						
			function onData(data) {
				if (data && data.modelYearHolder.length > 0) {
					displayedCars[data.modelYearHolder[0].styles[0].id] = displayedCars[data.modelYearHolder[0].styles[0].id] || {};
					displayedCars[data.modelYearHolder[0].styles[0].id].id = data.modelYearHolder[0].styles[0].id;
					displayedCars[data.modelYearHolder[0].styles[0].id].makeName = data.modelYearHolder[0].makeName;
					displayedCars[data.modelYearHolder[0].styles[0].id].modelName = data.modelYearHolder[0].modelName;
					displayedCars[data.modelYearHolder[0].styles[0].id].makeNiceName = data.modelYearHolder[0].makeNiceName;
					displayedCars[data.modelYearHolder[0].styles[0].id].modelNiceName = data.modelYearHolder[0].modelNiceName;
					displayedCars[data.modelYearHolder[0].styles[0].id].year = data.modelYearHolder[0].year;
					chrome.extension.sendRequest({'action' : 'fetchEdmundsStyleFeed', 'data': data.modelYearHolder[0].styles[0].link}, onStyle);
				}
			}
			
			function onStyle(data) {
				if (data && data.styleHolder.length > 0) {
					displayedCars[data.styleHolder[0].id].price = data.styleHolder[0].price;
					chrome.extension.sendRequest({'action' : 'fetchEdmundsPhotoFeed', 'data': "http://api.edmunds.com/v1/api/vehicle-directory-ajax/styles/getstylephotoprice?styleid="+data.styleHolder[0].id+"&bitmaptype=T&api_key=g2dgxhfatcspkunbb7m33zv6"}, onPhoto);
					if (!data_exists) {
						var edmundsComToolbar = document.createElement('div');
						edmundsComToolbar.id = "edmundsComToolbar";
						var edmundsComToolbarContent = document.createElement('div');
						edmundsComToolbarContent.id = "edmundsComToolbarContent";
						edmundsComToolbarContent.className = "content";
						var edmundsComToolbarHandleParent = document.createElement('div');
						edmundsComToolbarHandleParent.className = "handle";
						var edmundsComToolbarHandle = document.createElement('span');
						edmundsComToolbarHandle.id = "edmundsComToolbarHandle";
						edmundsComToolbarHandleParent.appendChild(edmundsComToolbarHandle);
						edmundsComToolbar.appendChild(edmundsComToolbarContent);
						edmundsComToolbar.appendChild(edmundsComToolbarHandleParent);
						document.body.appendChild(edmundsComToolbar);
						edmundsComToolbarHandle.addEventListener ("click", function(e) {
							chrome.extension.sendRequest({'action' : 'trackEvent', 'action': 'Tray', 'label': 'Toggle', 'value': 'The tray is toggled'});
							$('#edmundsComToolbarContent').slideToggle('slow', function() {
							});
						}, false);
						data_exists = true;
					}
				}
			}
			
			function onPhoto(data) {
				displayedCars[data.style_photo_price.id].path = "http://media.ed.edmunds-media.com" + data.style_photo_price.path;
				processCar(data.style_photo_price.id);
				getCarData();
			}
			
			function getCarData() {
				if (cars.length) {
					var car = cars.shift();
					chrome.extension.sendRequest({'action' : 'fetchEdmundsFeed', 'data': car}, onData);
				}
			}
			getCarData();
			chrome.extension.sendRequest({'action' : 'trackView'});
		}
	}
})();