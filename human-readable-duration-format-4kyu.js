function formatDuration(input) {
  let years = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let result = [];

  while (input >= 31536000) {
    input -= 31536000;
    years++;
  }

  years <= 0
    ? null
    : years === 1
    ? result.push("1 year")
    : result.push(`${years} years`);

  while (input >= 86400) {
    input -= 86400;
    days++;
  }

  days <= 0
    ? null
    : days === 1
    ? result.push("1 day")
    : result.push(`${days} days`);

  while (input >= 3600) {
    input -= 3600;
    hours++;
  }

  hours <= 0
    ? null
    : hours === 1
    ? result.push("1 hour")
    : result.push(`${hours} hours`);

  while (input >= 60) {
    input -= 60;
    minutes++;
  }

  minutes <= 0
    ? null
    : minutes === 1
    ? result.push("1 minute")
    : result.push(`${minutes} minutes`);

  seconds = input;

  seconds <= 0
    ? null
    : seconds === 1
    ? result.push("1 second")
    : result.push(`${seconds} seconds`);

  console.log(result);

  return result.length <= 0
    ? "now"
    : result.length == 1
    ? result.join("")
    : `${result.slice(0, -1).join(", ")} and ${result[result.length - 1]}`;
}
