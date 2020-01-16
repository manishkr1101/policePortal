module.exports = {
  getDate: function(timestamp) {
    const date = new Date(timestamp);
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  },
  getDateAndTime: function(timestamp){
    const date = new Date(timestamp);
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: 'numeric',
      minute:'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString("en-US", options);
  }
};
