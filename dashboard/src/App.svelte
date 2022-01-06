<script>
	import Thermometer from "./Thermometer.svelte";

	const USERS = ['USER1', 'USER2'];
	let apiResponse = {};
	function getInfo(user) {
		fetch(`http://localhost:6001/${user}`)
		.then(async (response) => {
			const parsed = await response.json();
			console.log(user, parsed)
			if (!parsed.error) {
				apiResponse = {
					...apiResponse,
					[user]: parsed,
				}
			}
		}).catch(error => {
			console.log(error);
		});
	}
	USERS.forEach((user) => setInterval(getInfo, 10000, user));
</script>

<main>
	<div>
		<h1>
			day
		</h1>
		{#each USERS as user}
			{#if user in apiResponse && apiResponse[user]?.day}
				<Thermometer label={user} running={apiResponse[user].isRunning} completed={apiResponse[user].day.completed} goal={apiResponse[user].day.goal} />
			{/if}
		{/each}
	</div>
	<div>
		<h1>
			week
		</h1>
		{#each USERS as user}
			{#if user in apiResponse && apiResponse[user]?.week}
				<Thermometer label={user} running={apiResponse[user].isRunning} completed={apiResponse[user].week.completed} goal={apiResponse[user].week.goal} />
			{/if}
		{/each}
	</div>
	<div>
		<h1>
			month
		</h1>
		{#each USERS as user}
			{#if user in apiResponse && apiResponse[user]?.month}
				<Thermometer label={user} running={apiResponse[user].isRunning} completed={apiResponse[user].month.completed} goal={apiResponse[user].month.goal} />
			{/if}
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 0;
		max-width: 240px;
		margin: 0 auto;
	}

	div {
		margin-bottom: 5px;
		margin-top: 50px;
	}

	h1 {
		color: whitesmoke;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin: 10px 0 0 0;
		line-height: 80%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	:global(body) {
		background-color: rgb(4, 4, 37);
		height: 100%;
		width: 100%;
	}
</style>