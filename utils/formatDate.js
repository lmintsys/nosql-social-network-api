module.exports = formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const dateString = date.toLocaleDateString("en-US", options);
  const timeString = date.toLocaleTimeString("en-US", { hour12: true });
  return `${dateString} at ${timeString}`;
};
