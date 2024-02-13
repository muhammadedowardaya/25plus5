const formatTime = (minutes, seconds) => {
	const date = new Date(minutes * 60000);
	const getMinutes = String(date.getMinutes()).padStart(2, '0');
	const getSeconds = String(date.getSeconds()).padStart(2, '0');
	return `${String(minutes) === '60' ? String(minutes) : getMinutes}:${
		seconds ? seconds : getSeconds
	}`;
};

export { formatTime };
