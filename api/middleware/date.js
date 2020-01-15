module.exports = {
  getDate: function(timestamp) {
    const date = new Date(timestamp);
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  }
};
