
		var DATA_COUNT = 5;

		var utils = Samples.utils;

		utils.srand(110);

		function colorize(opaque, hover, ctx) {
			var v = ctx.dataset.data[ctx.dataIndex];
			var c = v < -50 ? '#D60000'
				: v < 0 ? '#F46300'
				: v < 50 ? '#0358B6'
				: '#44DE28';

			var opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);

			return opaque ? c : utils.transparentize(c, opacity);
		}

		function hoverColorize(ctx) {
			return colorize(false, true, ctx);
		}

		function generateData() {
			return utils.numbers({
				count: DATA_COUNT,
				min: -100,
				max: 100
			});
		}

		var data = {
			datasets: [{
				data: generateData(),
			}]
		};

		var options = {
			legend: false,
			tooltips: false,
			elements: {
				arc: {
					backgroundColor: colorize.bind(null, false, false),
					hoverBackgroundColor: hoverColorize
				}
			}
		};

		var chart = new Chart('chart-0', {
			type: 'pie',
			data: data,
			options: options
		});

		// eslint-disable-next-line no-unused-vars
		function randomize() {
			chart.data.datasets.forEach(function(dataset) {
				dataset.data = generateData();
			});
			chart.update();
		}

		// eslint-disable-next-line no-unused-vars
		function addDataset() {
			chart.data.datasets.push({
				data: generateData()
			});
			chart.update();
		}

		// eslint-disable-next-line no-unused-vars
		function removeDataset() {
			chart.data.datasets.shift();
			chart.update();
		}

		// eslint-disable-next-line no-unused-vars
		function togglePieDoughnut() {
			if (chart.options.cutoutPercentage) {
				chart.options.cutoutPercentage = 0;
			} else {
				chart.options.cutoutPercentage = 50;
			}
			chart.update();
		}

	