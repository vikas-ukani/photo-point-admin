import Vue from "vue";

Vue.filter("toFixed", function(price, limit) {
  return price.toFixed(limit);
});

Vue.filter("toUSD", function(price) {
  return `$${price}`;
});
Vue.filter("capitalize", function(input) {
  return input && input.length > 0
    ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()
    : input;
});

Vue.filter("lowercase", function(input) {
  return input && input.length > 0 ? input.toLowerCase() : input;
});

Vue.filter("upercase", function(input) {
  return input && input.length > 0 ? input.toUpperCase() : input;
});

Vue.directive("img", function(url) {
  var img = new Image();
  img.src = url;

  img.onload = function() {
    this.el.src = url;
    $(this.el)
      .css("opacity", 0)
      .animate({ opacity: 1 }, 1000);
  }.bind(this);
});
