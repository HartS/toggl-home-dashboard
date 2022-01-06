<script>
  export let label;
  export let completed;
  export let goal;
  export let running = false;

  $: filledPercent = goal === 0 ? 100 : completed/goal*100;
</script>

<h2 style={`color: ${running ? 'green' : 'white'}`}>
  {label}
</h2>
<div class="thermometer">
  <div class="filled" style={`width: ${filledPercent}%`}>
    <div class="progress-label">
      {completed}
    </div>
  </div>
  <div class="goal-display">
    {goal}
  </div>
</div>

<style>
h2 {
  text-align: left;
  font-family: monospace;
  margin: 0;
  text-transform: capitalize;
}
div.thermometer {
  position: relative;
  text-align: left;
  width: 98%;
  background-color: whitesmoke;
  border-radius: 1rem;
  margin-bottom: 18px;
}

div.goal-display {
  color: white;
  position: absolute;
  right: -30px;
  top: -2px;
  bottom: 0;
  font-family: monospace;
}
div.filled {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background-color: rgb(18, 214, 198);
  height: 10px;
  position: relative;
}

div.progress-label {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 14px;
  font-family: monospace;
  color: white;
  text-align: left;
}
</style>