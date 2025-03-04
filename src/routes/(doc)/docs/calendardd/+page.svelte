<script>
	import Calendar from './calendar.svelte';
	
	const today = new Date;
</script>

<Calendar {today} year={2025} />
